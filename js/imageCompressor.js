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

        // JPEG 포맷으로 압축
        canvas.toBlob(blob => {
            const compressedImg = new Image();
            compressedImg.src = URL.createObjectURL(blob);

            compressedImg.onload = () => {
                const compressedInfoDiv = document.createElement('div');
                compressedInfoDiv.className = 'image-info';
                compressedInfoDiv.innerHTML = `
                    <p>압축된 크기: ${(blob.size / 1024).toFixed(2)} KB</p>
                    <p>압축된 해상도: ${compressedImg.width} x ${compressedImg.height}</p>
                `;
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn';
                downloadBtn.textContent = '다운로드';
                downloadBtn.addEventListener('click', () => {
                    const link = document.createElement('a');
                    link.href = compressedImg.src;
                    link.download = `compressed_${file.name}`;
                    link.click();
                });

                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.appendChild(compressedImg);
                previewItem.appendChild(compressedInfoDiv);
                previewItem.appendChild(downloadBtn);

                compressPreview.appendChild(previewItem);
            };
        }, 'image/jpeg', quality);
    }
}
