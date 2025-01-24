/* js/calculator.js */
export function initCalculator() {
    const calcInput = document.getElementById('calcInput');
    const calculateBtn = document.getElementById('calculate');
    const calcResult = document.getElementById('calcResult');

    if (!calcInput || !calculateBtn || !calcResult) return;

    calculateBtn.addEventListener('click', () => {
        const expression = calcInput.value.trim();
        if (!expression) {
            alert('수식을 입력해주세요.');
            return;
        }

        try {
            // 수식을 계산하고 결과를 표시
            const result = eval(expression);
            calcResult.textContent = result;
        } catch (error) {
            alert('잘못된 수식입니다. 다시 입력해주세요.');
            console.error(error);
        }
    });
}
