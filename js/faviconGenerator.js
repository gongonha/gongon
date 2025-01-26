export function initFaviconGenerator() {
    const input = document.getElementById('faviconInput');
    const preview = document.getElementById('faviconPreview');
    const generateBtn = document.getElementById('generateFavicon');
    let currentImage = null;

    // 이벤트 리스너 등록
    input.addEventListener('change', handleImageSelect);
    generateBtn.addEventListener('click', generateFavicon);

    function handleImageSelect(e) {
        const file = e.target.files[0];
        if (!file) return;

        // 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 선택할 수 있습니다.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                currentImage = img;
                updatePreviews();
                generateBtn.disabled = false;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updatePreviews() {
        preview.innerHTML = ''; // 기존 미리보기 초기화
        const sizes = getSelectedSizes();
        
        sizes.forEach(size => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            // 이미지를 정사각형으로 크롭
            const minDimension = Math.min(currentImage.width, currentImage.height);
            const sx = (currentImage.width - minDimension) / 2;
            const sy = (currentImage.height - minDimension) / 2;
            
            ctx.drawImage(currentImage, sx, sy, minDimension, minDimension, 0, 0, size, size);
            
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            const previewImage = new Image();
            previewImage.src = canvas.toDataURL('image/png');
            
            const sizeText = document.createElement('span');
            sizeText.textContent = `${size}x${size}`;
            
            previewItem.appendChild(previewImage);
            previewItem.appendChild(sizeText);
            preview.appendChild(previewItem);
        });
    }

    function getSelectedSizes() {
        return Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
            .map(checkbox => parseInt(checkbox.value));
    }

    async function generateFavicon() {
        if (!currentImage) return;
        
        const sizes = getSelectedSizes();
        if (sizes.length === 0) {
            alert('최소한 하나의 크기를 선택해주세요.');
            return;
        }

        try {
            // 가장 큰 크기의 캔버스 생성
            const maxSize = Math.max(...sizes);
            const canvas = document.createElement('canvas');
            canvas.width = maxSize;
            canvas.height = maxSize;
            const ctx = canvas.getContext('2d');

            // 이미지를 정사각형으로 크롭
            const minDimension = Math.min(currentImage.width, currentImage.height);
            const sx = (currentImage.width - minDimension) / 2;
            const sy = (currentImage.height - minDimension) / 2;
            
            ctx.drawImage(currentImage, sx, sy, minDimension, minDimension, 0, 0, maxSize, maxSize);

            // PNG로 다운로드 (임시로 PNG로 제공)
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = 'favicon.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('파비콘 생성 중 오류 발생:', error);
            alert('파비콘 생성 중 오류가 발생했습니다.');
        }
    }

    // 체크박스 변경 시 미리보기 업데이트
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (currentImage) {
                updatePreviews();
            }
        });
    });
} 