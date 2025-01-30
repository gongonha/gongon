export function initImageOcr() {
    // 먼저 Tesseract가 로드되었는지 확인
    if (typeof Tesseract === 'undefined') {
        console.error('Tesseract.js가 로드되지 않았습니다.');
        return;
    }

    const ocrInput = document.getElementById('ocrInput');
    const ocrPreview = document.getElementById('ocrPreview');
    const ocrText = document.getElementById('ocrText');
    const copyButton = document.getElementById('copyOcrText');
    const progressBar = document.getElementById('ocrProgress');
    const progress = progressBar.querySelector('.progress');
    const progressStatus = document.createElement('div');
    progressStatus.className = 'progress-status';
    progressBar.appendChild(progressStatus);

    function updateProgress(status, percent) {
        progressStatus.textContent = status;
        progress.style.width = `${percent}%`;
    }

    // worker 생성 방식 수정
    let worker = null;

    async function initWorker() {
        try {
            updateProgress('Tesseract 초기화 중...', 0);
            worker = await Tesseract.createWorker({
                logger: message => {
                    if (message.status === 'loading tesseract core') {
                        updateProgress('Tesseract 코어 로딩 중...', 0);
                    } else if (message.status === 'loading language traineddata') {
                        updateProgress('언어 데이터 로딩 중...', 20);
                    } else if (message.status === 'initializing api') {
                        updateProgress('API 초기화 중...', 40);
                    } else if (message.status === 'recognizing text') {
                        const percent = 40 + (message.progress * 60);
                        updateProgress('텍스트 인식 중...', percent);
                    }
                }
            });

            await worker.loadLanguage('kor+eng');
            await worker.initialize('kor+eng');
            await worker.setParameters({
                tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
                tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
                preserve_interword_spaces: '1',
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가-힣ㄱ-ㅎㅏ-ㅣ.,!?-_+=()[]{}:;"\'',
                tessjs_create_hocr: '1',
                tessjs_create_tsv: '1',
                textord_tabfind_vertical_text: '1',
                textord_tabfind_force_vertical_text: '0',
                textord_single_column: '0',
                textord_min_linesize: '1.5'
            });
            updateProgress('초기화 완료', 100);
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 1000);
        } catch (error) {
            console.error('Worker 초기화 실패:', error);
            updateProgress('초기화 실패', 0);
        }
    }

    // 페이지 로드 시 worker 초기화
    initWorker();

    ocrInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            let width = img.width;
            let height = img.height;
            
            // 이미지 크기 최적화 (최소 크기 설정)
            const minSize = 800;
            if (width < minSize || height < minSize) {
                const scale = Math.max(minSize / width, minSize / height);
                width = Math.round(width * scale);
                height = Math.round(height * scale);
            }

            canvas.width = width;
            canvas.height = height;

            // 이미지 렌더링 품질 향상
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // 배경 설정
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);

            // 이미지 그리기
            ctx.drawImage(img, 0, 0, width, height);

            // 이미지 처리
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            // 샤프닝 및 대비 향상
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // 그레이스케일 변환 (인간 시각 가중치 적용)
                const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                
                // 로컬 대비 향상
                const contrast = 1.5;
                const brightness = 0;
                const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
                let newValue = factor * (gray - 128) + 128 + brightness;
                
                // 값 범위 제한
                newValue = Math.max(0, Math.min(255, newValue));
                
                // 이진화 (적응형 임계값)
                const threshold = 160;
                const final = newValue > threshold ? 255 : 0;
                
                data[i] = final;
                data[i + 1] = final;
                data[i + 2] = final;
            }

            ctx.putImageData(imageData, 0, 0);

            // 전처리된 이미지 미리보기
            ocrPreview.innerHTML = `<img src="${canvas.toDataURL()}" alt="Preprocessed">`;

            // OCR 시작
            progressBar.style.display = 'block';
            progress.style.width = '0%';
            ocrText.value = '텍스트 추출 준비 중...';

            try {
                if (!worker) {
                    throw new Error('Tesseract worker가 초기화되지 않았습니다.');
                }
                const { data: { text } } = await worker.recognize(canvas);
                ocrText.value = text.trim();
                updateProgress('텍스트 추출 완료!', 100);
                setTimeout(() => {
                    progressBar.style.display = 'none';
                }, 2000);
            } catch (error) {
                console.error('OCR Error:', error);
                ocrText.value = '텍스트 추출에 실패했습니다. 다시 시도해주세요.';
                updateProgress('오류 발생!', 0);
            }
        };

        img.src = URL.createObjectURL(file);
    });

    // 텍스트 복사 기능
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(ocrText.value);
            const originalText = copyButton.textContent;
            copyButton.textContent = '복사 완료!';
            copyButton.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            alert('텍스트 복사에 실패했습니다. 다시 시도해주세요.');
        }
    });
} 