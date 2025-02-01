<!-- partials/nav.php -->
<button id="menuToggle" class="menu-toggle">
    메뉴 열기
</button>

<nav id="menu" class="menu-closed">
    <!-- 배경음악 플레이어 (접히지 않는 고정 요소) -->
    <div id="bgmPlayer">
        <div class="audio-container">
            <div class="audio-controls">
                <select id="audioSelect" class="audio-select">
                    <option value="">음악 선택</option>
                    <option value="1">음악 1</option>
                    <option value="3">음악 3</option>
                    <option value="5">음악 5</option>
                    <option value="7">음악 7</option>
                    <option value="9">음악 9</option>
                </select>
                <div class="player-controls">
                    <audio id="audioElement"></audio>
                    <div class="custom-controls">
                        <button id="playPauseBtn" class="control-btn">
                            <i class="fas fa-play"></i>
                        </button>
                        <button id="stopBtn" class="control-btn">
                            <i class="fas fa-stop"></i>
                        </button>
                    </div>
                    <div class="volume-slider">
                        <i class="fas fa-volume-up"></i>
                        <input type="range" id="volumeControl" min="0" max="1" step="0.1" value="1">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 메인 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>메인</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="main" class="active">메인화면</button>
            <button data-target="notice">공지사항</button>
            <button data-target="utility">유틸리티</button>
            <button data-target="advertise">광고문의</button>
        </div>
    </div>

    <!-- 커뮤니티 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>커뮤니티</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="infoShare">정보 공유</button>
            <button data-target="community">직장인 커뮤니티</button>
        </div>
    </div>

    <!-- 일정관리 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>일정관리</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="projectManager">프로젝트 캘린더</button>
            <button data-target="todo">To-Do 리스트</button>
            <button data-target="reservationMove">예약 이동</button>
        </div>
    </div>

    <!-- 문서 도구 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>문서 도구</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="memoTool">메모 기능</button>
            <button data-target="pdfTools">PDF 도구</button>
            <button data-target="textCompare">텍스트 비교</button>
            <button data-target="textAnalyzer">글자 분석기</button>
            <button data-target="textEncryption">텍스트 암호화</button>
        </div>
    </div>

    <!-- 변환 도구 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>변환 도구</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="qrcode">QR 코드 생성기</button>
            <button data-target="converter">단위 변환기</button>
            <button data-target="imageCompressor">이미지 압축기</button>
            <button data-target="faviconGenerator">아이콘 생성기</button>
            <button data-target="gifGenerator">GIF 생성기</button>
        </div>
    </div>

    <!-- 계산기 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>계산기</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="calculator">일반 계산기</button>
            <button data-target="salaryCalculator">시급/월급 계산기</button>
            <button data-target="retirementCalculator">퇴직금 계산기</button>
            <button data-target="unemploymentCalculator">실업급여 계산기</button>
            <button data-target="loanCalculator">이자/대출 계산기</button>
            <button data-target="savingsCalculator">저축 계산기</button>
        </div>
    </div>

    <!-- 네트워크 도구 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>네트워크 도구</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="speedTest">네트워크 속도 테스트</button>
            <button data-target="ipChecker">IP 주소 확인</button>
            <button data-target="seoAnalyzer">SEO 분석 도구</button>
            <button data-target="urlShortener">URL 단축</button>
        </div>
    </div>

    <!-- 재미 도구 그룹 -->
    <div class="menu-group">
        <div class="menu-group-title">
            <span>재미</span>
            <i class="fas fa-chevron-right"></i>
        </div>
        <div class="menu-group-content">
            <button data-target="foodRecommend">음식 메뉴 추천</button>
        </div>
    </div>
</nav>

<div class="menu-overlay"></div>
