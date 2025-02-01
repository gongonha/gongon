<!-- components/pdf-tools.php -->
<div id="pdfTools" class="section">
    <h2>PDF 도구</h2>
    <div class="pdf-tools-container">
        <!-- PDF to Image -->
        <div class="tool-section">
            <h3>PDF를 이미지로 변환</h3>
            <div class="section-description">
                <p>PDF 파일을 이미지 파일로 변환합니다.</p>
                <ul>
                    <li>PDF의 각 페이지를 개별 이미지로 변환</li>
                    <li>지원 형식: PNG, JPEG</li>
                    <li>해상도 조절 가능</li>
                </ul>
            </div>
            <div class="input-group">
                <input type="file" id="pdfInput" accept=".pdf">
                <label for="pdfInput" class="pdf-file-label">PDF 파일 선택</label>
            </div>
            <div class="options-group">
                <select id="imageFormat">
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                </select>
                <select id="imageQuality">
                    <option value="high">고품질</option>
                    <option value="medium">중간</option>
                    <option value="low">저품질</option>
                </select>
            </div>
            <div id="pdfPreview"></div>
        </div>

        <!-- Image to PDF -->
        <div class="tool-section">
            <h3>이미지를 PDF로 변환</h3>
            <div class="section-description">
                <p>여러 이미지를 하나의 PDF 파일로 변환합니다.</p>
                <ul>
                    <li>여러 이미지 파일을 하나의 PDF로 병합</li>
                    <li>지원 형식: PNG, JPEG, GIF</li>
                </ul>
            </div>
            <div class="input-group">
                <input type="file" id="imageInputPdf" accept="image/*" multiple>
                <label for="imageInputPdf" class="pdf-file-label">이미지 파일 선택</label>
            </div>
            <div class="options-group">
                <select id="pdfQuality">
                    <option value="high">고품질</option>
                    <option value="medium">중간</option>
                    <option value="low">저품질</option>
                </select>
                <select id="pdfPageSize">
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="fit">이미지 크기에 맞춤</option>
                </select>
            </div>
            <div id="imageList" class="sortable-list"></div>
            <button id="createPdf" class="btn btn-primary" style="display: none;">PDF 생성</button>
        </div>
    </div>
</div>
