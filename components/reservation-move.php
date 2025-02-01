<!-- components/reservation-move.php -->
<div id="reservationMove" class="section">
    <h2>예약 이동</h2>
    <div class="reservation-container">
        <div class="input-group">
            <label for="reservationUrl">이동할 URL:</label>
            <input type="url" id="reservationUrl" placeholder="https://example.com" required>
        </div>
        
        <div class="input-group">
            <label for="reservationTime">예약 시간:</label>
            <input type="datetime-local" id="reservationTime" required>
        </div>

        <div class="input-group">
            <label for="reservationMessage">알림 메시지:</label>
            <input type="text" id="reservationMessage" placeholder="알림에 표시될 메시지를 입력하세요">
        </div>

        <div class="reservation-buttons">
            <button id="setReservation" class="btn btn-primary">예약 설정</button>
            <button id="cancelReservation" class="btn btn-danger" disabled>예약 취소</button>
            <button id="downloadReservationCsv" class="btn btn-success">CSV 내보내기</button>
            <label for="uploadReservationCsv" class="btn btn-success upload-btn">
                CSV 불러오기
                <input type="file" id="uploadReservationCsv" accept=".csv" style="display: none;">
            </label>
        </div>

        <div id="reservationStatus" class="status-box"></div>
    </div>
</div>
