/* js/metadataViewer.js */
export function initMetadataViewer() {
    const metadataFileInput = document.getElementById('metadataFileInput');
    const metadataResult = document.getElementById('metadataResult');

    if (!metadataFileInput || !metadataResult) return;

    metadataFileInput.addEventListener('change', async (event) => {
        metadataResult.innerHTML = '';
        const files = event.target.files;

        for (const file of files) {
            const card = document.createElement('div');
            card.className = 'metadata-card';
            
            // 기본 메타데이터
            const basicMetadata = {
                "파일 이름": file.name,
                "파일 크기": formatFileSize(file.size),
                "파일 타입": file.type || "알 수 없음",
                "수정 날짜": new Date(file.lastModified).toLocaleString()
            };

            // 파일 타입별 추가 메타데이터
            let additionalMetadata = {};
            
            if (file.type.startsWith("image/")) {
                additionalMetadata = await getImageMetadata(file);
            } else if (file.type.startsWith("audio/")) {
                additionalMetadata = await getAudioMetadata(file);
            } else if (file.type.startsWith("video/")) {
                additionalMetadata = await getVideoMetadata(file);
            }

            // 메타데이터 표시
            card.innerHTML = `
                <h3>${file.name}</h3>
                ${Object.entries({...basicMetadata, ...additionalMetadata})
                    .map(([key, value]) => `
                        <div class="metadata-item">
                            <span class="metadata-label">${key}:</span>
                            <span class="metadata-value">${value}</span>
                        </div>
                    `).join("")}
            `;
            metadataResult.appendChild(card);
        }
    });

    // 파일 크기 포맷
    function formatFileSize(bytes) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    // 이미지 메타데이터 추출
    async function getImageMetadata(file) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const metadata = {
                    "이미지 너비": `${img.naturalWidth}px`,
                    "이미지 높이": `${img.naturalHeight}px`,
                    "종횡비": (img.naturalWidth / img.naturalHeight).toFixed(2)
                };
                
                // EXIF 데이터 추출 (jpeg, tiff 에서만 가능)
                if (file.type === "image/jpeg" || file.type === "image/tiff") {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            // 전역 EXIF 라이브러리 사용 가정
                            const exif = EXIF.readFromBinaryFile(e.target.result);
                            if (exif) {
                                if (exif.Make) metadata["카메라 제조사"] = exif.Make;
                                if (exif.Model) metadata["카메라 모델"] = exif.Model;
                                if (exif.DateTimeOriginal) metadata["촬영 일시"] = exif.DateTimeOriginal;
                                if (exif.ISOSpeedRatings) metadata["ISO"] = exif.ISOSpeedRatings;
                                if (exif.ExposureTime) metadata["노출 시간"] = `${exif.ExposureTime}초`;
                                if (exif.FNumber) metadata["F값"] = `f/${exif.FNumber}`;
                                
                                // GPS 정보 추출
                                if (exif.GPSLatitude && exif.GPSLongitude) {
                                    const lat = convertDMSToDD(exif.GPSLatitude, exif.GPSLatitudeRef);
                                    const lng = convertDMSToDD(exif.GPSLongitude, exif.GPSLongitudeRef);
                                    metadata["GPS 좌표"] = `${lat}, ${lng}`;
                                    metadata["지도 보기"] = `<a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">Google Maps에서 보기</a>`;
                                }
                            }
                        } catch (error) {
                            console.log("EXIF 데이터를 읽을 수 없습니다.");
                        }
                        resolve(metadata);
                    };
                    reader.readAsArrayBuffer(file);
                } else {
                    resolve(metadata);
                }
            };
            img.src = URL.createObjectURL(file);
        });
    }

    // 오디오 메타데이터 추출
    async function getAudioMetadata(file) {
        return new Promise((resolve) => {
            const audio = new Audio();
            audio.onloadedmetadata = () => {
                resolve({
                    "재생 시간": `${Math.round(audio.duration)}초`,
                    "재생 가능": audio.canPlayType(file.type) === "probably" ? "예" : "아니오"
                });
            };
            audio.src = URL.createObjectURL(file);
        });
    }

    // 비디오 메타데이터 추출
    async function getVideoMetadata(file) {
        return new Promise((resolve) => {
            const video = document.createElement("video");
            video.onloadedmetadata = () => {
                resolve({
                    "재생 시간": `${Math.round(video.duration)}초`,
                    "비디오 너비": `${video.videoWidth}px`,
                    "비디오 높이": `${video.videoHeight}px`,
                    "재생 가능": video.canPlayType(file.type) === "probably" ? "예" : "아니오"
                });
            };
            video.src = URL.createObjectURL(file);
        });
    }

    // GPS 좌표 변환 함수
    function convertDMSToDD(dms, ref) {
        const degrees = dms[0];
        const minutes = dms[1];
        const seconds = dms[2];
        
        let dd = degrees + minutes/60 + seconds/3600;
        if (ref === "S" || ref === "W") {
            dd = dd * -1;
        }
        return dd.toFixed(6);
    }
}
