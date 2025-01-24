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

    if (
        !calculatorType || !hourlyForm || !monthlyForm ||
        !hourlyRateInput || !workHoursInput || !breakTimeInput || !includeBreakCheckbox ||
        !monthlyRateInput || !monthlyWorkDaysInput || !monthlyWorkHoursInput ||
        !calculateSalaryBtn || !salaryResult || !breakTimeNotice
    ) {
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

    // 근무시간 입력 시 휴게시간 안내
    workHoursInput.addEventListener('input', () => {
        const hours = parseFloat(workHoursInput.value) || 0;
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

    // 계산하기
    calculateSalaryBtn.addEventListener('click', () => {
        if (currentCalculationType === 'hourly') {
            calculateHourlySalary();
        } else {
            calculateMonthlySalary();
        }
    });

    function calculateHourlySalary() {
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;
        const workHours = parseFloat(workHoursInput.value) || 0;
        const breakTime = parseFloat(breakTimeInput.value) || 0;
        const includeBreak = includeBreakCheckbox.checked;

        if (hourlyRate <= 0 || workHours <= 0) {
            alert('시급과 근무시간을 입력해주세요.');
            return;
        }

        const actualWorkHours = includeBreak ? workHours : workHours - breakTime;
        const dailyWage = hourlyRate * actualWorkHours;
        const weeklyWage = dailyWage * 5;     // 주 5일 기준
        const monthlyWage = dailyWage * 21.75; // 월 평균 근무일(21.75일) 가정

        displayResult(hourlyRate, dailyWage, weeklyWage, monthlyWage, {
            workHours,
            breakTime,
            actualWorkHours,
            includeBreak
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

        // 하루 임금, 시급, 주급 계산
        const dailyWage = monthlyRate / workDays;
        const hourlyWage = dailyWage / workHours;
        const weeklyWage = dailyWage * 5;

        displayResult(hourlyWage, dailyWage, weeklyWage, monthlyRate, {
            workDays,
            workHours
        });
    }

    // 결과 표시
    function displayResult(hourlyWage, dailyWage, weeklyWage, monthlyWage, details) {
        salaryResult.innerHTML = `
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
                    <span class="label">주급 (5일 기준):</span>
                    <span class="value">${Math.round(weeklyWage).toLocaleString()}원</span>
                </div>
                <div class="salary-item">
                    <span class="label">월급:</span>
                    <span class="value">${Math.round(monthlyWage).toLocaleString()}원</span>
                </div>
                <div class="salary-info">
                    <p>※ 계산 기준</p>
                    <ul>
                        ${
                            currentCalculationType === 'hourly'
                            ? `
                                <li>하루 근무시간: ${details.workHours}시간</li>
                                <li>휴게시간: ${details.breakTime}시간</li>
                                <li>실제 계산된 근무시간: ${details.actualWorkHours}시간</li>
                                <li>휴게시간 ${details.includeBreak ? '포함' : '미포함'}</li>
                              `
                            : `
                                <li>월 근무일수: ${details.workDays}일</li>
                                <li>하루 근무시간: ${details.workHours}시간</li>
                              `
                        }
                    </ul>
                </div>
            </div>
        `;
    }
}
