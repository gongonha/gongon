<!-- components/converter.php -->
<div id="converter" class="section">
    <h2>단위 변환기</h2>
    <div class="converter-container">
        <select id="conversionType">
            <option value="length">길이</option>
            <option value="weight">무게</option>
            <option value="temperature">온도</option>
            <option value="area">면적</option>
        </select>
        <div class="conversion-inputs">
            <div class="input-group">
                <input type="number" id="fromValue">
                <select id="fromUnit">
                    <option value="mm">mm (밀리미터)</option>
                    <option value="cm">cm (센티미터)</option>
                    <option value="m">m (미터)</option>
                    <option value="km">km (킬로미터)</option>
                    <option value="in">in (인치)</option>
                    <option value="ft">ft (피트)</option>
                    <option value="yd">yd (야드)</option>
                    <option value="mi">mi (마일)</option>
                </select>
            </div>
            <div class="input-group">
                <input type="number" id="toValue" readonly>
                <select id="toUnit">
                    <option value="mm">mm (밀리미터)</option>
                    <option value="cm">cm (센티미터)</option>
                    <option value="m">m (미터)</option>
                    <option value="km">km (킬로미터)</option>
                    <option value="in">in (인치)</option>
                    <option value="ft">ft (피트)</option>
                    <option value="yd">yd (야드)</option>
                    <option value="mi">mi (마일)</option>
                </select>
            </div>
        </div>
    </div>
</div>
