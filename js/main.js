/* js/main.js */
import { initMetadataViewer } from "./metadataViewer.js";
import { initCalculator } from "./calculator.js";
import { initUnitConverter } from "./converter.js";
import { initImageCompressor } from "./imageCompressor.js";
import { initSpeedTest } from "./speedTest.js";
import { initSeoAnalyzer } from "./seoAnalyzer.js";
import { initReservationMove } from "./reservationMove.js";
import { initTodo } from "./todo.js";
import { initQRCodeGenerator } from "./qrCode.js";
import { initSalaryCalculator } from "./salaryCalculator.js";
import { initTextCompare } from "./textCompare.js";
import { initPdfTools } from './pdfTools.js';
import { initRetirementCalculator } from "./retirementCalculator.js";
import { initUnemploymentCalculator } from "./unemploymentCalculator.js";
import { initIpChecker } from "./ipChecker.js";
import { initTextAnalyzer } from "./textAnalyzer.js";
import { initUrlShortener } from "./urlShortener.js";
import { initBusinessCard } from "./businessCard.js";
import { initFaviconGenerator } from "./faviconGenerator.js";
import { initGifGenerator } from './gifGenerator.js';
import { initLoanCalculator } from './loanCalculator.js';
import { initProjectManager } from './projectManager.js';
import { initMemoTool } from "./memoTool.js";
import { initTextEncryption } from './textEncryption.js';
import { initLottoCalculator } from './lottoCalculator.js';
import { initLottoRecommend } from './lottoRecommend.js';

document.addEventListener('DOMContentLoaded', () => {
    // PDF 변환 & 타임존 변환 버튼/섹션 제거 (기존 코드에서 제거 처리)
    const pdfConverterBtn = document.querySelector('button[data-target="pdfConverter"]');
    const pdfConverterSection = document.getElementById('pdfConverter');
    if (pdfConverterBtn) pdfConverterBtn.remove();
    if (pdfConverterSection) pdfConverterSection.remove();

    const timezoneConverterBtn = document.querySelector('button[data-target="timezoneConverter"]');
    const timezoneConverterSection = document.getElementById('timezoneConverter');
    if (timezoneConverterBtn) timezoneConverterBtn.remove();
    if (timezoneConverterSection) timezoneConverterSection.remove();

    // 메뉴 네비게이션
    document.querySelectorAll('#menu button').forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼의 active 클래스 제거
            document.querySelectorAll('#menu button').forEach(btn => {
                btn.classList.remove('active');
            });
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');
            // 모든 섹션 숨기기
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });
            // 선택된 섹션 보이기
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // 첫 번째 섹션만 보이게 하기
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.display = (index === 0) ? 'block' : 'none';
    });

    // 첫 번째 메뉴 버튼 활성화
    const firstButton = document.querySelector('#menu button');
    if (firstButton) {
        firstButton.classList.add('active');
    }

    // 개별 기능 모듈 초기화
    initMetadataViewer();
    initCalculator();
    initUnitConverter();
    initImageCompressor();
    initSpeedTest();
    initSeoAnalyzer();
    initReservationMove();
    initTodo();
    initQRCodeGenerator();
    initSalaryCalculator();
    initTextCompare();
    initPdfTools();
    initRetirementCalculator();
    initUnemploymentCalculator();
    initIpChecker();
    initTextAnalyzer();
    initUrlShortener();
    initBusinessCard();
    initFaviconGenerator();
    initGifGenerator();
    initLoanCalculator();
    initProjectManager();

    // 메모 도구 초기화를 setTimeout으로 지연
    setTimeout(() => {
        initMemoTool();
    }, 100);

    // 메뉴 토글 기능
    initMenuToggle();

    // 오디오 플레이어 초기화
    initAudioPlayer();

    initTextEncryption();

    initLottoCalculator();
    initLottoRecommend();
});

// 메뉴 토글 기능
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    function toggleMenu() {
        const isOpen = menu.classList.contains('menu-open');
        menuToggle.textContent = isOpen ? '메뉴 열기' : '메뉴 닫기';
        menu.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);

    // 메뉴 항목 클릭 시 메뉴 닫기
    const menuButtons = menu.querySelectorAll('button');
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
}

function initAudioPlayer() {
    const audioSelect = document.getElementById('audioSelect');
    const audioElement = document.getElementById('audioElement');
    
    const audioUrls = {
        '1': 'https://blog.kakaocdn.net/dn/DaPnJ/btr4wEGwDDh/MJMRFCWzn2nDUwd6eM9Xlk/1.wav?attach=1&knm=tfile.wav',
        '3': 'https://blog.kakaocdn.net/dn/0RYD1/btr4WHgHsXe/FvK81Ecf9qe69GfRwt2d9K/3.wav?attach=1&knm=tfile.wav',
        '5': 'https://blog.kakaocdn.net/dn/bP0lNZ/btr4xiXsGyF/Nuhqrk1thrf0hH4T8W3YoK/5.wav?attach=1&knm=tfile.wav',
        '7': 'https://blog.kakaocdn.net/dn/bKQk3R/btr4TJseWVN/g5EPpVVfhIAZwKxSXac3G1/7.wav?attach=1&knm=tfile.wav',
        '9': 'https://blog.kakaocdn.net/dn/bkO4sF/btr4wMqYGIp/KCQQJlDpKA6BL3qvjq38P1/9.wav?attach=1&knm=tfile.wav'
    };

    audioSelect.addEventListener('change', () => {
        const selectedValue = audioSelect.value;
        if (selectedValue && audioUrls[selectedValue]) {
            audioElement.src = audioUrls[selectedValue];
            audioElement.play();
        }
    });

    // 트랙 종료 시 다음 트랙 자동 재생
    audioElement.addEventListener('ended', () => {
        const options = audioSelect.options;
        let currentIndex = audioSelect.selectedIndex;
        let nextIndex = (currentIndex + 1) % options.length;
        
        // 첫 번째 옵션("음악 선택")을 건너뛰기
        if (nextIndex === 0) nextIndex = 1;
        
        audioSelect.selectedIndex = nextIndex;
        const nextValue = options[nextIndex].value;
        if (nextValue && audioUrls[nextValue]) {
            audioElement.src = audioUrls[nextValue];
            audioElement.play();
        }
    });
}
