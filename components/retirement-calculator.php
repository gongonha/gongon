<!-- components/retirement-calculator.php -->
<div id="retirementCalculator" class="section">
    <h2>퇴직금 계산기</h2>
    <div class="calculator-container">
        <div class="input-group">
            <label for="averageSalary">평균 월급 (원)</label>
            <input type="number" id="averageSalary" placeholder="평균 월급을 입력하세요">
        </div>
        <div class="input-group">
            <label for="yearsWorked">근무 연수 (년)</label>
            <input type="number" id="yearsWorked" placeholder="근무 연수를 입력하세요">
        </div>
        <div class="input-group">
            <label for="bonuses">퇴직 전 3개월간 상여금 (원)</label>
            <input type="number" id="bonuses" placeholder="상여금을 입력하세요 (없으면 0)">
        </div>
        <div class="input-group">
            <label for="taxRate">세율 (%)</label>
            <input type="number" id="taxRate" placeholder="세율을 입력하세요 (기본값: 3.3)" value="3.3" step="0.1">
        </div>
        <button id="calculateRetirement" class="btn btn-primary">계산하기</button>
        <div id="retirementResult"></div>
    </div>
</div>
