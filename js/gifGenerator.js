export function initGifGenerator() {
    const input = document.getElementById('gifInput');
    const imageList = document.getElementById('imageList');
    const preview = document.getElementById('gifPreview');
    const generateBtn = document.getElementById('generateGif');
    const frameDelay = document.getElementById('frameDelay');
    const repeatCount = document.getElementById('repeatCount');
    const quality = document.getElementById('gifQuality');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progressBar');

    let images = [];
    let selectedFiles = [];

    input.addEventListener('change', (e) => handleFiles(Array.from(e.target.files)));
    generateBtn.addEventListener('click', generateGif);

    function handleFiles(files) {
        if (files.length === 0) return;

        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) {
            alert('이미지 파일만 선택할 수 있습니다.');
            return;
        }

        selectedFiles = selectedFiles.concat(imageFiles);
        updatePreview();
        processImages();
    }

    function updatePreview() {
        const previewContainer = document.getElementById('selectedImagesPreview');
        previewContainer.innerHTML = '';

        selectedFiles.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-image';
            removeButton.innerHTML = '×';
            removeButton.onclick = () => removeImage(index);

            previewItem.appendChild(img);
            previewItem.appendChild(removeButton);
            previewContainer.appendChild(previewItem);
        });
    }

    function removeImage(index) {
        selectedFiles.splice(index, 1);
        updatePreview();
        processImages();
        
        if (selectedFiles.length === 0) {
            generateBtn.disabled = true;
            preview.innerHTML = '';
        }
    }

    function processImages() {
        imageList.innerHTML = '';
        images = [];
        generateBtn.disabled = true;

        if (selectedFiles.length === 0) {
            return;
        }

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    images.push(img);

                    const item = document.createElement('div');
                    item.className = 'gif-image-item';

                    const previewImg = document.createElement('img');
                    previewImg.src = event.target.result;
                    previewImg.alt = `이미지 ${index + 1}`;

                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'gif-remove-image';
                    removeBtn.innerHTML = '×';
                    removeBtn.onclick = (e) => {
                        e.preventDefault();
                        removeImage(index);
                    };

                    item.appendChild(previewImg);
                    item.appendChild(removeBtn);
                    imageList.appendChild(item);

                    if (images.length > 0) {
                        generateBtn.disabled = false;
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function generateGif() {
        if (images.length === 0) return;

        const gif = new GIF({
            workers: 2,
            quality: parseInt(quality.value) || 10,
            repeat: parseInt(repeatCount.value) || 0,
            width: 500,
            height: 375,
            workerScript: 'js/gif.worker.js'
        });

        generateBtn.disabled = true;
        generateBtn.textContent = 'GIF 생성 중...';
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';

        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 375;
        const ctx = canvas.getContext('2d');

        images.forEach(img => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );
            const width = img.width * scale;
            const height = img.height * scale;
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, x, y, width, height);

            gif.addFrame(ctx, {
                copy: true,
                delay: parseInt(frameDelay.value) || 500
            });
        });

        gif.on('finished', function(blob) {
            preview.innerHTML = '';
            const previewImg = document.createElement('img');
            previewImg.src = URL.createObjectURL(blob);
            preview.appendChild(previewImg);

            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'animation.gif';
            a.click();

            generateBtn.disabled = false;
            generateBtn.textContent = 'GIF 생성';
            progressContainer.style.display = 'none';
        });

        gif.on('progress', function(p) {
            const percent = Math.round(p * 100);
            progressBar.style.width = `${percent}%`;
            progressBar.textContent = `${percent}%`;
        });

        gif.render();
    }
}