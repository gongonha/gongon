<!-- components/salary-calculator.php -->
<div id="salaryCalculator" class="section">
    <h2>시급/월급 계산기</h2>
    <div class="calculator-container">
        <div class="calculator-type">
            <button class="type-btn active" data-type="hourly">시급 계산</button>
            <button class="type-btn" data-type="monthly">월급 계산</button>
        </div>
        <div class="notice-box">
            <p>※ 근로기준법 제54조에 따른 휴게시간 기준</p>
            <ul>
                <li>근무시간 4시간: 30분 이상의 휴게시간 필요</li>
                <li>근무시간 8시간: 1시간 이상의 휴게시간 필요</li>
            </ul>
        </div>
        
        <!-- 시급 계산 폼 -->
        <div id="hourlyForm">
            <div class="salary-info-box">
                <p>※ 2025년 최저시급: 10,030원</p>
                <p>※ 주휴수당 안내:</p>
                <ul>
                    <li>주 15시간 이상 근무 시 주휴수당이 발생합니다.</li>
                    <li>주휴수당은 1일 8시간분의 통상임금이 지급됩니다.</li>
                    <li>실제 근무하지 않은 날에 대한 유급휴일 수당입니다.</li>
                </ul>
            </div>
            <div class="input-group">
                <label for="hourlyRate">시급 (원)</label>
                <input type="number" id="hourlyRate" placeholder="시급을 입력하세요">
            </div>
            <div class="input-group">
                <label for="workDaysPerWeek">주 근무일수 (1-7일)</label>
                <input type="number" id="workDaysPerWeek" placeholder="주 근무일수를 입력하세요" value="5" min="1" max="7">
            </div>
            <div class="input-group">
                <label for="workHours">하루 근무시간 (1-24시간)</label>
                <input type="number" id="workHours" placeholder="근무시간을 입력하세요" step="0.5" min="1" max="24">
                <span class="input-notice" id="breakTimeNotice"></span>
            </div>
            <div class="input-group">
                <label for="breakTime">휴게시간 (시간)</label>
                <input type="number" id="breakTime" placeholder="휴게시간을 입력하세요" step="0.5" value="1">
            </div>
            <div class="checkbox-wrapper">
                <div class="checkbox-item">
                    <input type="checkbox" id="includeBreak">
                    <label for="includeBreak">
                        휴게시간 포함
                    </label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="includeWeeklyPay">
                    <label for="includeWeeklyPay">
                        주휴수당 포함
                    </label>
                </div>
            </div>
        </div>

        <!-- 월급 계산 폼 -->
        <div id="monthlyForm" style="display: none;">
            <div class="input-group">
                <label for="monthlyRate">세전 월급 (원)</label>
                <input type="number" id="monthlyRate" placeholder="세전 월급을 입력하세요">
            </div>
            <div class="input-group">
                <label for="monthlyWorkDays">월 근무일수</label>
                <input type="number" id="monthlyWorkDays" placeholder="근무일수를 입력하세요" value="21.75">
            </div>
            <div class="input-group">
                <label for="monthlyWorkHours">하루 근무시간 (시간)</label>
                <input type="number" id="monthlyWorkHours" placeholder="근무시간을 입력하세요" step="0.5" value="8">
            </div>
        </div>

        <button id="calculateSalary" class="btn btn-primary">계산하기</button>
        <div id="salaryResult"></div>
    </div>
</div>
