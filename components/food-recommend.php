<!-- components/food-recommend.php -->
<div id="foodRecommend" class="section">
    <h2>음식 메뉴 추천</h2>
    <div class="food-recommend-container">
        <div class="meal-type-selector">
            <button class="meal-btn active" data-meal="breakfast">아침</button>
            <button class="meal-btn" data-meal="lunch">점심</button>
            <button class="meal-btn" data-meal="dinner">저녁</button>
        </div>

        <div class="food-options">
            <div class="food-category">
                <h3>메뉴 종류</h3>
                <select id="foodCategory">
                    <option value="all">전체</option>
                    <option value="korean">한식</option>
                    <option value="chinese">중식</option>
                    <option value="japanese">일식</option>
                    <option value="western">양식</option>
                    <option value="fusion">퓨전</option>
                </select>
            </div>

            <div class="food-filters">
                <label>
                    <input type="checkbox" id="spicyFilter"> 매운 음식 제외
                </label>
                <label>
                    <input type="checkbox" id="soupFilter"> 국물 요리만
                </label>
            </div>

            <button id="recommendBtn" class="btn btn-primary">메뉴 추천받기</button>
        </div>

        <div class="recommendation-result">
            <div id="recommendedMenu" class="recommended-menu">
                <h3>추천 메뉴</h3>
                <div class="menu-display"></div>
            </div>

            <div class="all-menus">
                <h3>전체 메뉴 목록</h3>
                <div id="menuList" class="menu-list"></div>
            </div>
        </div>
    </div>
</div>
