export function initUrlShortener() {
    const longUrlInput = document.getElementById('longUrl');
    const serviceType = document.getElementById('serviceType');
    const shortenButton = document.getElementById('shortenButton');
    const shortUrlInput = document.getElementById('shortUrl');
    const copyButton = document.getElementById('copyButton');
    const resultContainer = document.querySelector('.result-container');

    async function shortenUrl() {
        const longUrl = longUrlInput.value.trim();
        
        // URL 유효성 검사
        if (!longUrl) {
            alert('URL을 입력해주세요.');
            return;
        }

        try {
            new URL(longUrl);
        } catch (e) {
            alert('유효한 URL을 입력해주세요.');
            return;
        }

        // 버튼 비활성화 및 로딩 표시
        shortenButton.disabled = true;
        shortenButton.textContent = '단축 중...';

        try {
            let shortUrl;
            
            if (serviceType.value === 'isgd') {
                // is.gd API 사용
                const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
                const data = await response.json();
                shortUrl = data.shorturl;
            } else {
                // tinyurl API 사용
                const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
                shortUrl = await response.text();
            }

            // 결과 표시
            shortUrlInput.value = shortUrl;
            resultContainer.style.display = 'block';
        } catch (error) {
            alert('URL 단축 중 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('URL 단축 오류:', error);
        } finally {
            // 버튼 상태 복원
            shortenButton.disabled = false;
            shortenButton.textContent = 'URL 단축하기';
        }
    }

    // URL 복사 함수
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(shortUrlInput.value);
            const originalText = copyButton.textContent;
            copyButton.textContent = '복사됨!';
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        } catch (err) {
            alert('URL 복사 중 오류가 발생했습니다.');
            console.error('복사 오류:', err);
        }
    }

    // 이벤트 리스너 등록
    shortenButton.addEventListener('click', shortenUrl);
    copyButton.addEventListener('click', copyToClipboard);

    // Enter 키로도 단축 가능하도록 설정
    longUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            shortenUrl();
        }
    });
} 