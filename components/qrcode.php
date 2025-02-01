<!-- components/qrcode.php -->
<div id="qrcode" class="section">
    <h2>QR 코드 생성기</h2>
    <div class="qr-section-description">
        <p>텍스트나 URL을 QR 코드로 변환할 수 있는 도구입니다.</p>
        <ul>
            <li>텍스트나 URL을 입력하여 QR 코드를 생성합니다.</li>
            <li>생성된 QR 코드를 이미지로 다운로드할 수 있습니다.</li>
            <li>링크 주소를 입력하면 입력한 링크로 이동합니다. (예: https://www.naver.com)</li>
        </ul>
    </div>
    <div class="input-group">
        <input type="text" id="qrInput" placeholder="텍스트나 URL을 입력하세요">
        <button id="generateQR">생성</button>
    </div>
    <div id="qrResult"></div>
    <button id="downloadQR" style="display: none;">다운로드</button>
</div>
