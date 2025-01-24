export function initIpChecker() {
    const ipInfo = document.getElementById('ipInfo');
    const refreshButton = document.getElementById('refreshIp');

    async function getIpInfo() {
        try {
            ipInfo.innerHTML = '<p>IP 정보를 가져오는 중...</p>';
            
            // ipapi.co API를 사용하여 IP 정보 가져오기
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();

            // IP 정보 표시
            ipInfo.innerHTML = `
                <div class="ip-info-item">
                    <span class="label">공인 IP:</span>
                    <span class="value">${data.ip}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label">국가:</span>
                    <span class="value">${data.country_name} (${data.country_code})</span>
                </div>
                <div class="ip-info-item">
                    <span class="label">지역:</span>
                    <span class="value">${data.region}, ${data.city}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label">ISP:</span>
                    <span class="value">${data.org}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label">위도/경도:</span>
                    <span class="value">${data.latitude}° / ${data.longitude}°</span>
                </div>
                <div class="ip-info-item">
                    <span class="label">시간대:</span>
                    <span class="value">${data.timezone}</span>
                </div>
            `;
        } catch (error) {
            ipInfo.innerHTML = `
                <div class="error-message">
                    IP 정보를 가져오는데 실패했습니다.<br>
                    잠시 후 다시 시도해주세요.
                </div>
            `;
            console.error('IP 정보 조회 오류:', error);
        }
    }

    // 새로고침 버튼 클릭 이벤트
    refreshButton.addEventListener('click', getIpInfo);

    // 초기 IP 정보 로드
    getIpInfo();
} 