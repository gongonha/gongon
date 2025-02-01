<!-- components/text-encryption.php -->
<div id="textEncryption" class="section">
    <h2>텍스트 암호화</h2>
    <div class="section-description">
        <p>나만의 비밀 텍스트를 만들어보세요</p>
        <ul>
            <li>텍스트를 입력하면 암호화된 텍스트와 복호화 키가 생성됩니다.</li>
            <li>복호화 키를 입력하면 원래 텍스트를 확인할 수 있습니다.</li>
            <li>키는 안전한 곳에 보관하세요.</li>
        </ul>
    </div>
    <div class="encryption-container">
        <div class="encryption-section">
            <h3>암호화</h3>
            <textarea id="encryptInput" placeholder="암호화할 텍스트를 입력하세요" class="text-input"></textarea>
            <button id="encryptBtn" class="btn btn-primary">암호화하기</button>
            <div id="encryptResult" class="result-box">
                <div class="result-group">
                    <label>암호화된 텍스트:</label>
                    <div class="copy-group">
                        <input type="text" id="encryptedText" readonly>
                        <button class="copy-btn" data-target="encryptedText">복사</button>
                    </div>
                </div>
                <div class="result-group">
                    <label>복호화 키:</label>
                    <div class="copy-group">
                        <input type="text" id="decryptionKey" readonly>
                        <button class="copy-btn" data-target="decryptionKey">복사</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="encryption-section">
            <h3>복호화</h3>
            <div class="input-group">
                <input type="text" id="decryptInput" placeholder="암호화된 텍스트를 입력하세요" class="text-input">
                <input type="text" id="keyInput" placeholder="복호화 키를 입력하세요" class="text-input">
            </div>
            <button id="decryptBtn" class="btn btn-secondary">복호화하기</button>
            <div id="decryptResult" class="result-box">
                <div class="result-group">
                    <label>원본 텍스트:</label>
                    <textarea id="decryptedText" readonly></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
