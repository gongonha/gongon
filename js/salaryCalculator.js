/* js/salaryCalculator.js */
export function initSalaryCalculator() {
    const calculatorType = document.querySelectorAll('.type-btn');
    const hourlyForm = document.getElementById('hourlyForm');
    const monthlyForm = document.getElementById('monthlyForm');
    const hourlyRateInput = document.getElementById('hourlyRate');
    const workHoursInput = document.getElementById('workHours');
    const breakTimeInput = document.getElementById('breakTime');
    const includeBreakCheckbox = document.getElementById('includeBreak');
    const monthlyRateInput = document.getElementById('monthlyRate');
    const monthlyWorkDaysInput = document.getElementById('monthlyWorkDays');
    const monthlyWorkHoursInput = document.getElementById('monthlyWorkHours');
    const calculateSalaryBtn = document.getElementById('calculateSalary');
    const salaryResult = document.getElementById('salaryResult');
    const breakTimeNotice = document.getElementById('breakTimeNotice');
    const workDaysPerWeekInput = document.getElementById('workDaysPerWeek');
    const includeWeeklyPayCheckbox = document.getElementById('includeWeeklyPay');
    const insuranceGradeSelect = document.getElementById('insuranceGrade');

    const MINIMUM_WAGE_2025 = 10030; // 2025년 최저시급

    if (!calculatorType || !hourlyForm || !monthlyForm || !calculateSalaryBtn) {
        console.error('필수 요소를 찾을 수 없습니다.');
        return;
    }

    let currentCalculationType = 'hourly';

    // 계산 타입 전환 (시급 / 월급)
    calculatorType.forEach(btn => {
        btn.addEventListener('click', () => {
            calculatorType.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCalculationType = btn.dataset.type;
            
            if (currentCalculationType === 'hourly') {
                hourlyForm.style.display = 'block';
                monthlyForm.style.display = 'none';
            } else {
                hourlyForm.style.display = 'none';
                monthlyForm.style.display = 'block';
            }
            
            salaryResult.innerHTML = '';
        });
    });

    // 계산하기 버튼 이벤트 리스너 추가
    calculateSalaryBtn.addEventListener('click', () => {
        if (currentCalculationType === 'hourly') {
            calculateHourlySalary();
        } else {
            calculateMonthlySalary();
        }
    });

    // 근무시간 입력 시 휴게시간 안내
    workHoursInput.addEventListener('input', () => {
        const hours = parseFloat(workHoursInput.value) || 0;
        if (hours > 24) {
            alert('하루 근무시간은 24시간을 초과할 수 없습니다.');
            workHoursInput.value = 24;
        }
        
        let notice = '';
        if (hours >= 8) {
            notice = '※ 8시간 근무 시 1시간 이상의 휴게시간이 필요합니다.';
            if (parseFloat(breakTimeInput.value) < 1) {
                breakTimeInput.value = 1;
            }
        } else if (hours >= 4) {
            notice = '※ 4시간 근무 시 30분 이상의 휴게시간이 필요합니다.';
            if (parseFloat(breakTimeInput.value) < 0.5) {
                breakTimeInput.value = 0.5;
            }
        }
        
        breakTimeNotice.textContent = notice;
    });

    // 주 근무일수 제한
    workDaysPerWeekInput.addEventListener('input', () => {
        const days = parseFloat(workDaysPerWeekInput.value) || 0;
        if (days > 7) {
            alert('주 근무일수는 7일을 초과할 수 없습니다.');
            workDaysPerWeekInput.value = 7;
        }
    });

    function calculateHourlySalary() {
        const hourlyRate = parseFloat(hourlyRateInput.value) || MINIMUM_WAGE_2025;
        const workHours = parseFloat(workHoursInput.value) || 0;
        const breakTime = parseFloat(breakTimeInput.value) || 0;
        const includeBreak = includeBreakCheckbox.checked;
        const includeWeeklyPay = includeWeeklyPayCheckbox.checked;
        const workDaysPerWeek = parseFloat(workDaysPerWeekInput.value) || 5;

        if (workHours <= 0) {
            alert('근무시간을 입력해주세요.');
            return;
        }

        const actualWorkHours = includeBreak ? workHours : workHours - breakTime;
        const dailyWage = hourlyRate * actualWorkHours;
        const weeklyWage = dailyWage * workDaysPerWeek;

        // 주휴수당 계산 (주 15시간 이상 근무 시)
        let weeklyPayAmount = 0;
        const totalWeeklyHours = actualWorkHours * workDaysPerWeek;
        if (includeWeeklyPay && totalWeeklyHours >= 15) {
            weeklyPayAmount = hourlyRate * 8; // 1일치 근무시간(8시간)에 대한 주휴수당
        }

        const weeklyTotalWage = weeklyWage + weeklyPayAmount;
        const monthlyWage = (weeklyTotalWage * 52) / 12; // 연간 52주 기준

        displayResult(hourlyRate, dailyWage, weeklyTotalWage, monthlyWage, {
            workHours,
            breakTime,
            actualWorkHours,
            includeBreak,
            includeWeeklyPay,
            weeklyPayAmount,
            workDaysPerWeek
        });
    }

    function calculateMonthlySalary() {
        const monthlyRate = parseFloat(monthlyRateInput.value) || 0;
        const workDays = parseFloat(monthlyWorkDaysInput.value) || 21.75;
        const workHours = parseFloat(monthlyWorkHoursInput.value) || 8;

        if (monthlyRate <= 0) {
            alert('월급을 입력해주세요.');
            return;
        }

        // 고용보험료율 자동 결정 (2025년 기준)
        const employmentRate = monthlyRate <= 3500000 ? 0.009 : 0.008;

        // 4대보험 계산 (2025년 기준)
        const insuranceRates = {
            pension: 0.045, // 국민연금 4.5%
            health: 0.0399, // 건강보험 3.99%
            longTerm: 0.003384, // 장기요양보험 0.3384%
            employment: employmentRate // 고용보험 (월급에 따라 자동 결정)
        };

        const deductions = {
            pension: monthlyRate * insuranceRates.pension,
            health: monthlyRate * insuranceRates.health,
            longTerm: monthlyRate * insuranceRates.longTerm,
            employment: monthlyRate * insuranceRates.employment
        };

        const totalDeduction = Object.values(deductions).reduce((a, b) => a + b, 0);
        const netSalary = monthlyRate - totalDeduction;

        const dailyWage = monthlyRate / workDays;
        const hourlyWage = dailyWage / workHours;
        const weeklyWage = dailyWage * 5;

        displayResult(hourlyWage, dailyWage, weeklyWage, monthlyRate, {
            workDays,
            workHours,
            deductions,
            totalDeduction,
            netSalary,
            employmentRate // 표시용으로 추가
        });
    }

    // 결과 표시
    function displayResult(hourlyWage, dailyWage, weeklyWage, monthlyWage, details) {
        let resultHTML = `
            <div class="salary-details">
                <div class="salary-item">
                    <span class="label">시급:</span>
                    <span class="value">${Math.round(hourlyWage).toLocaleString()}원</span>
                </div>
                <div class="salary-item">
                    <span class="label">일급:</span>
                    <span class="value">${Math.round(dailyWage).toLocaleString()}원</span>
                </div>
                <div class="salary-item">
                    <span class="label">주급:</span>
                    <span class="value">${Math.round(weeklyWage).toLocaleString()}원</span>
                </div>
                <div class="salary-item">
                    <span class="label">${currentCalculationType === 'monthly' ? '세전 ' : ''}월급:</span>
                    <span class="value">${Math.round(monthlyWage).toLocaleString()}원</span>
                </div>`;

        if (currentCalculationType === 'hourly') {
            resultHTML += `
                <div class="salary-info">
                    <p>※ 계산 기준</p>
                    <ul>
                        <li>하루 근무시간: ${details.workHours}시간</li>
                        <li>휴게시간: ${details.breakTime}시간</li>
                        <li>실제 계산된 근무시간: ${details.actualWorkHours}시간</li>
                        <li>주 근무일수: ${details.workDaysPerWeek}일</li>
                        <li>휴게시간 ${details.includeBreak ? '포함' : '미포함'}</li>
                        ${details.includeWeeklyPay ? 
                            `<li>주휴수당: ${Math.round(details.weeklyPayAmount).toLocaleString()}원</li>` : 
                            '<li>주휴수당 미포함</li>'}
                    </ul>
                </div>`;
        } else {
            resultHTML += `
                <div class="salary-info">
                    <p>※ 계산 기준</p>
                    <ul>
                        <li>월 근무일수: ${details.workDays}일</li>
                        <li>하루 근무시간: ${details.workHours}시간</li>
                    </ul>
                </div>
                <div class="insurance-details">
                    <h4>4대보험 공제내역 (2025년 기준)</h4>
                    <div class="insurance-item">
                        <span>국민연금 (4.5%):</span>
                        <span>-${Math.round(details.deductions.pension).toLocaleString()}원</span>
                    </div>
                    <div class="insurance-item">
                        <span>건강보험 (3.99%):</span>
                        <span>-${Math.round(details.deductions.health).toLocaleString()}원</span>
                    </div>
                    <div class="insurance-item">
                        <span>장기요양보험 (0.3384%):</span>
                        <span>-${Math.round(details.deductions.longTerm).toLocaleString()}원</span>
                    </div>
                    <div class="insurance-item">
                        <span>고용보험 (${(details.employmentRate * 100).toFixed(1)}%):</span>
                        <span>-${Math.round(details.deductions.employment).toLocaleString()}원</span>
                    </div>
                    <div class="deduction-total">
                        <span>총 공제액:</span>
                        <span>-${Math.round(details.totalDeduction).toLocaleString()}원</span>
                    </div>
                    <div class="net-salary">
                        <span>세후 월급:</span>
                        <span>${Math.round(details.netSalary).toLocaleString()}원</span>
                    </div>
                </div>`;
        }

        resultHTML += '</div>';
        salaryResult.innerHTML = resultHTML;
    }
}
