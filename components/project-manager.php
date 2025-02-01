<!-- components/project-manager.php -->
<div id="projectManager" class="section">
    <h2>프로젝트 관리</h2>
    <div class="project-container">
        <!-- 캘린더 영역 -->
        <div class="calendar-section">
            <div class="calendar-header">
                <button id="prevMonth" class="btn btn-light">&lt;</button>
                <h3 id="currentMonth"></h3>
                <button id="nextMonth" class="btn btn-light">&gt;</button>
            </div>
            <div class="calendar-grid">
                <div class="weekdays">
                    <div>일</div><div>월</div><div>화</div><div>수</div>
                    <div>목</div><div>금</div><div>토</div>
                </div>
                <div id="calendarDays" class="days"></div>
            </div>
        </div>

        <!-- 프로젝트 관리 영역 -->
        <div class="project-management">
            <div class="project-header">
                <button id="addProject" class="btn btn-primary">새 프로젝트</button>
                <select id="projectFilter">
                    <option value="all">모든 상태</option>
                    <option value="ongoing">진행 중</option>
                    <option value="completed">완료</option>
                    <option value="pending">대기</option>
                </select>
            </div>
            <div id="projectList" class="project-list"></div>
        </div>
    </div>
</div>
