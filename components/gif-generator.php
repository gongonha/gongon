<!-- components/gif-generator.php -->
<div id="gifGenerator" class="section">
    <h2>GIF 생성기</h2>
    <div class="section-description">
        <p>여러 이미지를 업로드하여 GIF 애니메이션을 만들 수 있습니다.</p>
        <p>이미지 선택후 GIF 생성을 누르면 결과값이 바로 나옵니다. 순서대로 선택해주세요.</p>
    </div>
    <div class="gif-container">
        <div class="input-group">
            <label for="gifInput" class="gif-upload-label">
                <i class="fas fa-images"></i> 이미지 선택
            </label>
            <input type="file" id="gifInput" accept="image/*" multiple style="display: none;">
        </div>

        <!-- 이미지 미리보기 영역 추가 -->
        <div id="selectedImagesPreview" class="selected-images-preview"></div>

        <div class="gif-options">
            <div class="option-group">
                <label for="frameDelay">프레임 간격 (ms[100ms-1초])</label>
                <input type="number" id="frameDelay" value="500" min="100" max="3000" step="100">
            </div>
            <div class="option-group">
                <label for="repeatCount">반복 횟수 (0 = 무한)</label>
                <input type="number" id="repeatCount" value="0" min="0" max="100">
            </div>
            <div class="option-group">
                <label for="gifQuality">품질 (1-10)</label>
                <input type="number" id="gifQuality" value="7" min="1" max="10">
            </div>
        </div>

        <button id="generateGif" class="btn btn-primary" disabled>GIF 생성</button>
        
        <div class="progress-container">
            <div id="progressBar" class="progress-bar"></div>
        </div>

        <div class="preview-section">
            <h3>생성된 GIF</h3>
            <div id="gifPreview" class="gif-preview"></div>
        </div>
    </div>
</div>
