export function initLottoRecommend() {
    const spinCountInput = document.getElementById('spinCount');
    const startRecommendBtn = document.getElementById('startRecommend');
    const recommendedNumbersDiv = document.querySelector('.recommended-numbers');
    const numberStatisticsDiv = document.querySelector('.number-statistics');
    const loadingScreen = document.querySelector('#lottoRecommend .loading-screen');
    const simulationCount = document.querySelector('#lottoRecommend .simulation-count');

    startRecommendBtn.addEventListener('click', async () => {
        const spinCount = parseInt(spinCountInput.value);
        if (spinCount < 100 || spinCount > 1000000) {
            alert('돌릴 횟수는 100에서 1,000,000 사이여야 합니다.');
            return;
        }

        loadingScreen.style.display = 'flex';
        const results = await simulateSpins(spinCount);
        displayResults(results);
        loadingScreen.style.display = 'none';
    });

    async function simulateSpins(totalSpins) {
        const numberCounts = new Array(46).fill(0);
        const updateInterval = Math.max(Math.floor(totalSpins / 100), 1000);

        return new Promise(resolve => {
            setTimeout(() => {
                for (let i = 1; i <= totalSpins; i++) {
                    // 6개의 랜덤 번호 생성
                    const numbers = new Set();
                    while (numbers.size < 6) {
                        numbers.add(Math.floor(Math.random() * 45) + 1);
                    }
                    
                    // 번호 카운트 증가
                    numbers.forEach(num => numberCounts[num]++);

                    if (i % updateInterval === 0) {
                        simulationCount.textContent = `${i.toLocaleString()}회 진행`;
                    }
                }

                // 가장 많이 나온 6개 번호 찾기
                const recommendedNumbers = [];
                const numberCountsCopy = [...numberCounts];
                for (let i = 0; i < 6; i++) {
                    const maxCount = Math.max(...numberCountsCopy);
                    const maxIndex = numberCountsCopy.indexOf(maxCount);
                    recommendedNumbers.push({
                        number: maxIndex,
                        count: numberCounts[maxIndex]
                    });
                    numberCountsCopy[maxIndex] = -1; // 이미 선택된 번호는 제외
                }

                resolve({
                    recommended: recommendedNumbers.sort((a, b) => a.number - b.number),
                    totalSpins
                });
            }, 100);
        });
    }

    function displayResults(results) {
        const { recommended, totalSpins } = results;

        // 추천 번호 표시
        recommendedNumbersDiv.innerHTML = recommended
            .map(r => `<div class="recommended-number">${r.number}</div>`)
            .join('');

        // 통계 정보 표시
        numberStatisticsDiv.innerHTML = recommended
            .map(r => `
                <div class="stat-item">
                    <span class="stat-number">${r.number}번</span>
                    <span class="stat-count">${r.count.toLocaleString()}회 
                        (${((r.count / totalSpins) * 100).toFixed(2)}%)</span>
                </div>
            `)
            .join('');
    }
} 