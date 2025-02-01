<!-- components/unemployment-calculator.php -->
<div id="unemploymentCalculator" class="section">
    <h2>실업급여 계산기</h2>
    <div class="calculator-container">
        <div class="input-group">
            <label for="lastSalary">마지막 월급 (원)</label>
            <input type="number" id="lastSalary" placeholder="마지막 월급을 입력하세요">
        </div>
        <div class="input-group">
            <label for="employmentPeriod">고용보험 가입 기간 (개월)</label>
            <input type="number" id="employmentPeriod" placeholder="고용보험 가입 기간을 입력하세요">
        </div>
        <div class="input-group">
            <label for="resignationReason">이직 사유</label>
            <select id="resignationReason">
                <option value="involuntary">비자발적 퇴사</option>
                <option value="voluntary">자발적 퇴사</option>
            </select>
        </div>
        <button id="calculateUnemployment" class="btn btn-primary">계산하기</button>
        <div id="unemploymentResult"></div>
    </div>
</div>
