<!-- components/main-screen.php -->
<div id="main" class="section">
    <h2>메인화면</h2>
    <div class="section-description">
        <div class="main-banner">
            <img src="img/meta.png" alt="마타리 사무 도구 모음 배너" class="banner-image">
        </div>
        <!-- 방문자 통계 -->
        <div class="visitor-stats">
            <div class="stat-box">
                <span class="stat-label">오늘 방문자</span>
                <span id="todayVisitors">0</span>
            </div>
            <div class="stat-box">
                <span class="stat-label">전체 방문자</span>
                <span id="totalVisitors">0</span>
            </div>
        </div>
        <div class="search-links">
            <a href="https://www.google.com" target="_blank" class="search-link google-link">
                <i class="fab fa-google"></i>
                <span>구글로 이동</span>
            </a>
            <a href="https://www.naver.com" target="_blank" class="search-link naver-link">
                <i class="fas fa-n"></i>
                <span>네이버로 이동</span>
            </a>
            <a href="https://www.daum.net" target="_blank" class="search-link daum-link">
                <i class="fas fa-d"></i>
                <span>다음으로 이동</span>
            </a>
        </div>
        <div class="weather-section">
            <h3>전국 날씨 정보</h3>
            <div class="region-selector">
                <select id="regionSelect">
                    <option value="seoul">서울특별시</option>
                    <option value="gyeonggi">경기도</option>
                    <option value="gangwon">강원도</option>
                    <option value="chungbuk">충청북도</option>
                    <option value="chungnam">충청남도</option>
                    <option value="jeonbuk">전라북도</option>
                    <option value="jeonnam">전라남도</option>
                    <option value="gyeongbuk">경상북도</option>
                    <option value="gyeongnam">경상남도</option>
                    <option value="jeju">제주도</option>
                </select>
            </div>
            <div class="weather-info">
                <div class="weather-current">
                    <div class="weather-temp">
                        <span id="currentTemp">--</span>°C
                    </div>
                    <div class="weather-details">
                        <div class="weather-condition">
                            <img id="weatherIcon" src="" alt="날씨 아이콘">
                            <span id="weatherDescription">--</span>
                        </div>
                        <div class="weather-extra-info">
                            <div class="info-item">
                                <i class="fas fa-temperature-high"></i>
                                최고: <span id="maxTemp">--</span>°C
                            </div>
                            <div class="info-item">
                                <i class="fas fa-temperature-low"></i>
                                최저: <span id="minTemp">--</span>°C
                            </div>
                            <div class="info-item">
                                <i class="fas fa-tint"></i>
                                습도: <span id="humidity">--</span>%
                            </div>
                            <div class="info-item">
                                <i class="fas fa-wind"></i>
                                풍속: <span id="windSpeed">--</span>m/s
                            </div>
                        </div>
                    </div>
                </div>
                <div class="air-quality">
                    <div class="aqi-label">대기질 정보</div>
                    <div class="aqi-details">
                        <div class="info-item">
                            <i class="fas fa-smog"></i>
                            미세먼지: <span id="pm10">--</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-lungs"></i>
                            초미세먼지: <span id="pm25">--</span>
                        </div>
                    </div>
                </div>
                <div class="weather-comment">
                    <p id="weatherComment">지역을 선택해주세요 😊</p>
                </div>
            </div>
        </div>
    </div>
</div>
