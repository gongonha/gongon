<!-- index.php -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <?php include 'partials/head.php'; ?>    <!-- <html> ~ <head> ~ <body> 열림 -->
    <link rel="stylesheet" href="css/weather.css">
</head>
<body>
    <?php include 'partials/header.php'; ?>  <!-- header -->
    <?php include 'partials/nav.php'; ?>     <!-- nav 메뉴 -->

    <main>
        <!-- 메인화면 -->
        <?php include 'components/main-screen.php'; ?>
        <!-- 공지사항 -->
        <?php include 'components/notice.php'; ?>
        <!-- To-Do 리스트 -->
        <?php include 'components/todo.php'; ?>
        <!-- QR 코드 생성기 -->
        <?php include 'components/qrcode.php'; ?>
        <!-- 계산기 -->
        <?php include 'components/calculator.php'; ?>
        <!-- 단위 변환기 -->
        <?php include 'components/converter.php'; ?>
        <!-- 이미지 압축기 -->
        <?php include 'components/image-compressor.php'; ?>
        <!-- 네트워크 속도 테스트 -->
        <?php include 'components/speedtest.php'; ?>
        <!-- SEO 분석 도구 -->
        <?php include 'components/seoanalyzer.php'; ?>
        <!-- 예약 이동 -->
        <?php include 'components/reservation-move.php'; ?>
        <!-- 시급/월급 계산기 -->
        <?php include 'components/salary-calculator.php'; ?>
        <!-- 텍스트 비교 -->
        <?php include 'components/text-compare.php'; ?>
        <!-- PDF 도구 -->
        <?php include 'components/pdf-tools.php'; ?>
        <!-- 퇴직금 계산기 -->
        <?php include 'components/retirement-calculator.php'; ?>
        <!-- 실업급여 계산기 -->
        <?php include 'components/unemployment-calculator.php'; ?>
        <!-- IP 주소 확인 -->
        <?php include 'components/ip-checker.php'; ?>
        <!-- 글자 수 분석기 -->
        <?php include 'components/text-analyzer.php'; ?>
        <!-- URL 단축 -->
        <?php include 'components/url-shortener.php'; ?>
        <!-- 유틸리티 -->
        <?php include 'components/utility.php'; ?>
        <!-- 파비콘 생성기 -->
        <?php include 'components/favicon-generator.php'; ?>
        <!-- GIF 생성기 -->
        <?php include 'components/gif-generator.php'; ?>
        <!-- 이자/대출 계산기 -->
        <?php include 'components/loan-calculator.php'; ?>
        <!-- 직장인 커뮤니티 -->
        <?php include 'components/community.php'; ?>
        <!-- 정보 공유 -->
        <?php include 'components/info-share.php'; ?>
        <!-- 광고 문의 -->
        <?php include 'components/advertise.php'; ?>
        <!-- 프로젝트 관리 -->
        <?php include 'components/project-manager.php'; ?>
        <!-- 메모 기능 -->
        <?php include 'components/memo-tool.php'; ?>
        <!-- 텍스트 암호화 -->
        <?php include 'components/text-encryption.php'; ?>
        <!-- 저축 계산기 -->
        <?php include 'components/savings-calculator.php'; ?>
        <!-- 음식 메뉴 추천 -->
        <?php include 'components/food-recommend.php'; ?>
    </main>

    <?php include 'partials/footer.php'; ?>  <!-- footer, </body></html> 닫힘 -->

    <!-- JavaScript 파일들을 body 끝에 배치 -->
    <script type="module">
        import { initIpChecker } from './js/ipChecker.js';
        
        // 페이지가 완전히 로드된 후 초기화
        window.addEventListener('load', () => {
            initIpChecker();
        });
    </script>

    <script src="js/weather.js"></script>

    <a href="https://twitter.com/haengjang0125" target="_blank" class="floating-twitter">
        <i class="fa-brands fa-x-twitter"></i>
    </a>
</body>
</html>
