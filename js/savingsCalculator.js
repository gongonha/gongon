export function initSavingsCalculator() {
    const typeButtons = document.querySelectorAll('.type-btn');
    const periodForm = document.getElementById('periodForm');
    const amountForm = document.getElementById('amountForm');
    const calculateBtn = document.getElementById('calculateSavings');
    const resultBox = document.getElementById('savingsResult');

    // 초기 상태 설정
    periodForm.style.display = 'block';
    amountForm.style.display = 'none';

    // 계산 타입 전환
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (button.dataset.type === 'period') {
                periodForm.style.display = 'block';
                amountForm.style.display = 'none';
            } else {
                periodForm.style.display = 'none';
                amountForm.style.display = 'block';
            }
            resultBox.innerHTML = '';
        });
    });

    // 계산하기 버튼 클릭 이벤트
    calculateBtn.addEventListener('click', () => {
        resultBox.innerHTML = '';
        const isPeriodForm = periodForm.style.display === 'block';
        
        if (isPeriodForm) {
            calculatePeriod();
        } else {
            calculateAmount();
        }
    });

    // 기간 계산 함수
    function calculatePeriod() {
        const monthlyDeposit = Number(document.getElementById('monthlyDeposit').value);
        const targetAmount = Number(document.getElementById('targetAmount').value);
        const yearlyInterest = Number(document.getElementById('savingInterestRate').value);
        const monthlyRate = yearlyInterest / 1200;

        if (!monthlyDeposit || !targetAmount) {
            alert('월 저축액과 목표 금액을 입력해주세요.');
            return;
        }

        if (yearlyInterest < 0) {
            alert('연 이자율은 0% 이상이어야 합니다.');
            return;
        }

        let balance = 0;
        let months = 0;
        let totalDeposit = 0;

        while (balance < targetAmount) {
            balance = balance * (1 + monthlyRate);
            balance += monthlyDeposit;
            totalDeposit += monthlyDeposit;
            months++;
        }

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        const interestEarned = Math.floor(balance - totalDeposit);

        resultBox.innerHTML = `
            <div class="result-detail">
                <span class="result-label">예상 소요 기간:</span>
                <span class="result-value">${years}년 ${remainingMonths}개월</span>
            </div>
            <div class="result-detail">
                <span class="result-label">총 저축액:</span>
                <span class="result-value">${formatNumber(totalDeposit)}원</span>
            </div>
            <div class="result-detail">
                <span class="result-label">이자 수익:</span>
                <span class="result-value">${formatNumber(interestEarned)}원</span>
            </div>
            <div class="result-detail">
                <span class="result-label">최종 금액:</span>
                <span class="result-value">${formatNumber(balance)}원</span>
            </div>
        `;
    }

    // 목표액 계산 함수
    function calculateAmount() {
        const monthlyDeposit = Number(document.getElementById('monthlyDeposit2').value);
        const period = Number(document.getElementById('savingPeriod').value);
        const yearlyInterest = Number(document.getElementById('savingInterestRate2').value);

        if (!monthlyDeposit || !period) {
            alert('월 저축액과 저축 기간을 입력해주세요.');
            return;
        }

        if (yearlyInterest < 0) {
            alert('연 이자율은 0% 이상이어야 합니다.');
            return;
        }

        let balance = 0;
        const monthlyRate = yearlyInterest / 1200;
        const totalDeposit = monthlyDeposit * period;

        for (let i = 0; i < period; i++) {
            balance = balance * (1 + monthlyRate);
            balance += monthlyDeposit;
        }

        const interestEarned = Math.floor(balance - totalDeposit);

        resultBox.innerHTML = `
            <div class="result-detail">
                <span class="result-label">예상 저축 금액:</span>
                <span class="result-value">${formatNumber(balance)}원</span>
            </div>
            <div class="result-detail">
                <span class="result-label">총 저축액:</span>
                <span class="result-value">${formatNumber(totalDeposit)}원</span>
            </div>
            <div class="result-detail">
                <span class="result-label">이자 수익:</span>
                <span class="result-value">${formatNumber(interestEarned)}원</span>
            </div>
        `;
    }

    // 숫자 포맷팅 함수
    function formatNumber(number) {
        return Math.round(number).toLocaleString('ko-KR');
    }
} 