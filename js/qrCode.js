/* js/qrCode.js */
export function initQRCodeGenerator() {
    const qrInput = document.getElementById('qrInput');
    const generateQRBtn = document.getElementById('generateQR');
    const qrResult = document.getElementById('qrResult');
    const downloadQRBtn = document.getElementById('downloadQR');

    if (!qrInput || !generateQRBtn || !qrResult || !downloadQRBtn) return;

    generateQRBtn.addEventListener('click', () => {
        const text = qrInput.value.trim();
        if (!text) {
            alert('텍스트나 URL을 입력해주세요.');
            return;
        }

        // 기존 QR 코드 제거
        qrResult.innerHTML = '';
        
        // div 엘리먼트 생성
        const qrDiv = document.createElement('div');
        qrResult.appendChild(qrDiv);
        
        // QR 코드 생성 (외부 라이브러리 QRCode 사용)
        new QRCode(qrDiv, {
            text: text,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        downloadQRBtn.style.display = 'block';
    });

    // QR 코드 다운로드
    downloadQRBtn.addEventListener('click', () => {
        const img = qrResult.querySelector('img');
        if (!img) return;

        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = img.src;
        link.click();
    });
}
