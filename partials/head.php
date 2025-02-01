<!-- partials/head.php -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6850774354925156"
     crossorigin="anonymous"></script>
    <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q9W85P8J72"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q9W85P8J72');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,
          initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- 기본 메타 정보 -->
    <meta name="description" content="마타리 사무 도구 모음...">
    <meta name="keywords" content="마타리, 사무도구, PDF도구...">
    <meta name="author" content="마타리">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="마타리 사무 도구 모음">
    <meta property="og:description" content="PDF 도구, QR코드 생성, ...">
    <meta property="og:image" content="img/meta.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="675">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="마타리 사무 도구 모음">
    <meta name="twitter:description" content="PDF 도구, QR코드 생성, ...">
    <meta name="twitter:image" content="img/meta.png">

    <!-- 모바일 최적화 -->
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#2A395A">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <!-- 검색엔진 -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">

    <title>마타리 사무 도구 모음</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">

    <!-- 공통 스타일 -->
    <link rel="stylesheet" href="css/common.css">

    <!-- 모듈별 CSS -->
    <link rel="stylesheet" href="css/main-screen.css">
    <link rel="stylesheet" href="css/notice.css">
    <link rel="stylesheet" href="css/info-share.css">
    <link rel="stylesheet" href="css/text-comparison.css">
    <link rel="stylesheet" href="css/pdf-tools.css">
    <link rel="stylesheet" href="css/retirement.css">
    <link rel="stylesheet" href="css/ip-checker.css">
    <link rel="stylesheet" href="css/char-count.css">
    <link rel="stylesheet" href="css/url-shortener.css">
    <link rel="stylesheet" href="css/community.css">
    <link rel="stylesheet" href="css/advertise.css">
    <link rel="stylesheet" href="css/project-management.css">
    <link rel="stylesheet" href="css/memo.css">
    <link rel="stylesheet" href="css/text-encryption.css">
    <link rel="stylesheet" href="css/icon-generator.css">
    <link rel="stylesheet" href="css/gif-generator.css">
    <link rel="stylesheet" href="css/savings.css">
    <link rel="stylesheet" href="css/food-recommend.css">
    <link rel="stylesheet" href="css/utility.css">
    <link rel="stylesheet" href="css/todo.css">
    <link rel="stylesheet" href="css/reservation-move.css">
    <link rel="stylesheet" href="css/calculator.css">
    <link rel="stylesheet" href="css/salary-calculator.css">
    <link rel="stylesheet" href="css/qrcode.css">
    <link rel="stylesheet" href="css/converter.css">
    <link rel="stylesheet" href="css/image-compressor.css">
    <link rel="stylesheet" href="css/retirement-calculator.css">
    <link rel="stylesheet" href="css/unemployment-calculator.css">
    <link rel="stylesheet" href="css/loan-calculator.css">
    <link rel="stylesheet" href="css/savings-calculator.css">
    <link rel="stylesheet" href="css/speedtest.css">
    <link rel="stylesheet" href="css/seo-analyzer.css">
    <link rel="stylesheet" href="css/nav.css">

    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/responsive.css">

    <!-- 라이브러리(PDF, QR 등) -->
    <script src="https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>

    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" type="image/x-icon" href="img/logo.ico">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/gif.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js"></script>

    <!-- 날씨 아이콘을 위한 Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- 날씨 섹션 스타일 -->
    <style>
        .weather-section h3 {
            color: #333;
            margin-bottom: 1rem;
        }
        
        .weather-section select {
            border: 1px solid #ddd;
            background: white;
            cursor: pointer;
        }
        
        .weather-section select:hover {
            border-color: #999;
        }
        
        .weather-condition {
            margin: 1rem 0;
        }
        
        .aqi-label {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        #aqiValue {
            color: #666;
        }
        
        #weatherComment {
            line-height: 1.5;
        }
        
        .weather-icon {
            font-size: 2rem;
            margin: 0.5rem 0;
        }
    </style>

    <link rel="stylesheet" href="css/header.css">
</head>
<body>
    <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-6850774354925156">
    </amp-auto-ads>

    <script src="js/search.js"></script>
