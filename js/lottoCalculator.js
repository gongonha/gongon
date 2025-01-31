export function initLottoCalculator() {
    const numberGrid = document.querySelector('.number-grid');
    const autoSelectBtn = document.getElementById('autoSelect');
    const resetBtn = document.getElementById('resetNumbers');
    const gameCountInput = document.getElementById('gameCount');
    const totalPriceSpan = document.getElementById('totalPrice');
    const startSimulationBtn = document.getElementById('startSimulation');
    const selectedNumbersDiv = document.querySelector('.selected-numbers');
    const winningInfoDiv = document.querySelector('.winning-info');
    const statisticsDiv = document.querySelector('.statistics');

    let selectedNumbers = new Set();

    // 번호 그리드 생성
    for (let i = 1; i <= 45; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => toggleNumber(i, button));
        numberGrid.appendChild(button);
    }

    // 번호 토글
    function toggleNumber(num, button) {
        if (selectedNumbers.has(num)) {
            selectedNumbers.delete(num);
            button.classList.remove('selected');
        } else if (selectedNumbers.size < 6) {
            selectedNumbers.add(num);
            button.classList.add('selected');
        }
        updateSelectedNumbers();
    }

    // 자동 선택
    autoSelectBtn.addEventListener('click', () => {
        resetNumbers();
        while (selectedNumbers.size < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!selectedNumbers.has(num)) {
                selectedNumbers.add(num);
                numberGrid.children[num-1].classList.add('selected');
            }
        }
        updateSelectedNumbers();
    });

    // 초기화
    function resetNumbers() {
        selectedNumbers.clear();
        numberGrid.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('selected');
        });
        updateSelectedNumbers();
    }

    resetBtn.addEventListener('click', resetNumbers);

    // 게임 수에 따른 가격 업데이트
    gameCountInput.addEventListener('input', () => {
        const count = Math.max(1, Math.min(5, parseInt(gameCountInput.value) || 1));
        gameCountInput.value = count;
        totalPriceSpan.textContent = (count * 1000).toLocaleString();
    });

    // 선택된 번호 표시 업데이트
    function updateSelectedNumbers() {
        const numbers = Array.from(selectedNumbers).sort((a, b) => a - b);
        selectedNumbersDiv.innerHTML = `선택된 번호: ${numbers.join(', ')}`;
    }

    // 시뮬레이션 시작
    startSimulationBtn.addEventListener('click', async () => {
        if (selectedNumbers.size !== 6) {
            alert('6개의 번호를 선택해주세요.');
            return;
        }

        const loadingScreen = document.querySelector('.loading-screen');
        const simulationCount = document.querySelector('.simulation-count');
        loadingScreen.style.display = 'flex';
        
        const myNumbers = Array.from(selectedNumbers).sort((a, b) => a - b);
        const gameCount = parseInt(gameCountInput.value);
        
        // 시뮬레이션 타입 확인
        const simulationType = document.querySelector('input[name="simulationType"]:checked').value;
        const maxGames = simulationType === 'fixed' ? 
            parseInt(document.getElementById('maxGames').value) : Infinity;
        
        // 비동기로 시뮬레이션 실행
        const results = await new Promise(resolve => {
            setTimeout(() => {
                const results = simulateLotto(myNumbers, gameCount, maxGames, (count) => {
                    simulationCount.textContent = `${count.toLocaleString()}회 진행`;
                }, simulationType === 'untilWin');
                resolve(results);
            }, 100);
        });

        loadingScreen.style.display = 'none';
        displayResults(results);
    });

    // 로또 시뮬레이션 함수 수정
    function simulateLotto(myNumbers, gameCount, maxGames, updateCount, untilFirstWin) {
        const results = {
            1: { count: 0, lastMatch: null },
            2: { count: 0, lastMatch: null },
            3: { count: 0, lastMatch: null },
            4: { count: 0, lastMatch: null },
            5: { count: 0, lastMatch: null }
        };

        let games = 0;
        let weeks = 0;
        let updateInterval = 1000;

        while (games < maxGames) {
            weeks++;
            for (let i = 0; i < gameCount; i++) {
                games++;
                
                if (games % updateInterval === 0) {
                    updateCount(games);
                }

                if (games > maxGames && !untilFirstWin) break;

                const winningNumbers = generateWinningNumbers();
                const bonusNumber = generateBonusNumber(winningNumbers);
                const matchCount = countMatches(myNumbers, winningNumbers);
                const rank = getLottoRank(matchCount, myNumbers.includes(bonusNumber));

                if (rank > 0) {
                    results[rank].count++;
                    results[rank].lastMatch = {
                        winningNumbers,
                        bonusNumber,
                        matchCount
                    };
                    
                    // 1등이 나왔고 1등까지 시뮬레이션하는 경우 종료
                    if (rank === 1 && untilFirstWin) {
                        return { results, games, weeks };
                    }
                }
            }
        }
        return { results, games, weeks };
    }

    // 당첨 번호 생성
    function generateWinningNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // 보너스 번호 생성
    function generateBonusNumber(winningNumbers) {
        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (winningNumbers.includes(bonusNumber));
        return bonusNumber;
    }

    // 일치하는 번호 개수 계산
    function countMatches(myNumbers, winningNumbers) {
        return myNumbers.filter(num => winningNumbers.includes(num)).length;
    }

    // 로또 등수 계산
    function getLottoRank(matchCount, hasBonusMatch) {
        if (matchCount === 6) return 1;
        if (matchCount === 5 && hasBonusMatch) return 2;
        if (matchCount === 5) return 3;
        if (matchCount === 4) return 4;
        if (matchCount === 3) return 5;
        return 0;
    }

    // 결과 표시 함수 수정
    function displayResults(data) {
        const { results, games, weeks } = data;
        const years = (weeks / 52).toFixed(1);
        const totalCost = games * 1000;

        let html = `<h4>시뮬레이션 결과</h4>`;
        html += `<p>총 ${games.toLocaleString()}회 (${totalCost.toLocaleString()}원) / ${years}년 소요</p>`;

        // 등수별 통계 테이블 생성
        html += `<table class="stats-table">
            <tr>
                <th>등수</th>
                <th>당첨 횟수</th>
                <th>확률</th>
                <th>당첨 정보</th>
            </tr>`;

        for (let rank = 1; rank <= 5; rank++) {
            const result = results[rank];
            const probability = ((result.count / games) * 100).toFixed(6);
            
            html += `<tr>
                <td>${rank}등</td>
                <td>${result.count.toLocaleString()}회</td>
                <td>${probability}%</td>
                <td>`;

            if (result.lastMatch) {
                const { winningNumbers, bonusNumber, matchCount } = result.lastMatch;
                html += `당첨번호: ${winningNumbers.join(', ')} 
                        ${rank === 2 ? `+ [${bonusNumber}]` : ''}<br>
                        일치하는 번호: ${matchCount}개`;
            } else {
                html += '당첨 이력 없음';
            }

            html += `</td></tr>`;
        }

        html += `</table>`;
        statisticsDiv.innerHTML = html;
    }

    // 라디오 버튼 이벤트 리스너 추가
    document.addEventListener('DOMContentLoaded', () => {
        const maxGamesInput = document.getElementById('maxGames');
        const fixedGamesRadio = document.getElementById('fixedGames');
        const untilFirstWinRadio = document.getElementById('untilFirstWin');

        function updateMaxGamesVisibility() {
            maxGamesInput.style.display = fixedGamesRadio.checked ? 'inline-block' : 'none';
            document.querySelector('.games-label').style.display = 
                fixedGamesRadio.checked ? 'inline-block' : 'none';
        }

        fixedGamesRadio.addEventListener('change', updateMaxGamesVisibility);
        untilFirstWinRadio.addEventListener('change', updateMaxGamesVisibility);

        // 초기 상태 설정
        updateMaxGamesVisibility();
    });
} 