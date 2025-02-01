<!-- components/speedtest.php -->
<div id="speedTest" class="section">
    <h2>네트워크 속도 테스트</h2>
    <div class="speedtest-container">
        <button id="startSpeedTest">테스트 시작</button>
        <div class="speed-results">
            <div class="speed-item">
                <span>다운로드 속도</span>
                <span id="downloadSpeed">-</span>
            </div>
            <div class="speed-item">
                <span>업로드 속도</span>
                <span id="uploadSpeed">-</span>
            </div>
            <div class="speed-item">
                <span>지연 시간</span>
                <span id="pingSpeed">-</span>
            </div>
        </div>
        <div id="speedTestLog" class="speed-test-log"></div>
    </div>
</div>
