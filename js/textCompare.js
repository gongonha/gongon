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

        let totalChars = 0;      // 일치율 계산용 전체 글자 수
        let differentChars = 0;  // 다른 글자 수
        let resultHTML = '<div class="comparison-summary"></div><div class="comparison-result">';

        const maxLines = Math.max(lines1.length, lines2.length);
        const differences = []; // 변경된 부분 정보를 담을 배열

        for (let lineIndex = 0; lineIndex < maxLines; lineIndex++) {
            const line1 = lines1[lineIndex] || '';
            const line2 = lines2[lineIndex] || '';

            // 글자 수 계산
            totalChars += Math.max(line1.length, line2.length);

            if (line1 === line2) {
                // 동일한 줄
                resultHTML += `
                    <div class="line-comparison same">
                        <div class="line-number">${lineIndex + 1}</div>
                        <div class="line-content">${escapeHtml(line1)}</div>
                        <div class="line-content">${escapeHtml(line2)}</div>
                    </div>`;
            } else {
                // 다른 줄 -> 문자 단위 diff
                const {
                    highlightedLine1,
                    highlightedLine2,
                    diffCount,
                    diffPairs
                } = diffCharacters(line1, line2, lineIndex);

                differentChars += diffCount;

                // differences 배열에 자세한 변경 정보 담기
                diffPairs.forEach(diffItem => {
                    const [c1, c2, lineIdx, idx1, idx2] = diffItem; 
                    // c1, c2 : 서로 다른 문자
                    // lineIdx : 해당 줄 번호
                    // idx1, idx2 : line1/line2 에서의 글자 인덱스

                    if (c1 !== c2) {
                        if (c1 && c2) {
                            differences.push(
                                `${lineIdx + 1}번째 줄, 글자(${idx1 + 1} → ${idx2 + 1}) : '${c1}' → '${c2}'`
                            );
                        } else if (c1) {
                            differences.push(
                                `${lineIdx + 1}번째 줄, 글자(${idx1 + 1}) : '${c1}' → 삭제됨`
                            );
                        } else {
                            differences.push(
                                `${lineIdx + 1}번째 줄, 글자(${idx2 + 1}) : 추가됨 → '${c2}'`
                            );
                        }
                    }
                });

                // 결과 HTML
                resultHTML += `
                    <div class="line-comparison different">
                        <div class="line-number">${lineIndex + 1}</div>
                        <div class="line-content">${highlightedLine1}</div>
                        <div class="line-content">${highlightedLine2}</div>
                    </div>`;
            }
        }

        // 일치율
        const matchRate = totalChars > 0
            ? ((totalChars - differentChars) / totalChars * 100).toFixed(2)
            : '100.00';

        // 요약 정보
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
                            ${differences.map(diff => `<li>${escapeHtml(diff)}</li>`).join('')}
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


    /**
     * 문자 단위 LCS diff 함수
     * - line1, line2: 비교할 문자열(한 줄)
     * - lineIndex: 몇 번째 줄인지(위쪽 함수에서 전달)
     * 
     * 반환:
     *   {
     *     highlightedLine1: string,   // HTML 강조 표시된 결과
     *     highlightedLine2: string,
     *     diffCount: number,         // 다른 문자(삽입+삭제) 개수
     *     diffPairs: Array<[c1, c2, lineIndex, idx1, idx2]> // 변경 정보 (위치 포함)
     *   }
     */
    function diffCharacters(line1, line2, lineIndex) {
        const n = line1.length;
        const m = line2.length;
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        // 1) LCS 테이블 채우기
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (line1[i - 1] === line2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // 2) 역추적하며 alignment 구성
        let i = n, j = m;
        const alignedLine1 = [];
        const alignedLine2 = [];

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && line1[i - 1] === line2[j - 1]) {
                // 동일
                alignedLine1.unshift({
                    char: line1[i - 1],
                    type: 'same',
                    index: i - 1
                });
                alignedLine2.unshift({
                    char: line2[j - 1],
                    type: 'same',
                    index: j - 1
                });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                // line2에만 존재(추가)
                alignedLine1.unshift({
                    char: '',
                    type: 'removed',
                    index: i // 사실상 없음
                });
                alignedLine2.unshift({
                    char: line2[j - 1],
                    type: 'added',
                    index: j - 1
                });
                j--;
            } else {
                // line1에만 존재(삭제)
                alignedLine1.unshift({
                    char: line1[i - 1],
                    type: 'removed',
                    index: i - 1
                });
                alignedLine2.unshift({
                    char: '',
                    type: 'added',
                    index: j
                });
                i--;
            }
        }

        // 3) 최종 하이라이트 / diffPairs 구성
        let highlightedLine1 = '';
        let highlightedLine2 = '';
        let diffCount = 0;
        const diffPairs = []; // [c1, c2, lineIndex, idx1, idx2]

        for (let k = 0; k < alignedLine1.length; k++) {
            const left = alignedLine1[k];   // { char, type, index }
            const right = alignedLine2[k];  // { char, type, index }

            if (left.type === 'same' && right.type === 'same') {
                // 동일 문자
                highlightedLine1 += escapeHtml(left.char);
                highlightedLine2 += escapeHtml(right.char);
                diffPairs.push([
                    left.char, right.char, 
                    lineIndex, left.index, right.index
                ]);
            } else {
                // diff
                if (left.char) {
                    highlightedLine1 += `
                        <span class="diff-removed">${escapeHtml(left.char)}</span>
                    `;
                    diffCount++;
                }
                if (right.char) {
                    highlightedLine2 += `
                        <span class="diff-added">${escapeHtml(right.char)}</span>
                    `;
                    diffCount++;
                }

                diffPairs.push([
                    left.char, right.char, 
                    lineIndex, left.index, right.index
                ]);
            }
        }

        return {
            highlightedLine1,
            highlightedLine2,
            diffCount,
            diffPairs
        };
    }

    // HTML 이스케이프
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
