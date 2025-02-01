<!-- components/text-analyzer.php -->
<div id="textAnalyzer" class="section">
    <h2>글자 수 분석기</h2>
    <div class="text-analyzer-container">
        <div class="input-group">
            <textarea id="analyzeText" placeholder="분석할 텍스트를 입력하세요" rows="10"></textarea>
        </div>
        
        <div class="analyzer-options">
            <label>
                <input type="checkbox" id="includeSpaces" checked>
                공백 포함
            </label>
            <label>
                <input type="checkbox" id="includeSpecialChars" checked>
                특수문자 포함
            </label>
            <button id="analyzeButton" class="btn btn-primary">분석하기</button>
        </div>

        <div class="analyzer-results">
            <div class="count-results">
                <h3>글자 수 통계</h3>
                <div id="textCounts" class="results-grid">
                    <div class="result-item">
                        <span class="label">전체 글자 수:</span>
                        <span class="value" id="totalCount">0</span>
                    </div>
                    <div class="result-item">
                        <span class="label">공백 제외:</span>
                        <span class="value" id="noSpaceCount">0</span>
                    </div>
                    <div class="result-item">
                        <span class="label">단어 수:</span>
                        <span class="value" id="wordCount">0</span>
                    </div>
                    <div class="result-item">
                        <span class="label">줄 수:</span>
                        <span class="value" id="lineCount">0</span>
                    </div>
                </div>
            </div>

            <div class="frequency-results">
                <h3>글자 빈도 분석</h3>
                <div class="frequency-options">
                    <select id="frequencyType">
                        <option value="word">단어별</option>
                        <option value="character">글자별</option>
                    </select>
                    <input type="number" id="topN" value="10" min="1" max="100">
                    <label for="topN">개 표시</label>
                </div>
                <div id="frequencyList" class="frequency-list"></div>
            </div>
        </div>
    </div>
</div>
