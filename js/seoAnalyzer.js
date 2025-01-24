/* js/seoAnalyzer.js */
export function initSeoAnalyzer() {
    const seoUrlInput = document.getElementById('seoUrl');
    const analyzeSeoBtn = document.getElementById('analyzeSeo');
    const seoResult = document.getElementById('seoResult');

    if (!seoUrlInput || !analyzeSeoBtn || !seoResult) return;

    analyzeSeoBtn.addEventListener('click', async () => {
        let url = seoUrlInput.value.trim();
        if (!url) {
            alert('URL을 입력해주세요.');
            return;
        }

        // URL 형식 확인 및 수정
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
            seoUrlInput.value = url;
        }

        try {
            seoResult.innerHTML = '<p class="analyzing">분석 중...</p>';

            // CORS 프록시로 웹페이지 가져오기
            const corsProxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(corsProxyUrl + encodeURIComponent(url));
            const html = await response.text();

            // HTML 파싱
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // SEO 요소 분석
            const title = doc.title || '없음';
            const metas = doc.getElementsByTagName('meta');
            let description = '없음';
            let keywords = '없음';
            
            for (let meta of metas) {
                if (meta.name === 'description') description = meta.content;
                if (meta.name === 'keywords') keywords = meta.content;
            }

            const h1Tags = doc.getElementsByTagName('h1');
            const h2Tags = doc.getElementsByTagName('h2');
            const imgTags = doc.getElementsByTagName('img');
            const links = doc.getElementsByTagName('a');
            const imagesWithoutAlt = Array.from(imgTags).filter(img => !img.alt).length;

            // 결과 표시
            seoResult.innerHTML = `
                <div class="seo-analysis">
                    <div class="seo-section">
                        <h3>기본 정보</h3>
                        <div class="seo-item">
                            <span class="label">제목:</span>
                            <span class="value">${title}</span>
                        </div>
                        <div class="seo-item">
                            <span class="label">설명:</span>
                            <span class="value">${description}</span>
                        </div>
                        <div class="seo-item">
                            <span class="label">키워드:</span>
                            <span class="value">${keywords}</span>
                        </div>
                    </div>

                    <div class="seo-section">
                        <h3>구조 분석</h3>
                        <div class="seo-item">
                            <span class="label">H1 태그:</span>
                            <span class="value">${h1Tags.length}개</span>
                        </div>
                        <div class="seo-item">
                            <span class="label">H2 태그:</span>
                            <span class="value">${h2Tags.length}개</span>
                        </div>
                        <div class="seo-item">
                            <span class="label">이미지:</span>
                            <span class="value">${imgTags.length}개</span>
                        </div>
                        <div class="seo-item">
                            <span class="label">링크:</span>
                            <span class="value">${links.length}개</span>
                        </div>
                    </div>

                    <div class="seo-section">
                        <h3>개선 사항</h3>
                        <ul class="improvement-list">
                            ${h1Tags.length === 0 ? '<li>H1 태그가 없습니다. 주요 제목을 H1 태그로 표시하세요.</li>' : ''}
                            ${description === '없음' ? '<li>meta description이 없습니다. 검색 결과에 표시될 설명을 추가하세요.</li>' : ''}
                            ${imagesWithoutAlt > 0 ? `<li>alt 속성이 없는 이미지가 ${imagesWithoutAlt}개 있습니다.</li>` : ''}
                            ${keywords === '없음' ? '<li>meta keywords가 없습니다. 주요 키워드를 추가하세요.</li>' : ''}
                        </ul>
                    </div>
                </div>
            `;
        } catch (error) {
            seoResult.innerHTML = `
                <div class="error-message">
                    <p>분석 중 오류가 발생했습니다.</p>
                    <p>가능한 원인:</p>
                    <ul>
                        <li>잘못된 URL 형식</li>
                        <li>웹사이트 접속 불가</li>
                        <li>프록시 서버 오류</li>
                    </ul>
                </div>
            `;
            console.error('오류:', error);
        }
    });
}
