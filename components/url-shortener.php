<!-- components/url-shortener.php -->
<div id="urlShortener" class="section">
    <h2>URL 단축</h2>
    <div class="url-shortener-container">
        <div class="input-group">
            <label for="longUrl">원본 URL</label>
            <input type="url" id="longUrl" placeholder="단축할 URL을 입력하세요" class="full-width">
        </div>
        
        <div class="service-selection">
            <label>서비스 선택:</label>
            <select id="serviceType">
                <option value="isgd">is.gd</option>
                <option value="tinyurl">TinyURL</option>
            </select>
        </div>

        <button id="shortenButton" class="btn btn-primary">URL 단축하기</button>

        <div class="result-container" style="display: none;">
            <div class="input-group">
                <label for="shortUrl">단축된 URL</label>
                <div class="url-result-wrapper">
                    <input type="text" id="shortUrl" readonly class="full-width">
                    <button id="copyButton" class="btn btn-secondary">복사</button>
                </div>
            </div>
        </div>
    </div>
</div>
