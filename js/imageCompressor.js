/* js/imageCompressor.js */
export function initImageCompressor() {
    const pdfImageInput = document.getElementById('imageInput');
    const compressPreview = document.getElementById('imagePreview');
    const compressImagesBtn = document.getElementById('compressImages');
    const qualityInput = document.getElementById('qualityInput');
    const maxWidthInput = document.getElementById('maxWidthInput');

    if (!pdfImageInput || !compressPreview || !qualityInput || !maxWidthInput) return;
    // compressImagesBtn은 현재 숨겨져 있으므로 없어도 무방

    // 파일 선택 시
    pdfImageInput.addEventListener('change', handleImageUpload);

    function handleImageUpload(event) {
        const files = event.target.files;
        compressPreview.innerHTML = '';

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    displayImageInfo(file, img);
                    compressImage(file, img);
                };
            };
            reader.readAsDataURL(file);
        });
    }

    function displayImageInfo(file, img) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'image-info';
        infoDiv.innerHTML = `
            <p>파일명: ${file.name}</p>
            <p>원본 크기: ${(file.size / 1024).toFixed(2)} KB</p>
            <p>원본 해상도: ${img.width} x ${img.height}</p>
        `;
        compressPreview.appendChild(infoDiv);
    }

    function compressImage(file, img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = parseInt(maxWidthInput.value, 10);
        const quality = parseInt(qualityInput.value, 10) / 100;

        // 가로 크기 제한
        const scale = Math.min(maxWidth / img.width, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 원본 이미지 크기 계산
        const originalSize = file.size / 1024; // KB로 변환
        
        // JPEG 포맷으로 압축
        canvas.toBlob(blob => {
            const compressedImg = new Image();
            compressedImg.src = URL.createObjectURL(blob);

            compressedImg.onload = () => {
                const compressedSize = blob.size / 1024; // KB로 변환
                
                if (compressedSize > originalSize) {
                    // 압축 결과가 원본보다 큰 경우
                    const confirmUseOriginal = confirm(
                        `현재 설정된 품질(${quality * 100}%)로는 파일 크기가 오히려 증가합니다.\n` +
                        `원본: ${originalSize.toFixed(2)}KB → 압축: ${compressedSize.toFixed(2)}KB\n\n` +
                        `원본 이미지를 그대로 사용하시겠습니까?\n` +
                        `('취소' 선택 시 현재 설정으로 진행)`
                    );
                    
                    if (confirmUseOriginal) {
                        // 원본 이미지 사용
                        const originalBlob = new Blob([file], { type: file.type });
                        const originalImg = new Image();
                        originalImg.src = URL.createObjectURL(originalBlob);
                        originalImg.onload = () => {
                            updateCompressedPreview(originalBlob, file, originalImg, true);
                        };
                        return;
                    }
                }
                
                updateCompressedPreview(blob, file, compressedImg);
            };
        }, 'image/jpeg', quality);
    }

    function updateCompressedPreview(blob, file, compressedImg, isOriginal = false) {
        const comparisonDiv = document.createElement('div');
        comparisonDiv.className = 'IC_comparison-container';
        
        // 원본과 압축 이미지 미리보기 컨테이너
        const previewsContainer = document.createElement('div');
        previewsContainer.className = 'IC_previews-container';
        
        // 원본 이미지 미리보기
        const originalPreview = document.createElement('div');
        originalPreview.className = 'IC_preview-box';
        const originalImg = new Image();
        originalImg.src = URL.createObjectURL(file);
        originalImg.className = 'IC_preview-image';
        
        // 이미지 로드 완료 후 정보 표시
        originalImg.onload = () => {
            // 원본 정보
            const originalInfo = document.createElement('div');
            originalInfo.className = 'IC_info-box';
            originalInfo.innerHTML = `
                <h4>원본 이미지</h4>
                <p><strong>파일명:</strong> ${file.name}</p>
                <p><strong>크기:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
                <p><strong>해상도:</strong> ${originalImg.width} x ${originalImg.height}</p>
            `;
            
            // 압축된 이미지 미리보기
            const compressedPreview = document.createElement('div');
            compressedPreview.className = 'IC_preview-box';
            compressedImg.className = 'IC_preview-image';
            
            // 압축 정보
            const compressedInfo = document.createElement('div');
            compressedInfo.className = 'IC_info-box';
            compressedInfo.innerHTML = `
                <h4>${isOriginal ? '원본 유지' : '압축된 이미지'}</h4>
                <p><strong>파일명:</strong> ${isOriginal ? file.name : `compressed_${file.name}`}</p>
                <p><strong>크기:</strong> ${(blob.size / 1024).toFixed(2)} KB</p>
                <p><strong>해상도:</strong> ${compressedImg.width} x ${compressedImg.height}</p>
                ${!isOriginal ? `<p><strong>압축률:</strong> ${(100 - (blob.size / file.size) * 100).toFixed(1)}%</p>` : 
                '<p><strong>상태:</strong> <span style="color: #ff9800">원본 유지됨</span></p>'}
            `;
            
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'IC_download-btn';
            downloadBtn.innerHTML = `<i class="fas fa-download"></i> ${isOriginal ? '원본' : '압축된'} 이미지 다운로드`;
            downloadBtn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = compressedImg.src;
                link.download = isOriginal ? file.name : `compressed_${file.name}`;
                link.click();
            });
            
            originalPreview.appendChild(originalImg);
            originalPreview.appendChild(originalInfo);
            compressedPreview.appendChild(compressedImg);
            compressedPreview.appendChild(compressedInfo);
            compressedPreview.appendChild(downloadBtn);
            
            previewsContainer.appendChild(originalPreview);
            previewsContainer.appendChild(compressedPreview);
            
            const previewItem = document.createElement('div');
            previewItem.className = 'IC_preview-item';
            previewItem.appendChild(previewsContainer);
            
            compressPreview.appendChild(previewItem);
        };
    }
}
