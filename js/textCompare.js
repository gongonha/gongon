/* js/textCompare.js */
export function initTextCompare() {
    const text1Input = document.getElementById('text1');
    const text2Input = document.getElementById('text2');
    const compareBtn = document.getElementById('compareTexts');
    const compareResult = document.getElementById('compareResult');

    if (!text1Input || !text2Input || !compareBtn || !compareResult) return;

    compareBtn.addEventListener('click', () => {
        const text1 = text1Input.value;
        const text2 = text2Input.value;

        if (!text1 || !text2) {
            alert('두 텍스트를 모두 입력해주세요.');
            return;
        }

        // 줄 단위로 분리
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');

        let totalChars = 0;
        let differentChars = 0;
        let resultHTML = '<div class="comparison-summary"></div><div class="comparison-result">';
        const maxLines = Math.max(lines1.length, lines2.length);
        const differences = [];

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';
            
            totalChars += Math.max(line1.length, line2.length);

            if (line1 === line2) {
                // 동일한 줄
                resultHTML += `
                    <div class="line-comparison same">
                        <div class="line-number">${i + 1}</div>
                        <div class="line-content">${escapeHtml(line1)}</div>
                        <div class="line-content">${escapeHtml(line2)}</div>
                    </div>`;
            } else {
                // 다른 줄: 단어 단위 비교
                const words1 = line1.split(/(\s+)/);
                const words2 = line2.split(/(\s+)/);
                let highlightedLine1 = '';
                let highlightedLine2 = '';
                
                const maxWords = Math.max(words1.length, words2.length);
                for (let j = 0; j < maxWords; j++) {
                    const word1 = words1[j] || '';
                    const word2 = words2[j] || '';
                    
                    if (word1 !== word2) {
                        highlightedLine1 += `<span class="diff">${escapeHtml(word1)}</span>`;
                        highlightedLine2 += `<span class="diff">${escapeHtml(word2)}</span>`;
                        differentChars += Math.max(word1.length, word2.length);
                        
                        if (word1 && word2) {
                            differences.push(`'${word1}' → '${word2}'`);
                        } else if (word1) {
                            differences.push(`'${word1}' → 삭제됨`);
                        } else {
                            differences.push(`추가됨 → '${word2}'`);
                        }
                    } else {
                        highlightedLine1 += escapeHtml(word1);
                        highlightedLine2 += escapeHtml(word2);
                    }
                }

                resultHTML += `
                    <div class="line-comparison different">
                        <div class="line-number">${i + 1}</div>
                        <div class="line-content">${highlightedLine1}</div>
                        <div class="line-content">${highlightedLine2}</div>
                    </div>`;
            }
        }

        const matchRate = ((totalChars - differentChars) / totalChars * 100).toFixed(2);
        
        const summaryHTML = `
            <div class="comparison-stats">
                <div class="stat-item">
                    <span class="stat-label">일치율:</span>
                    <span class="stat-value">${matchRate}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">총 글자 수:</span>
                    <span class="stat-value">${totalChars}자</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">다른 글자 수:</span>
                    <span class="stat-value">${differentChars}자</span>
                </div>
            </div>
            ${
                differences.length > 0
                ? `
                    <div class="difference-list">
                        <h4>변경된 부분:</h4>
                        <ul>
                            ${differences.map(diff => `<li>${diff}</li>`).join('')}
                        </ul>
                    </div>
                `
                : ''
            }
        `;

        resultHTML += '</div>';
        compareResult.innerHTML = resultHTML;
        compareResult.querySelector('.comparison-summary').innerHTML = summaryHTML;
    });

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
