export function initIpChecker() {
    const ipInfo = document.getElementById('ipInfo');
    const refreshButton = document.getElementById('refreshIp');

    if (!ipInfo || !refreshButton) {
        console.error('필요한 DOM 요소를 찾을 수 없습니다.');
        return;
    }

    async function getIpInfo() {
        try {
            ipInfo.innerHTML = '<div class="loading-spinner"></div>';
            refreshButton.disabled = true;
            
            const response = await fetch('/api/ip-info.php');
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            // IP 정보 표시
            ipInfo.innerHTML = `
                <div class="ip-info-item highlight">
                    <span class="label"><i class="fas fa-globe"></i>공인 IP</span>
                    <span class="value">${data.ip}</span>
                </div>
                <div class="ip-info-item highlight">
                    <span class="label"><i class="fas fa-network-wired"></i>사설 IP</span>
                    <span class="value">${data.private_ip}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label"><i class="fas fa-map-marker-alt"></i>위치</span>
                    <span class="value">${data.country_name}, ${data.region}, ${data.city}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label"><i class="fas fa-building"></i>ISP</span>
                    <span class="value">${data.org}</span>
                </div>
                <div class="ip-info-item">
                    <span class="label"><i class="fas fa-location-arrow"></i>위도/경도</span>
                    <span class="value">${data.latitude}° / ${data.longitude}°</span>
                </div>
                <div class="ip-info-item">
                    <span class="label"><i class="fas fa-clock"></i>시간대</span>
                    <span class="value">${data.timezone}</span>
                </div>
            `;
        } catch (error) {
            console.error('IP 정보 조회 오류:', error);
            ipInfo.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    IP 정보를 가져오는데 실패했습니다.<br>
                    오류 메시지: ${error.message}
                </div>
            `;
        } finally {
            refreshButton.disabled = false;
        }
    }

    // 새로고침 버튼에 아이콘 추가
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> 새로고침';
    
    // 새로고침 버튼 클릭 이벤트
    refreshButton.addEventListener('click', getIpInfo);

    // 초기 IP 정보 로드
    getIpInfo();
} 