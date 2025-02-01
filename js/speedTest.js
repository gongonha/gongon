/* js/speedTest.js */
export function initSpeedTest() {
    const startSpeedTestBtn = document.getElementById('startSpeedTest');
    const downloadSpeedEl = document.getElementById('downloadSpeed');
    const uploadSpeedEl = document.getElementById('uploadSpeed');
    const pingSpeedEl = document.getElementById('pingSpeed');
    const speedTestLog = document.getElementById('speedTestLog');

    if (!startSpeedTestBtn || !downloadSpeedEl || !uploadSpeedEl || !pingSpeedEl || !speedTestLog) {
        return;
    }

    startSpeedTestBtn.addEventListener('click', async () => {
        startSpeedTestBtn.disabled = true;
        startSpeedTestBtn.classList.add('loading');
        startSpeedTestBtn.textContent = '테스트 진행 중...';
        speedTestLog.innerHTML = ''; // 로그 초기화
        logMessage('테스트 시작...');

        // 핑 테스트
        logMessage('핑 테스트 중...');
        const pingStart = performance.now();
        await fetch('https://api.github.com/zen');
        const pingTime = performance.now() - pingStart;
        pingSpeedEl.textContent = `${Math.round(pingTime)}ms`;
        logMessage(`핑: ${Math.round(pingTime)}ms`);

        // 다운로드 속도 테스트
        logMessage('다운로드 속도 테스트 중...');
        const downloadStart = performance.now();
        const response = await fetch('https://source.unsplash.com/random/3000x2000');
        const blob = await response.blob();
        const downloadTime = (performance.now() - downloadStart) / 1000; // 초 단위
        const downloadSpeed = (blob.size * 8) / (1024 * 1024 * downloadTime); // Mbps
        downloadSpeedEl.textContent = `${downloadSpeed.toFixed(2)} Mbps`;
        logMessage(`다운로드 속도: ${downloadSpeed.toFixed(2)} Mbps`);

        // 업로드 속도 테스트
        logMessage('업로드 속도 테스트 중...');
        const testData = new Blob([new ArrayBuffer(1024 * 1024)]); // 1MB
        const uploadStart = performance.now();
        await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: testData
        });
        const uploadTime = (performance.now() - uploadStart) / 1000;
        const uploadSpeed = (testData.size * 8) / (1024 * 1024 * uploadTime);
        uploadSpeedEl.textContent = `${uploadSpeed.toFixed(2)} Mbps`;
        logMessage(`업로드 속도: ${uploadSpeed.toFixed(2)} Mbps`);

        logMessage('테스트 완료');
        startSpeedTestBtn.disabled = false;
        startSpeedTestBtn.classList.remove('loading');
        startSpeedTestBtn.textContent = '테스트 시작';
    });

    function logMessage(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        speedTestLog.appendChild(logEntry);
    }
}
