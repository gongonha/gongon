export function initTextAnalyzer() {
    const textArea = document.getElementById('analyzeText');
    const analyzeButton = document.getElementById('analyzeButton');
    const includeSpaces = document.getElementById('includeSpaces');
    const includeSpecialChars = document.getElementById('includeSpecialChars');
    const frequencyType = document.getElementById('frequencyType');
    const topN = document.getElementById('topN');

    // 결과 표시 요소들
    const totalCount = document.getElementById('totalCount');
    const noSpaceCount = document.getElementById('noSpaceCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const frequencyList = document.getElementById('frequencyList');

    // 텍스트 분석 함수
    function analyzeText() {
        const text = textArea.value;
        
        if (!text.trim()) {
            alert('분석할 텍스트를 입력해주세요.');
            return;
        }
        
        // 기본 카운트 계산
        totalCount.textContent = text.length;
        noSpaceCount.textContent = text.replace(/\s/g, '').length;
        wordCount.textContent = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        lineCount.textContent = text.split('\n').length;

        // 빈도 분석
        updateFrequencyAnalysis();
    }

    // 단어 추출 함수
    function extractWords(text) {
        // 문장 부호와 특수 문자를 기준으로 단어 분리
        const words = text
            .replace(/[.,!?"\[\](){}]/g, ' ') // 문장 부호 제거
            .replace(/\s+/g, ' ') // 연속된 공백을 하나로
            .trim()
            .split(' ');
        
        return words.filter(word => {
            // 빈 문자열이나 숫자로만 이루어진 단어 제외
            if (!word || /^\d+$/.test(word)) return false;
            
            // 특수문자 포함 옵션에 따라 처리
            if (!includeSpecialChars.checked) {
                word = word.replace(/[^가-힣a-zA-Z0-9]/g, '');
                if (!word) return false;
            }
            
            return true;
        });
    }

    // 빈도 분석 함수
    function updateFrequencyAnalysis() {
        const text = textArea.value;
        const type = frequencyType.value;
        const n = parseInt(topN.value);
        
        let frequency = new Map();
        
        if (type === 'character') {
            // 글자별 빈도 분석
            const chars = text.split('');
            for (let char of chars) {
                if (!includeSpaces.checked && /\s/.test(char)) continue;
                if (!includeSpecialChars.checked && /[^가-힣a-zA-Z0-9]/.test(char)) continue;
                frequency.set(char, (frequency.get(char) || 0) + 1);
            }
        } else {
            // 단어별 빈도 분석
            const words = text
                .replace(/[.,!?"\[\](){}]/g, ' ') // 문장 부호 제거
                .replace(/\s+/g, ' ') // 연속된 공백을 하나로
                .trim()
                .split(' ');
            
            for (let word of words) {
                if (!word || word.length === 0) continue;
                
                // 특수문자 포함 옵션에 따라 처리
                if (!includeSpecialChars.checked) {
                    word = word.replace(/[^가-힣a-zA-Z0-9]/g, '');
                    if (!word) continue;
                }
                
                frequency.set(word, (frequency.get(word) || 0) + 1);
            }
        }

        // 빈도순 정렬
        const sortedFrequency = [...frequency.entries()]
            .sort((a, b) => {
                if (b[1] === a[1]) {
                    return a[0].localeCompare(b[0]);
                }
                return b[1] - a[1];
            })
            .slice(0, n);

        // 최대 빈도수 계산
        const maxFrequency = sortedFrequency.length > 0 ? sortedFrequency[0][1] : 0;

        // 결과 표시
        frequencyList.innerHTML = sortedFrequency
            .map((entry, index) => `
                <div class="frequency-item">
                    <span class="rank">${index + 1}</span>
                    <span class="text">${escapeHtml(entry[0])}</span>
                    <span class="count">${entry[1]}회</span>
                    <div class="bar" style="width: ${(entry[1] / maxFrequency) * 100}%"></div>
                </div>
            `)
            .join('');
    }

    // HTML 이스케이프 함수
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 이벤트 리스너 등록
    analyzeButton.addEventListener('click', analyzeText);
    
    // 옵션 변경 시 재분석
    const reanalyzeIfNeeded = () => {
        if (textArea.value.trim()) {
            analyzeText();
        }
    };

    includeSpaces.addEventListener('change', reanalyzeIfNeeded);
    includeSpecialChars.addEventListener('change', reanalyzeIfNeeded);
    frequencyType.addEventListener('change', reanalyzeIfNeeded);
    topN.addEventListener('change', reanalyzeIfNeeded);

    // Enter 키로도 분석 가능하도록 설정
    textArea.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            analyzeText();
        }
    });
} 