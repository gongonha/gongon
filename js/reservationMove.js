/* js/reservationMove.js */
export function initReservationMove() {
    const reservationUrl = document.getElementById('reservationUrl');
    const reservationTime = document.getElementById('reservationTime');
    const reservationMessage = document.getElementById('reservationMessage');
    const setReservationBtn = document.getElementById('setReservation');
    const cancelReservationBtn = document.getElementById('cancelReservation');
    const reservationStatus = document.getElementById('reservationStatus');
    const downloadReservationCsvBtn = document.getElementById('downloadReservationCsv');
    const uploadReservationCsv = document.getElementById('uploadReservationCsv');

    // 해당 요소들이 없으면 실행하지 않음
    if (
        !reservationUrl || !reservationTime || !reservationMessage || 
        !setReservationBtn || !cancelReservationBtn || !reservationStatus ||
        !downloadReservationCsvBtn || !uploadReservationCsv
    ) {
        return;
    }

    let reservations = [];

    function addReservation() {
        let url = reservationUrl.value.trim();
        const time = new Date(reservationTime.value).getTime();
        const message = reservationMessage.value.trim();
        
        if (!url || !time) {
            alert('URL과 시간을 입력해주세요.');
            return;
        }
        
        // URL 형식 보정
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        const now = Date.now();
        if (time <= now) {
            alert('예약 시간은 현재 시간보다 이후여야 합니다.');
            return;
        }

        const reservation = {
            id: Date.now(),
            url,
            time,
            message,
            status: 'pending'
        };

        reservations.push(reservation);
        scheduleReservation(reservation);
        renderReservations();
        clearInputs();
        saveReservations();
    }

    function scheduleReservation(reservation) {
        const timeoutId = setTimeout(() => {
            if (reservation.message) {
                alert(reservation.message);
            }
            window.location.href = reservation.url;
            removeReservation(reservation.id);
        }, reservation.time - Date.now());

        reservation.timeoutId = timeoutId;
    }

    function removeReservation(id) {
        const target = reservations.find(r => r.id === id);
        if (target && target.timeoutId) {
            clearTimeout(target.timeoutId);
        }
        reservations = reservations.filter(r => r.id !== id);
        renderReservations();
        saveReservations();
    }

    // 예약 목록 표시
    function renderReservations() {
        const reservationList = document.createElement('div');
        reservationList.className = 'reservation-list';

        reservations.forEach(reservation => {
            const item = document.createElement('div');
            item.className = 'reservation-item';
            
            const timeLeft = Math.max(0, reservation.time - Date.now());
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            item.innerHTML = `
                <div class="reservation-info">
                    <p><strong>URL:</strong> ${reservation.url}</p>
                    <p><strong>예약 시간:</strong> ${new Date(reservation.time).toLocaleString()}</p>
                    <p><strong>남은 시간:</strong> ${hours}시간 ${minutes}분</p>
                    ${reservation.message ? `<p><strong>메시지:</strong> ${reservation.message}</p>` : ''}
                </div>
                <div class="reservation-actions">
                    <button class="btn btn-danger" onclick="removeReservationItem(${reservation.id})">취소</button>
                </div>
            `;
            reservationList.appendChild(item);
        });

        // 기존 목록 제거 후 업데이트
        const oldList = reservationStatus.querySelector('.reservation-list');
        if (oldList) {
            oldList.remove();
        }
        reservationStatus.innerHTML = '';
        reservationStatus.appendChild(reservationList);
    }

    // 외부에서 취소 버튼 클릭 시 접근 가능하도록 전역 함수로 노출
    window.removeReservationItem = (id) => {
        removeReservation(id);
    };

    function clearInputs() {
        reservationUrl.value = '';
        reservationTime.value = '';
        reservationMessage.value = '';
    }

    function saveReservations() {
        const saveData = reservations.map(({ id, url, time, message }) => ({
            id, url, time, message
        }));
        localStorage.setItem('reservations', JSON.stringify(saveData));
    }

    function loadReservations() {
        const saved = localStorage.getItem('reservations');
        if (saved) {
            const loaded = JSON.parse(saved);
            // 이미 지난 예약은 제외
            reservations = loaded.filter(r => r.time > Date.now());
            reservations.forEach(scheduleReservation);
            renderReservations();
        }
    }

    function exportReservationsCsv() {
        const csvContent = [
            ['URL', '예약시간', '메시지'],
            ...reservations.map(r => [
                r.url,
                new Date(r.time).toLocaleString(),
                r.message || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reservations.csv';
        link.click();
    }

    function importReservationsCsv(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n').slice(1); // 헤더 제외
            rows.forEach(row => {
                const [url, timeStr, message] = row.split(',');
                const time = new Date(timeStr).getTime();
                
                if (time > Date.now()) {
                    const reservation = {
                        id: Date.now() + Math.random(),
                        url,
                        time,
                        message,
                        status: 'pending'
                    };
                    reservations.push(reservation);
                    scheduleReservation(reservation);
                }
            });
            renderReservations();
            saveReservations();
        };
        reader.readAsText(file);
    }

    // 이벤트 등록
    setReservationBtn.addEventListener('click', addReservation);
    downloadReservationCsvBtn.addEventListener('click', exportReservationsCsv);
    uploadReservationCsv.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            importReservationsCsv(e.target.files[0]);
        }
    });

    // 1분마다 예약 목록 업데이트
    setInterval(renderReservations, 60000);

    // 페이지 로드 시 저장된 예약 불러오기
    loadReservations();
}
