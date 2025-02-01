export function initUnemploymentCalculator() {
    const calculateButton = document.getElementById('calculateUnemployment');
    const resultDisplay = document.getElementById('unemploymentResult');

    calculateButton.addEventListener('click', () => {
        const lastSalary = parseFloat(document.getElementById('lastSalary').value); // 마지막 월급
        const employmentPeriod = parseFloat(document.getElementById('employmentPeriod').value); // 고용보험 가입 기간 (개월)
        const resignationReason = document.getElementById('resignationReason').value; // 이직 사유

        // 유효성 검사
        if (isNaN(lastSalary) || isNaN(employmentPeriod) || lastSalary <= 0 || employmentPeriod <= 0) {
            resultDisplay.textContent = '모든 입력란에 올바른 값을 입력하세요.';
            return;
        }

        if (resignationReason === 'voluntary') {
            resultDisplay.innerHTML = '자발적 퇴사는 실업급여 대상이 아닙니다.';
            resultDisplay.className = 'show voluntary';
            return;
        }

        // 1일 평균임금 계산 (월급 ÷ 30)
        const dailyWage = lastSalary / 30;

        // 1일 실업급여 (평균임금 × 60%) → 상한액 및 하한액 적용
        const dailyUnemploymentPay = Math.min(Math.max(dailyWage * 0.6, 61568), 66000);

        // 지급일 수 계산 (고용보험 가입 기간에 따라)
        let totalPaymentDays = 0;
        if (employmentPeriod >= 12 && employmentPeriod < 36) {
            totalPaymentDays = 120;
        } else if (employmentPeriod >= 36 && employmentPeriod < 60) {
            totalPaymentDays = 150;
        } else if (employmentPeriod >= 60) {
            totalPaymentDays = 180;
        } else {
            resultDisplay.textContent = '고용보험 가입 기간이 12개월 미만인 경우 실업급여를 받을 수 없습니다.';
            return;
        }

        // 총 실업급여 계산
        const totalUnemploymentPay = dailyUnemploymentPay * totalPaymentDays;

        // 결과 표시
        resultDisplay.className = 'show';
        resultDisplay.innerHTML = `
            <p>실업급여 계산 결과</p>
            <ul>
                <li>
                    <span>1일 평균임금</span>
                    <span>${Math.floor(dailyWage).toLocaleString()} 원</span>
                </li>
                <li>
                    <span>1일 실업급여</span>
                    <span>${Math.floor(dailyUnemploymentPay).toLocaleString()} 원</span>
                </li>
                <li>
                    <span>지급일 수</span>
                    <span>${totalPaymentDays} 일</span>
                </li>
                <li>
                    <span>총 실업급여</span>
                    <span>${Math.floor(totalUnemploymentPay).toLocaleString()} 원</span>
                </li>
            </ul>
        `;
    });
}
