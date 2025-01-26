export function initLoanCalculator() {
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTermYears = document.getElementById('loanTermYears');
    const loanTermMonths = document.getElementById('loanTermMonths');
    const repaymentType = document.getElementById('repaymentType');
    const calculateBtn = document.getElementById('calculateLoan');
    const resultDiv = document.getElementById('loanResult');
    const scheduleDiv = document.getElementById('repaymentSchedule');

    if (!loanAmount || !interestRate || !loanTermYears || !loanTermMonths || 
        !repaymentType || !calculateBtn || !resultDiv || !scheduleDiv) return;

    calculateBtn.addEventListener('click', calculateLoan);

    function calculateLoan() {
        // 입력값 검증
        const principal = parseFloat(loanAmount.value);
        const rate = parseFloat(interestRate.value) / 100 / 12; // 월 이자율
        const years = parseInt(loanTermYears.value) || 0;
        const months = parseInt(loanTermMonths.value) || 0;
        const totalMonths = years * 12 + months;

        if (!principal || !rate || totalMonths === 0) {
            alert('모든 필드를 올바르게 입력해주세요.');
            return;
        }

        let monthlyPayment = 0;
        let totalPayment = 0;
        let totalInterest = 0;
        let schedule = [];

        switch (repaymentType.value) {
            case 'equal': // 원리금균등상환
                monthlyPayment = principal * (rate * Math.pow(1 + rate, totalMonths)) / 
                                (Math.pow(1 + rate, totalMonths) - 1);
                
                let remainingPrincipal = principal;
                for (let i = 1; i <= totalMonths; i++) {
                    const interest = remainingPrincipal * rate;
                    const principalPayment = monthlyPayment - interest;
                    remainingPrincipal -= principalPayment;
                    
                    totalInterest += interest;
                    schedule.push({
                        month: i,
                        payment: monthlyPayment,
                        principal: principalPayment,
                        interest: interest,
                        remaining: Math.max(0, remainingPrincipal)
                    });
                }
                totalPayment = monthlyPayment * totalMonths;
                break;

            case 'fixed': // 원금균등상환
                const monthlyPrincipal = principal / totalMonths;
                let totalRemaining = principal;
                
                for (let i = 1; i <= totalMonths; i++) {
                    const interest = totalRemaining * rate;
                    const payment = monthlyPrincipal + interest;
                    totalRemaining -= monthlyPrincipal;
                    
                    totalInterest += interest;
                    totalPayment += payment;
                    schedule.push({
                        month: i,
                        payment: payment,
                        principal: monthlyPrincipal,
                        interest: interest,
                        remaining: Math.max(0, totalRemaining)
                    });
                }
                monthlyPayment = schedule[0].payment; // 첫 달 상환금
                break;

            case 'bullet': // 만기일시상환
                const monthlyInterest = principal * rate;
                totalInterest = monthlyInterest * totalMonths;
                totalPayment = principal + totalInterest;
                
                for (let i = 1; i <= totalMonths; i++) {
                    const isLastMonth = i === totalMonths;
                    schedule.push({
                        month: i,
                        payment: isLastMonth ? principal + monthlyInterest : monthlyInterest,
                        principal: isLastMonth ? principal : 0,
                        interest: monthlyInterest,
                        remaining: isLastMonth ? 0 : principal
                    });
                }
                monthlyPayment = monthlyInterest;
                break;
        }

        // 결과 표시
        resultDiv.innerHTML = `
            <div class="loan-summary">
                <div class="summary-item">
                    <span class="label">월 상환금</span>
                    <span class="value">${Math.round(monthlyPayment).toLocaleString()}원</span>
                </div>
                <div class="summary-item">
                    <span class="label">총 상환금액</span>
                    <span class="value">${Math.round(totalPayment).toLocaleString()}원</span>
                </div>
                <div class="summary-item">
                    <span class="label">총 이자금액</span>
                    <span class="value">${Math.round(totalInterest).toLocaleString()}원</span>
                </div>
            </div>
        `;

        // 상환 스케줄 표시
        scheduleDiv.innerHTML = `
            <h3>상환 스케줄</h3>
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>회차</th>
                        <th>납입금</th>
                        <th>원금</th>
                        <th>이자</th>
                        <th>잔금</th>
                    </tr>
                </thead>
                <tbody>
                    ${schedule.map(item => `
                        <tr>
                            <td>${item.month}회차</td>
                            <td>${Math.round(item.payment).toLocaleString()}원</td>
                            <td>${Math.round(item.principal).toLocaleString()}원</td>
                            <td>${Math.round(item.interest).toLocaleString()}원</td>
                            <td>${Math.round(item.remaining).toLocaleString()}원</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
} 