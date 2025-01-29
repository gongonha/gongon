// 상단에 공휴일 데이터 추가
const HOLIDAYS_2024 = {
    '2024-01-01': '신정',
    '2024-02-09': '설날 연휴',
    '2024-02-10': '설날',
    '2024-02-11': '설날 연휴',
    '2024-02-12': '대체공휴일',
    '2024-03-01': '삼일절',
    '2024-04-10': '제22대 국회의원선거',
    '2024-05-01': '근로자의 날',
    '2024-05-05': '어린이날',
    '2024-05-06': '대체공휴일',
    '2024-05-15': '부처님오신날',
    '2024-06-06': '현충일',
    '2024-08-15': '광복절',
    '2024-09-16': '추석 연휴',
    '2024-09-17': '추석',
    '2024-09-18': '추석 연휴',
    '2024-10-03': '개천절',
    '2024-10-09': '한글날',
    '2024-12-25': '크리스마스'
};

const HOLIDAYS_2025 = {
    '2025-01-01': '신정',
    '2025-01-28': '설날 연휴',
    '2025-01-29': '설날',
    '2025-01-30': '설날 연휴',
    '2025-03-01': '삼일절',
    '2025-03-03': '대체공휴일',
    '2025-05-01': '근로자의 날',
    '2025-05-05': '어린이날',
    '2025-05-06': '부처님오신날',
    '2025-06-06': '현충일',
    '2025-08-15': '광복절',
    '2025-10-03': '개천절',
    '2025-10-06': '추석 연휴',
    '2025-10-07': '추석',
    '2025-10-08': '추석 연휴',
    '2025-10-09': '한글날',
    '2025-12-25': '크리스마스'
};

function getHoliday(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    return year === 2024 ? HOLIDAYS_2024[dateString] : HOLIDAYS_2025[dateString];
}

export function initProjectManager() {
    let currentDate = new Date();
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    // 전역 스코프에 함수 추가
    window.editProject = function(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            const modal = createProjectModal(project);
            document.body.appendChild(modal);
        }
    };

    window.deleteProject = function(projectId) {
        if (confirm('프로젝트를 삭제하시겠습니까?')) {
            projects = projects.filter(p => p.id !== projectId);
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            renderCalendar();
        }
    };

    // 완료 상태 변경 함수 추가
    window.toggleProjectStatus = function(projectId, newStatus) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            project.status = newStatus;
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            renderCalendar();
        }
    };

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        document.getElementById('currentMonth').textContent = 
            `${year}년 ${month + 1}월`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysGrid = document.getElementById('calendarDays');
        daysGrid.innerHTML = '';

        // 달력 그리드 생성
        const totalDays = 42; // 6주 × 7일
        const firstDayIndex = firstDay.getDay();
        const lastDate = lastDay.getDate();

        for (let i = 0; i < totalDays; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            
            const currentDayDate = i - firstDayIndex + 1;
            const currentDate = new Date(year, month, currentDayDate);
            
            if (i < firstDayIndex || currentDayDate > lastDate) {
                // 이전/다음 달의 날짜
                dayDiv.className += ' other-month';
                if (i < firstDayIndex) {
                    const prevMonthLastDay = new Date(year, month, 0);
                    dayDiv.textContent = prevMonthLastDay.getDate() - (firstDayIndex - i - 1);
                } else {
                    dayDiv.textContent = currentDayDate - lastDate;
                }
            } else {
                // 날짜 컨테이너 생성
                const dateContainer = document.createElement('div');
                dateContainer.className = 'date-container';
                
                // 날짜 표시
                const dateNumber = document.createElement('span');
                dateNumber.className = 'date-number';
                dateNumber.textContent = currentDayDate;
                dateContainer.appendChild(dateNumber);
                
                // 공휴일 확인 및 표시
                const holiday = getHoliday(currentDate);
                if (holiday) {
                    dayDiv.className += ' holiday';
                    const holidayName = document.createElement('div');
                    holidayName.className = 'holiday-name';
                    holidayName.textContent = holiday;
                    dateContainer.appendChild(holidayName);
                }
                
                // 일요일인 경우 빨간색으로 표시
                if (currentDate.getDay() === 0) {
                    dayDiv.className += ' sunday';
                }
                
                dayDiv.appendChild(dateContainer);
                
                // 오늘 날짜 표시
                const today = new Date();
                if (year === today.getFullYear() && 
                    month === today.getMonth() && 
                    currentDayDate === today.getDate()) {
                    dayDiv.className += ' today';
                }

                // 프로젝트 표시
                const dayProjects = projects.filter(project => {
                    const projectDate = new Date(project.dueDate);
                    return projectDate.getFullYear() === year &&
                           projectDate.getMonth() === month &&
                           projectDate.getDate() === currentDayDate;
                });

                if (dayProjects.length > 0) {
                    const projectIndicator = document.createElement('div');
                    projectIndicator.className = 'project-indicator';
                    
                    // 상태별로 프로젝트 분리
                    const completedProjects = dayProjects.filter(p => p.status === 'completed');
                    const ongoingProjects = dayProjects.filter(p => p.status === 'ongoing');
                    const pendingProjects = dayProjects.filter(p => p.status === 'pending');
                    
                    // 대기 중인 프로젝트 표시
                    if (pendingProjects.length > 0) {
                        const pendingIndicator = document.createElement('div');
                        pendingIndicator.className = 'indicator-item indicator-pending';
                        pendingIndicator.textContent = `${pendingProjects.length}`;
                        projectIndicator.appendChild(pendingIndicator);
                    }
                    
                    // 진행 중인 프로젝트 표시
                    if (ongoingProjects.length > 0) {
                        const ongoingIndicator = document.createElement('div');
                        ongoingIndicator.className = 'indicator-item indicator-ongoing';
                        ongoingIndicator.textContent = `${ongoingProjects.length}`;
                        projectIndicator.appendChild(ongoingIndicator);
                    }
                    
                    // 완료된 프로젝트 표시
                    if (completedProjects.length > 0) {
                        const completedIndicator = document.createElement('div');
                        completedIndicator.className = 'indicator-item indicator-completed';
                        completedIndicator.textContent = `${completedProjects.length}`;
                        projectIndicator.appendChild(completedIndicator);
                    }
                    
                    dayDiv.appendChild(projectIndicator);
                }
            }
            
            daysGrid.appendChild(dayDiv);
        }
    }

    function createProjectModal(projectData = null) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // 현재 날짜를 YYYY-MM-DD 형식으로 변환
        const today = new Date().toISOString().split('T')[0];
        
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${projectData ? '프로젝트 수정' : '새 프로젝트'}</h3>
                <form id="projectForm">
                    <div class="input-group">
                        <label>프로젝트명</label>
                        <input type="text" id="projectName" required 
                            value="${projectData?.name || ''}">
                    </div>
                    <div class="input-group">
                        <label>설명</label>
                        <textarea id="projectDesc">${projectData?.description || ''}</textarea>
                    </div>
                    <div class="input-group">
                        <label>마감일</label>
                        <input type="date" id="projectDueDate" required
                            value="${projectData?.dueDate || today}">
                    </div>
                    <div class="input-group">
                        <label>상태</label>
                        <select id="projectStatus">
                            <option value="pending" ${projectData?.status === 'pending' ? 'selected' : ''}>대기</option>
                            <option value="ongoing" ${projectData?.status === 'ongoing' ? 'selected' : ''}>진행 중</option>
                            <option value="completed" ${projectData?.status === 'completed' ? 'selected' : ''}>완료</option>
                        </select>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="btn btn-primary">저장</button>
                        <button type="button" class="btn btn-danger" onclick="this.closest('.modal').remove()">취소</button>
                    </div>
                </form>
            </div>
        `;

        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                id: projectData?.id || Date.now(),
                name: document.getElementById('projectName').value,
                description: document.getElementById('projectDesc').value,
                dueDate: document.getElementById('projectDueDate').value,
                status: document.getElementById('projectStatus').value
            };

            if (projectData) {
                const index = projects.findIndex(p => p.id === projectData.id);
                projects[index] = formData;
            } else {
                projects.push(formData);
            }

            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            renderCalendar();
            modal.remove();
        });

        return modal;
    }

    function addProject() {
        const modal = createProjectModal();
        document.body.appendChild(modal);
    }

    function renderProjects() {
        const projectList = document.getElementById('projectList');
        const filter = document.getElementById('projectFilter').value;
        
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(p => p.status === filter);

        projectList.innerHTML = filteredProjects.map(project => `
            <div class="project-card ${project.status}">
                <div class="project-header">
                    <h4>${project.name}</h4>
                    <div class="project-actions">
                        ${project.status === 'completed' ? `
                            <button onclick="toggleProjectStatus(${project.id}, 'ongoing')" class="btn btn-warning">진행중으로 변경</button>
                            <button onclick="toggleProjectStatus(${project.id}, 'pending')" class="btn btn-secondary">대기로 변경</button>
                        ` : project.status === 'ongoing' ? `
                            <button onclick="toggleProjectStatus(${project.id}, 'completed')" class="btn btn-success">완료하기</button>
                            <button onclick="toggleProjectStatus(${project.id}, 'pending')" class="btn btn-secondary">대기로 변경</button>
                        ` : `
                            <button onclick="toggleProjectStatus(${project.id}, 'ongoing')" class="btn btn-primary">진행하기</button>
                            <button onclick="toggleProjectStatus(${project.id}, 'completed')" class="btn btn-success">완료하기</button>
                        `}
                        <button onclick="editProject(${project.id})" class="btn btn-light">수정</button>
                        <button onclick="deleteProject(${project.id})" class="btn btn-danger">삭제</button>
                    </div>
                </div>
                <p>${project.description}</p>
                <div class="project-footer">
                    <span class="due-date">마감: ${new Date(project.dueDate).toLocaleDateString()}</span>
                    <span class="status">${getStatusText(project.status)}</span>
                </div>
            </div>
        `).join('');
    }

    // 이벤트 리스너 설정
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('addProject').addEventListener('click', addProject);
    document.getElementById('projectFilter').addEventListener('change', renderProjects);

    // CSV 내보내기 함수
    function exportToCsv() {
        const csvContent = [
            // CSV 헤더
            ['프로젝트명', '설명', '마감일', '상태'],
            // 프로젝트 데이터
            ...projects.map(project => [
                project.name,
                project.description,
                project.dueDate,
                getStatusText(project.status)
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `프로젝트_목록_${new Date().toLocaleDateString()}.csv`;
        link.click();
    }

    // CSV 불러오기 함수
    function importFromCsv(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            const rows = text.split('\n').map(row => 
                row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim())
            );
            
            // 헤더 제거
            rows.shift();
            
            // 새 프로젝트 배열 생성
            const newProjects = rows.filter(row => row.length === 4).map(row => ({
                id: Date.now() + Math.random(),
                name: row[0],
                description: row[1],
                dueDate: row[2],
                status: getStatusFromText(row[3])
            }));

            // 기존 프로젝트에 추가
            projects = [...projects, ...newProjects];
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            renderCalendar();
        };
        reader.readAsText(file, 'UTF-8');
    }

    // 상태 텍스트를 상태 값으로 변환
    function getStatusFromText(text) {
        const statusMap = {
            '대기': 'pending',
            '진행 중': 'ongoing',
            '완료': 'completed'
        };
        return statusMap[text] || 'pending';
    }

    // 프로젝트 헤더 HTML 수정
    function updateProjectHeader() {
        const projectHeader = document.querySelector('.project-header');
        projectHeader.innerHTML = `
            <div class="project-notice">
                <p class="notice-text">※ 로컬 환경에 저장하기 때문에 인터넷 기록을 삭제하면 내용이 없어질 수 있습니다. CSV내보내기와 CSV 가져오기 기능으로 내용을 백업하고 유지하세요.</p>
                <div class="status-legend">
                    <span class="status-item pending">대기</span>
                    <span class="status-item ongoing">진행중</span>
                    <span class="status-item completed">완료</span>
                </div>
            </div>
            <div class="project-controls">
                <button id="addProject" class="btn btn-primary">새 프로젝트</button>
                <div class="csv-controls">
                    <button id="exportProjectCsv">CSV 내보내기</button>
                    <input type="file" id="importProjectCsv" accept=".csv">
                    <label for="importProjectCsv" class="file-label">CSV 가져오기</label>
                </div>
                <select id="projectFilter">
                    <option value="all">모든 상태</option>
                    <option value="pending">대기</option>
                    <option value="ongoing">진행 중</option>
                    <option value="completed">완료</option>
                </select>
            </div>
        `;

        // 이벤트 리스너 추가
        document.getElementById('addProject').addEventListener('click', addProject);
        document.getElementById('exportProjectCsv').addEventListener('click', exportToCsv);
        document.getElementById('importProjectCsv').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                importFromCsv(e.target.files[0]);
                e.target.value = ''; // 파일 입력 초기화
            }
        });
        document.getElementById('projectFilter').addEventListener('change', renderProjects);
    }

    // 초기화 시 프로젝트 헤더 업데이트 추가
    updateProjectHeader();

    // 초기 렌더링
    renderCalendar();
    renderProjects();
}

function getStatusText(status) {
    const statusMap = {
        pending: '대기',
        ongoing: '진행 중',
        completed: '완료'
    };
    return statusMap[status] || status;
} 