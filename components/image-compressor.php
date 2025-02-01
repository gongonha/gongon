<!-- components/image-compressor.php -->
<div id="imageCompressor" class="section">
    <h2>이미지 압축기</h2>
    <div class="IC_compressor-container">
        <input type="file" id="imageInput" accept="image/*" multiple>
        <label for="imageInput" class="IC_file-label">이미지 선택</label>
        <div class="IC_compression-options">
            <div class="IC_input-group">
                <label>품질 (1-100)</label>
                <input type="number" id="qualityInput" min="1" max="100" value="70">
            </div>
            <div class="IC_input-group">
                <label>최대 너비 (px)</label>
                <input type="number" id="maxWidthInput" value="1920">
            </div>
        </div>
        <div id="imagePreview"></div>
        <button id="compressImages" style="display: none;">압축하기</button>
    </div>
</div>
