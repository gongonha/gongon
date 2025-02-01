export function initRetirementCalculator() {
    const calculateButton = document.getElementById('calculateRetirement');
    const resultDisplay = document.getElementById('retirementResult');

    calculateButton.addEventListener('click', () => {
        // 입력값 가져오기
        const averageSalary = parseFloat(document.getElementById('averageSalary').value); // 평균 월급
        const yearsWorked = parseFloat(document.getElementById('yearsWorked').value);    // 근속 연수
        const bonuses = parseFloat(document.getElementById('bonuses').value) || 0;      // 상여금
        const taxRate = parseFloat(document.getElementById('taxRate').value) / 100 || 0.033; // 세율 (기본값 3.3%)

        // 유효성 검사
        if (isNaN(averageSalary) || isNaN(yearsWorked) || isNaN(bonuses) || isNaN(taxRate) || averageSalary <= 0 || yearsWorked <= 0) {
            resultDisplay.textContent = '모든 입력란에 올바른 값을 입력하세요.';
            return;
        }

        // 1일 평균임금 계산: 월급 + (상여금 ÷ 3개월) ÷ 30일
        const dailyWage = Math.floor((averageSalary + bonuses / 3) / 30);

        // 퇴직금 계산: 1일 평균임금 × 30일 × 근속연수
        const retirementPayBeforeTax = Math.floor(dailyWage * 30 * yearsWorked);

        // 세금 공제
        const taxAmount = Math.floor(retirementPayBeforeTax * taxRate);
        const netRetirementPay = Math.floor(retirementPayBeforeTax - taxAmount);

        // 결과 표시
        resultDisplay.innerHTML = `
            <p>퇴직금 계산 결과</p>
            <ul>
                <li>
                    <span>1일 평균임금</span>
                    <span>${dailyWage.toLocaleString()} 원</span>
                </li>
                <li>
                    <span>퇴직금 (세전)</span>
                    <span>${retirementPayBeforeTax.toLocaleString()} 원</span>
                </li>
                <li>
                    <span>공제된 세금 (${(taxRate * 100).toFixed(1)}%)</span>
                    <span>${taxAmount.toLocaleString()} 원</span>
                </li>
                <li>
                    <span>최종 퇴직금 (세후)</span>
                    <span>${netRetirementPay.toLocaleString()} 원</span>
                </li>
            </ul>
        `;
        resultDisplay.classList.add('show');
    });
}
