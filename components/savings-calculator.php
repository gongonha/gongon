<!-- components/savings-calculator.php -->
<div id="savingsCalculator" class="section">
    <h2>저축 계산기</h2>
    <div class="section-description">
        <p>저축 목표와 기간을 계산할 수 있는 도구입니다.</p>
    </div>
    <div class="calculator-container">
        <div class="calculator-type">
            <button class="type-btn active" data-type="period">기간 계산</button>
            <button class="type-btn" data-type="amount">목표액 계산</button>
        </div>

        <!-- 기간 계산 폼 -->
        <div id="periodForm">
            <div class="input-group">
                <label for="monthlyDeposit">월 저축액 (원)</label>
                <input type="number" id="monthlyDeposit" placeholder="매월 저축할 금액을 입력하세요">
            </div>
            <div class="input-group">
                <label for="targetAmount">목표 금액 (원)</label>
                <input type="number" id="targetAmount" placeholder="목표 금액을 입력하세요">
            </div>
            <div class="input-group">
                <label for="savingInterestRate">연 이자율 (%)</label>
                <input type="number" id="savingInterestRate" placeholder="연 이자율을 입력하세요" value="3.0" step="0.1">
            </div>
        </div>

        <!-- 목표액 계산 폼 -->
        <div id="amountForm" style="display: none;">
            <div class="input-group">
                <label for="monthlyDeposit2">월 저축액 (원)</label>
                <input type="number" id="monthlyDeposit2" placeholder="매월 저축할 금액을 입력하세요">
            </div>
            <div class="input-group">
                <label for="savingPeriod">저축 기간 (개월)</label>
                <input type="number" id="savingPeriod" placeholder="저축 기간을 입력하세요">
            </div>
            <div class="input-group">
                <label for="savingInterestRate2">연 이자율 (%)</label>
                <input type="number" id="savingInterestRate2" placeholder="연 이자율을 입력하세요" value="3.0" step="0.1">
            </div>
        </div>

        <button id="calculateSavings" class="btn btn-primary">계산하기</button>
        <div id="savingsResult" class="result-box"></div>
    </div>
</div>
