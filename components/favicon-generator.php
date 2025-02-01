<!-- components/favicon-generator.php -->
<div id="faviconGenerator" class="section">
    <h2>아이콘 생성기</h2>
    <div class="section-description">
        <p>이미지를 다양한 크기의 아이콘으로 변환할 수 있는 도구입니다.</p>
        <ul>
            <li>PNG, JPG, JPEG 이미지를 다양한 크기의 아이콘으로 변환</li>
            <li>16x16, 32x32, 48x48 등 다양한 크기 지원</li>
            <li>미리보기 기능 제공</li>
        </ul>
    </div>
    <div class="favicon-container">
        <div class="input-group">
            <label for="faviconInput" class="icon-generator-upload-label">
                <i class="fas fa-upload"></i> 이미지 선택
            </label>
            <input type="file" id="faviconInput" accept="image/*" style="display: none;">
        </div>
        
        <div class="favicon-options">
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" value="16" checked> 16x16
                </label>
                <label>
                    <input type="checkbox" value="32" checked> 32x32
                </label>
                <label>
                    <input type="checkbox" value="48" checked> 48x48
                </label>
                <label>
                    <input type="checkbox" value="64"> 64x64
                </label>
                <label>
                    <input type="checkbox" value="128"> 128x128
                </label>
            </div>
        </div>

        <div class="preview-section">
            <h3>미리보기</h3>
            <div id="faviconPreview" class="preview-grid"></div>
        </div>

        <button id="generateFavicon" class="btn btn-primary" disabled>아이콘 생성</button>
    </div>
</div>
