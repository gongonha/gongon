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
        button.addEventListener('click', () => toggleNumber(button, 0));
        numberGrid.appendChild(button);
    }

    // 번호 토글
    function toggleNumber(button, gameIndex) {
        const grid = button.closest('.number-grid');
        const num = parseInt(button.textContent);
        
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
        } else {
            // 해당 줄에서 선택된 번호 개수 확인
            const selectedCount = grid.querySelectorAll('.selected').length;
            if (selectedCount < 6) {
                button.classList.add('selected');
            }
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
        const gameCount = parseInt(document.getElementById('gameCount').value);
        let html = '';
        
        for (let i = 0; i < gameCount; i++) {
            const numbers = Array.from(document.querySelectorAll(`.number-rows .number-row:nth-child(${i + 1}) .selected`))
                .map(button => parseInt(button.textContent))
                .sort((a, b) => a - b);
                
            html += `<div class="game-numbers">
                <span class="game-label">${i + 1}게임:</span>
                <span class="numbers">${numbers.join(', ') || '번호를 선택해주세요'}</span>
            </div>`;
        }
        
        selectedNumbersDiv.innerHTML = html;
    }

    // 특정 게임의 선택된 번호 가져오기
    function getSelectedNumbersFromRow(gameIndex) {
        const row = document.querySelectorAll('.number-row')[gameIndex];
        return Array.from(row.querySelectorAll('.number-grid button.selected'))
            .map(button => parseInt(button.textContent))
            .sort((a, b) => a - b);
    }

    // 시뮬레이션 시작
    startSimulationBtn.addEventListener('click', async () => {
        const selectedNumbersList = validateNumbers();
        if (!selectedNumbersList) {
            return;
        }

        const loadingScreen = document.querySelector('.loading-screen');
        const simulationCount = document.querySelector('.simulation-count');
        loadingScreen.style.display = 'flex';
        
        const gameCount = parseInt(gameCountInput.value);
        
        // 시뮬레이션 타입 확인
        const simulationType = document.querySelector('input[name="simulationType"]:checked').value;
        const maxGames = simulationType === 'fixed' ? 
            parseInt(document.getElementById('maxGames').value) : Infinity;
        
        // 비동기로 시뮬레이션 실행
        const results = await new Promise(resolve => {
            setTimeout(() => {
                const results = simulateLotto(selectedNumbersList, gameCount, maxGames, (count) => {
                    simulationCount.textContent = `${count.toLocaleString()}회 진행`;
                }, simulationType === 'untilWin');
                resolve(results);
            }, 100);
        });

        loadingScreen.style.display = 'none';
        displayResults(results);
    });

    // 로또 시뮬레이션 함수 수정
    function simulateLotto(selectedNumbersList, gameCount, maxGames, updateCount, untilFirstWin) {
        const results = {
            1: { count: 0, matches: [] },
            2: { count: 0, matches: [] },
            3: { count: 0, matches: [] },
            4: { count: 0, matches: [] },
            5: { count: 0, matches: [] }
        };

        let games = 0;
        let weeks = 0;
        let updateInterval = 1000;

        while (games < maxGames) {
            weeks++;
            const winningNumbers = generateWinningNumbers();
            const bonusNumber = generateBonusNumber(winningNumbers);
            let hasFirstPrize = false;

            // 한 회차의 모든 게임을 확인
            for (let i = 0; i < gameCount; i++) {
                games++;
                
                if (games % updateInterval === 0) {
                    updateCount(games);
                }

                if (games > maxGames && !untilFirstWin) break;

                const myNumbers = selectedNumbersList[i];
                const matchCount = countMatches(myNumbers, winningNumbers);
                const rank = getLottoRank(matchCount, myNumbers.includes(bonusNumber));

                if (rank > 0) {
                    results[rank].count++;
                    // 최근 100개의 당첨 정보만 저장
                    results[rank].matches.unshift({
                        winningNumbers: [...winningNumbers],
                        bonusNumber,
                        matchCount,
                        myNumbers: [...myNumbers],
                        gameIndex: i,
                        week: weeks
                    });
                    if (results[rank].matches.length > 100) {
                        results[rank].matches.pop();
                    }
                    
                    if (rank === 1) {
                        hasFirstPrize = true;
                    }
                }
            }
            
            if (hasFirstPrize && untilFirstWin) {
                return { results, games, weeks };
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

        html += `<table class="stats-table">
            <tr>
                <th>등수</th>
                <th>당첨 횟수</th>
                <th>확률</th>
                <th>최근 당첨 정보</th>
            </tr>`;

        for (let rank = 1; rank <= 5; rank++) {
            const result = results[rank];
            const probability = ((result.count / games) * 100).toFixed(6);
            
            html += `<tr>
                <td>${rank}등</td>
                <td>${result.count.toLocaleString()}회</td>
                <td>${probability}%</td>
                <td>`;

            if (result.matches.length > 0) {
                result.matches.slice(0, 3).forEach(match => {
                    html += `<div class="match-info">
                        <div class="match-header">
                            <span class="game-number">${match.gameIndex + 1}번 게임</span>
                            <span class="week-number">(${match.week.toLocaleString()}회차)</span>
                        </div>
                        <div>내 번호: ${match.myNumbers.join(', ')}</div>
                        <div>당첨번호: ${match.winningNumbers.join(', ')} 
                            ${rank === 2 ? `+ [${match.bonusNumber}]` : ''}</div>
                        <div>일치하는 번호: ${match.matchCount}개</div>
                    </div>`;
                });

                // 전체 당첨 횟수와 표시된 횟수의 차이를 정확히 계산
                const remainingCount = result.count - 3;
                if (remainingCount > 0) {
                    html += `<div class="more-matches">외 ${remainingCount.toLocaleString()}회 더 있음</div>`;
                }
            } else {
                html += '당첨 이력 없음';
            }

            html += `</td></tr>`;
        }

        html += `</table>`;

        html += `<div class="selected-numbers-summary">
            <h4>선택한 번호</h4>`;
        
        const gameCount = parseInt(document.getElementById('gameCount').value);
        for (let i = 0; i < gameCount; i++) {
            const numbers = getSelectedNumbersFromRow(i);
            html += `<div class="game-row">
                <span class="game-label">${i + 1}번 게임:</span>
                <span class="numbers">${numbers.join(', ')}</span>
            </div>`;
        }
        
        html += `</div>`;
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

    // 게임 수에 따라 번호 선택 줄 생성
    function updateNumberRows(gameCount) {
        const numberRows = document.querySelector('.number-rows');
        numberRows.innerHTML = ''; // 기존 줄 초기화

        for (let i = 0; i < gameCount; i++) {
            const row = document.createElement('div');
            row.className = 'number-row';
            row.innerHTML = `
                <div class="row-number">${i + 1}게임</div>
                <div class="number-grid"></div>
                <button class="auto-select-row">자동선택</button>
                <button class="reset-row">초기화</button>
            `;
            numberRows.appendChild(row);

            // 번호 그리드 생성
            const grid = row.querySelector('.number-grid');
            for (let num = 1; num <= 45; num++) {
                const button = document.createElement('button');
                button.textContent = num;
                button.addEventListener('click', () => toggleNumber(button, i));
                grid.appendChild(button);
            }

            // 자동선택 버튼 이벤트
            row.querySelector('.auto-select-row').addEventListener('click', () => autoSelectRow(i));
            // 초기화 버튼 이벤트
            row.querySelector('.reset-row').addEventListener('click', () => resetRow(i));
        }
    }

    // 특정 게임의 자동 선택 함수
    function autoSelectRow(gameIndex) {
        const row = document.querySelectorAll('.number-row')[gameIndex];
        const buttons = row.querySelectorAll('.number-grid button');
        
        // 먼저 모든 선택 초기화
        buttons.forEach(button => button.classList.remove('selected'));
        
        // 6개의 랜덤 번호 선택
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        
        // 선택된 번호에 클래스 추가
        numbers.forEach(num => {
            buttons[num - 1].classList.add('selected');
        });
        
        updateSelectedNumbers();
    }

    // 특정 게임의 초기화 함수
    function resetRow(gameIndex) {
        const row = document.querySelectorAll('.number-row')[gameIndex];
        const buttons = row.querySelectorAll('.number-grid button');
        buttons.forEach(button => button.classList.remove('selected'));
        updateSelectedNumbers();
    }

    // 전체 자동 선택 버튼 이벤트
    document.getElementById('autoSelect').addEventListener('click', () => {
        const gameCount = parseInt(document.getElementById('gameCount').value);
        for (let i = 0; i < gameCount; i++) {
            autoSelectRow(i);
        }
    });

    // 전체 초기화 버튼 이벤트
    document.getElementById('resetNumbers').addEventListener('click', () => {
        const gameCount = parseInt(document.getElementById('gameCount').value);
        for (let i = 0; i < gameCount; i++) {
            resetRow(i);
        }
    });

    // 각 행의 자동선택과 초기화 버튼에 이벤트 리스너 추가
    function addRowButtonListeners() {
        const rows = document.querySelectorAll('.number-row');
        rows.forEach((row, index) => {
            row.querySelector('.auto-select-row').addEventListener('click', () => autoSelectRow(index));
            row.querySelector('.reset-row').addEventListener('click', () => resetRow(index));
        });
    }

    // 게임 수 변경 시 이벤트 리스너 수정
    document.getElementById('gameCount').addEventListener('change', function() {
        const count = parseInt(this.value);
        if (count >= 1 && count <= 5) {
            updateNumberRows(count);
            addRowButtonListeners(); // 새로운 행에 이벤트 리스너 추가
            document.getElementById('totalPrice').textContent = (count * 1000).toLocaleString();
        }
    });

    // 초기 이벤트 리스너 설정
    addRowButtonListeners();

    // 시뮬레이션 시작 전 선택된 번호 검증
    function validateNumbers() {
        const gameCount = parseInt(document.getElementById('gameCount').value);
        const selectedNumbers = [];
        
        for (let i = 0; i < gameCount; i++) {
            const rowNumbers = getSelectedNumbersFromRow(i);
            if (rowNumbers.length !== 6) {
                alert(`${i + 1}번째 게임에서 6개의 번호를 선택해주세요.`);
                return null;
            }
            selectedNumbers.push(rowNumbers);
        }
        
        return selectedNumbers;
    }
} 