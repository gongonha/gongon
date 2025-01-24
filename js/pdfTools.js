/* js/pdfTools.js */
// PDF.js 워커 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

export function initPdfTools() {
    const pdfInput = document.getElementById('pdfInput');
    const imageInputPdf = document.getElementById('imageInputPdf');
    const pdfPreview = document.getElementById('pdfPreview');
    const imageList = document.getElementById('imageList');
    const createPdfBtn = document.getElementById('createPdf');
    const imageFormat = document.getElementById('imageFormat');
    const imageQuality = document.getElementById('imageQuality');
    const pdfQuality = document.getElementById('pdfQuality');
    const pdfPageSize = document.getElementById('pdfPageSize');

    if (!pdfInput || !imageInputPdf || !pdfPreview || !imageList || !createPdfBtn) return;

    // PDF to Image
    pdfInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            pdfPreview.innerHTML = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const container = document.createElement('div');
                container.className = 'pdf-page-container';
                
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-btn';
                downloadBtn.textContent = '다운로드';
                downloadBtn.addEventListener('click', () => {
                    const format = imageFormat.value;
                    const quality = getQualityValue(imageQuality.value);
                    
                    canvas.toBlob((blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `page_${i}.${format}`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }, `image/${format}`, quality);
                });

                container.appendChild(canvas);
                container.appendChild(downloadBtn);
                pdfPreview.appendChild(container);
            }
        } catch (error) {
            console.error('PDF 처리 중 오류:', error);
            alert('PDF 처리 중 오류가 발생했습니다.');
        }
    });

    // Image to PDF
    let selectedImages = [];

    imageInputPdf.addEventListener('change', handleImageSelection);
    createPdfBtn.addEventListener('click', createPdfFromImages);

    async function handleImageSelection(e) {
        const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
        if (files.length === 0) return;

        selectedImages = [];
        imageList.innerHTML = '';
        createPdfBtn.style.display = 'block';

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    selectedImages.push({
                        file: file,
                        dataUrl: e.target.result,
                        width: img.width,
                        height: img.height
                    });

                    const container = document.createElement('div');
                    container.className = 'image-item';
                    container.draggable = true;
                    container.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}">
                        <span>${file.name}</span>
                        <button class="remove-btn">×</button>
                    `;

                    container.querySelector('.remove-btn').addEventListener('click', () => {
                        const index = selectedImages.findIndex(img => img.dataUrl === e.target.result);
                        if (index > -1) {
                            selectedImages.splice(index, 1);
                            container.remove();
                            if (selectedImages.length === 0) {
                                createPdfBtn.style.display = 'none';
                            }
                        }
                    });

                    imageList.appendChild(container);
                };
            };
            reader.readAsDataURL(file);
        }

        initSortable();
    }

    async function createPdfFromImages() {
        if (selectedImages.length === 0) return;

        try {
            const pdfDoc = await PDFLib.PDFDocument.create();
            const quality = getQualityValue(pdfQuality.value);
            const pageSize = pdfPageSize.value;

            for (const image of selectedImages) {
                let imgData;
                if (image.file.type === 'image/jpeg') {
                    imgData = await pdfDoc.embedJpg(image.dataUrl);
                } else {
                    imgData = await pdfDoc.embedPng(image.dataUrl);
                }

                let pageWidth, pageHeight;
                if (pageSize === 'a4') {
                    pageWidth = 595.276;
                    pageHeight = 841.890;
                } else if (pageSize === 'letter') {
                    pageWidth = 612;
                    pageHeight = 792;
                } else {
                    pageWidth = image.width;
                    pageHeight = image.height;
                }

                const page = pdfDoc.addPage([pageWidth, pageHeight]);
                const { width, height } = imgData.scale(1);

                let scale = Math.min(
                    pageWidth / width,
                    pageHeight / height
                );

                page.drawImage(imgData, {
                    x: (pageWidth - width * scale) / 2,
                    y: (pageHeight - height * scale) / 2,
                    width: width * scale,
                    height: height * scale
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted.pdf';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('PDF 생성 중 오류:', error);
            alert('PDF 생성 중 오류가 발생했습니다.');
        }
    }

    function initSortable() {
        const items = imageList.getElementsByClassName('image-item');
        Array.from(items).forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragover', handleDragOver);
            item.addEventListener('drop', handleDrop);
            item.addEventListener('dragend', handleDragEnd);
        });
    }

    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        if (dragSrcEl !== this) {
            const allItems = [...imageList.getElementsByClassName('image-item')];
            const srcIndex = allItems.indexOf(dragSrcEl);
            const destIndex = allItems.indexOf(this);

            const item = selectedImages[srcIndex];
            selectedImages.splice(srcIndex, 1);
            selectedImages.splice(destIndex, 0, item);

            if (destIndex < srcIndex) {
                this.parentNode.insertBefore(dragSrcEl, this);
            } else {
                this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
            }
        }
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    function getQualityValue(quality) {
        switch (quality) {
            case 'high': return 1.0;
            case 'medium': return 0.7;
            case 'low': return 0.4;
            default: return 0.7;
        }
    }
}