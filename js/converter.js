/* js/converter.js */
export function initUnitConverter() {
    const conversionType = document.getElementById('conversionType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');

    if (!conversionType || !fromUnit || !toUnit || !fromValue || !toValue) return;

    const conversions = {
        length: {
            units: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
            ratios: {
                mm: 1,
                cm: 10,
                m: 1000,
                km: 1000000,
                in: 25.4,
                ft: 304.8,
                yd: 914.4,
                mi: 1609344
            }
        },
        weight: {
            units: ['mg', 'g', 'kg', 'oz', 'lb'],
            ratios: {
                mg: 1,
                g: 1000,
                kg: 1000000,
                oz: 28349.5,
                lb: 453592
            }
        },
        temperature: {
            units: ['°C', '°F', 'K'],
            convert: (value, from, to) => {
                let celsius;
                switch(from) {
                    case '°C': celsius = value; break;
                    case '°F': celsius = (value - 32) * 5/9; break;
                    case 'K': celsius = value - 273.15; break;
                }
                switch(to) {
                    case '°C': return celsius;
                    case '°F': return celsius * 9/5 + 32;
                    case 'K': return celsius + 273.15;
                }
            }
        },
        area: {
            units: ['mm²', 'cm²', 'm²', 'km²', 'in²', 'ft²', 'ac'],
            ratios: {
                'mm²': 1,
                'cm²': 100,
                'm²': 1000000,
                'km²': 1000000000000,
                'in²': 645.16,
                'ft²': 92903.04,
                'ac': 4046856422.4
            }
        }
    };

    // 이벤트 바인딩
    conversionType.addEventListener('change', updateUnits);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);
    fromValue.addEventListener('input', convert);

    // 단위 목록 업데이트
    function updateUnits() {
        const type = conversionType.value;
        const units = conversions[type].units;
        
        fromUnit.innerHTML = units.map(unit => 
            `<option value="${unit}">${unit}</option>`
        ).join('');
        
        toUnit.innerHTML = units.map(unit => 
            `<option value="${unit}">${unit}</option>`
        ).join('');
        
        convert();
    }

    // 실제 변환 처리
    function convert() {
        const type = conversionType.value;
        const value = parseFloat(fromValue.value);
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (isNaN(value)) {
            toValue.value = '';
            return;
        }
        
        if (type === 'temperature') {
            toValue.value = conversions.temperature.convert(value, from, to).toFixed(2);
        } else {
            const ratios = conversions[type].ratios;
            const result = (value * ratios[from]) / ratios[to];
            toValue.value = result.toFixed(2);
        }
    }

    // 초기 실행
    updateUnits();
}
