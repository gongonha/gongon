<!-- components/loan-calculator.php -->
<div id="loanCalculator" class="section">
    <h2>이자/대출 계산기</h2>
    <div class="section-description">
        <p>대출 금액, 이자율, 기간을 입력하여 월 상환금과 총 상환금을 계산할 수 있습니다.</p>
    </div>
    
    <div class="calculator-container">
        <div class="input-group">
            <label for="loanAmount">대출금액 (원)</label>
            <input type="number" id="loanAmount" placeholder="예: 100000000">
        </div>
        
        <div class="input-group">
            <label for="interestRate">연이자율 (%)</label>
            <input type="number" id="interestRate" step="0.1" placeholder="예: 3.5">
        </div>
        
        <div class="input-group">
            <label for="loanTerm">대출기간</label>
            <div class="term-inputs">
                <input type="number" id="loanTermYears" placeholder="년">
                <input type="number" id="loanTermMonths" placeholder="개월">
            </div>
        </div>
        
        <div class="input-group">
            <label for="repaymentType">상환방식</label>
            <select id="repaymentType">
                <option value="equal">원리금균등상환</option>
                <option value="fixed">원금균등상환</option>
                <option value="bullet">만기일시상환</option>
            </select>
        </div>
        
        <button id="calculateLoan" class="btn btn-primary">계산하기</button>
        
        <div id="loanResult" class="result-container">
            <!-- 결과가 표시됩니다 -->
        </div>
        
        <div id="repaymentSchedule" class="schedule-container">
            <!-- 상환 스케줄 표시 -->
        </div>
    </div>
</div>
