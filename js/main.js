/* js/main.js */
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
import { initFaviconGenerator } from "./faviconGenerator.js";
import { initGifGenerator } from './gifGenerator.js';
import { initProjectManager } from './projectManager.js';
import { initMemoTool } from "./memoTool.js";
import { initTextEncryption } from './textEncryption.js';
import { initSavingsCalculator } from './savingsCalculator.js';
import { initFoodRecommend } from './foodRecommend.js';

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
        // 오디오 컨트롤 버튼은 제외
        if (button.classList.contains('control-btn')) return;

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
    initFaviconGenerator();
    initGifGenerator();
    initProjectManager();
    initMemoTool();
    initTextEncryption();
    initSavingsCalculator();
    initFoodRecommend();

    // 오디오 플레이어 초기화
    initAudioPlayer();

    // 날씨 서비스 초기화
    if (document.querySelector('.weather-section')) {
        import('./weather.js')
            .then(module => {
                new module.WeatherService();
            })
            .catch(error => {
                console.error('날씨 모듈 로딩 실패:', error);
            });
    }

    initMenuGroups();
    
    // 메뉴 버튼 클릭 시 해당 그룹 펼치기
    document.querySelectorAll('#menu button').forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼의 active 클래스 제거
            document.querySelectorAll('#menu button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 클릭된 버튼에 active 클래스 추가
            button.classList.add('active');
            
            // 현재 활성화된 버튼의 그룹 content 펼치기
            const activeGroup = button.closest('.menu-group');
            if (activeGroup) {
                const activeTitle = activeGroup.querySelector('.menu-group-title');
                const activeContent = activeGroup.querySelector('.menu-group-content');
                
                activeTitle.classList.remove('collapsed');
                activeContent.classList.remove('collapsed');
            }
        });
    });

    // 메뉴 토글 기능 추가
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('menu-open');
            menuToggle.textContent = menu.classList.contains('menu-open') 
                ? '메뉴 닫기' 
                : '메뉴 열기';
        });
    }
});

function initAudioPlayer() {
    const audioSelect = document.getElementById('audioSelect');
    const audioElement = document.getElementById('audioElement');
    const volumeControl = document.getElementById('volumeControl');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    const audioUrls = {
        '1': 'https://blog.kakaocdn.net/dn/DaPnJ/btr4wEGwDDh/MJMRFCWzn2nDUwd6eM9Xlk/1.wav?attach=1&knm=tfile.wav',
        '3': 'https://blog.kakaocdn.net/dn/0RYD1/btr4WHgHsXe/FvK81Ecf9qe69GfRwt2d9K/3.wav?attach=1&knm=tfile.wav',
        '5': 'https://blog.kakaocdn.net/dn/bP0lNZ/btr4xiXsGyF/Nuhqrk1thrf0hH4T8W3YoK/5.wav?attach=1&knm=tfile.wav',
        '7': 'https://blog.kakaocdn.net/dn/bKQk3R/btr4TJseWVN/g5EPpVVfhIAZwKxSXac3G1/7.wav?attach=1&knm=tfile.wav',
        '9': 'https://blog.kakaocdn.net/dn/bkO4sF/btr4wMqYGIp/KCQQJlDpKA6BL3qvjq38P1/9.wav?attach=1&knm=tfile.wav'
    };

    // 볼륨 컨트롤 이벤트
    volumeControl.addEventListener('input', () => {
        audioElement.volume = volumeControl.value;
    });
    
    // 초기 볼륨 설정
    audioElement.volume = volumeControl.value;

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

    // 재생/일시정지 버튼 클릭 이벤트
    playPauseBtn.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioElement.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // 정지 버튼 클릭 이벤트
    stopBtn.addEventListener('click', () => {
        audioElement.pause();
        audioElement.currentTime = 0;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

function initMenuGroups() {
    const menuGroups = document.querySelectorAll('.menu-group');
    
    menuGroups.forEach(group => {
        const title = group.querySelector('.menu-group-title');
        const content = group.querySelector('.menu-group-content');
        
        // 초기 상태: 모든 메뉴 그룹을 접은 상태로 시작
        if (!content.querySelector('button.active')) {
            title.classList.add('collapsed');
            content.classList.add('collapsed');
            content.style.display = 'none';
        }
        
        title.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isCollapsed = content.classList.contains('collapsed');
            
            // 다른 모든 메뉴 그룹 접기
            menuGroups.forEach(otherGroup => {
                if (otherGroup !== group) {
                    const otherTitle = otherGroup.querySelector('.menu-group-title');
                    const otherContent = otherGroup.querySelector('.menu-group-content');
                    if (!otherContent.querySelector('button.active')) {
                        otherTitle.classList.add('collapsed');
                        otherContent.classList.add('collapsed');
                        otherContent.style.display = 'none';
                    }
                }
            });
            
            // 현재 그룹 토글
            title.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
            
            if (isCollapsed) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // 현재 활성화된 메뉴의 그룹은 펼쳐진 상태로 유지
    const activeButton = document.querySelector('#menu button.active');
    if (activeButton) {
        const activeGroup = activeButton.closest('.menu-group');
        if (activeGroup) {
            const activeTitle = activeGroup.querySelector('.menu-group-title');
            const activeContent = activeGroup.querySelector('.menu-group-content');
            
            activeTitle.classList.remove('collapsed');
            activeContent.classList.remove('collapsed');
            activeContent.style.display = 'block';
        }
    }
}
