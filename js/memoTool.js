export function initMemoTool() {
    console.log('메모 도구 초기화 시작');
    
    // DOM 요소
    const groupList = document.getElementById('groupList');
    const memoList = document.getElementById('memoList');
    const addGroupBtn = document.getElementById('addGroup');
    const addMemoBtn = document.getElementById('addMemo');
    const exportMemosBtn = document.getElementById('exportMemos');
    const importMemosInput = document.getElementById('importMemos');
    const importLabel = document.getElementById('importLabel');
    const currentGroupName = document.getElementById('currentGroupName');

    // 요소 존재 확인 및 디버깅
    if (!memoList) console.error('memoList를 찾을 수 없습니다');
    if (!addMemoBtn) console.error('addMemoBtn을 찾을 수 없습니다');
    if (!exportMemosBtn) console.error('exportMemosBtn을 찾을 수 없습니다');
    if (!importMemosInput) console.error('importMemosInput을 찾을 수 없습니다');

    if (!memoList || !addMemoBtn || !exportMemosBtn || !importMemosInput) {
        console.error('메모 도구 요소를 찾을 수 없습니다.');
        return;
    }

    // 마크다운 변환기 초기화 확인
    if (typeof markdownit === 'undefined') {
        console.error('markdown-it 라이브러리가 로드되지 않았습니다.');
        return;
    }

    console.log('메모 도구 초기화 완료');

    const md = markdownit({
        html: true,
        breaks: true,
        linkify: true
    });

    let groups = loadGroups();
    let currentGroup = null;

    // CSV 내보내기/가져오기는 항상 활성화
    exportMemosBtn.disabled = false;
    importLabel.style.opacity = '1';
    importLabel.style.pointerEvents = 'auto';

    // 새 메모 버튼은 그룹 선택 시에만 활성화
    addMemoBtn.disabled = true;

    // 그룹 관리 함수들
    function createGroup(name = '') {
        const groupName = name || prompt('그룹 이름을 입력하세요:');
        if (!groupName) return;

        const group = {
            id: Date.now(),
            name: groupName,
            memos: []
        };

        groups.push(group);
        saveGroups();
        renderGroup(group);
    }

    function renderGroup(group) {
        const groupElement = document.createElement('div');
        groupElement.className = 'group-item';
        groupElement.dataset.id = group.id;

        const groupNameSpan = document.createElement('span');
        groupNameSpan.textContent = group.name;

        const controls = document.createElement('div');
        controls.className = 'group-item-controls';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.title = '그룹 이름 수정';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            const newName = prompt('새 그룹 이름을 입력하세요:', group.name);
            if (newName) {
                group.name = newName;
                groupNameSpan.textContent = newName;
                saveGroups();
                if (currentGroup && currentGroup.id === group.id) {
                    currentGroupName.textContent = newName;
                }
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.title = '그룹 삭제';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            if (confirm('이 그룹을 삭제하시겠습니까? 모든 메모가 삭제됩니다.')) {
                groupElement.remove();
                groups = groups.filter(g => g.id !== group.id);
                saveGroups();
                if (currentGroup && currentGroup.id === group.id) {
                    selectGroup(null);
                }
            }
        };

        controls.appendChild(editBtn);
        controls.appendChild(deleteBtn);
        groupElement.appendChild(groupNameSpan);
        groupElement.appendChild(controls);

        groupElement.onclick = () => selectGroup(group);
        groupList.appendChild(groupElement);
    }

    function selectGroup(group) {
        // 이전 선택 제거
        const prevSelected = groupList.querySelector('.active');
        if (prevSelected) prevSelected.classList.remove('active');

        currentGroup = group;
        memoList.innerHTML = '';

        // 새로운 선택 표시
        const groupElement = groupList.querySelector(`[data-id="${group.id}"]`);
        groupElement.classList.add('active');
        currentGroupName.textContent = group.name;

        // 새 메모 버튼만 그룹 선택 시 활성화
        addMemoBtn.disabled = false;

        // 메모 렌더링
        group.memos.forEach(memo => renderMemo(memo));
    }

    // 메모 관리 함수들
    function createMemo(title = '', content = '', color = getRandomColor(), id = Date.now()) {
        if (!currentGroup) return;

        const memo = {
            id: id,
            title: title,
            content: content,
            color: color,
            created: new Date().toISOString()
        };

        currentGroup.memos.push(memo);
        saveGroups();
        renderMemo(memo);
    }

    // 랜덤 색상 생성
    function getRandomColor() {
        const colors = [
            '#fff8dc', '#f0fff0', '#f0f8ff', '#fff0f5',
            '#fffaf0', '#f5f5dc', '#fdf5e6', '#f0ffff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 메모 저장
    function saveGroups() {
        localStorage.setItem('memo_groups', JSON.stringify(groups));
    }

    // 메모 불러오기
    function loadGroups() {
        const saved = localStorage.getItem('memo_groups');
        return saved ? JSON.parse(saved) : [];
    }

    // 메모 렌더링
    function renderMemo(memo) {
        const memoElement = document.createElement('div');
        memoElement.className = 'memo';
        memoElement.style.backgroundColor = memo.color;
        memoElement.dataset.id = memo.id;
        memoElement.dataset.title = memo.title.toLowerCase();
        memoElement.dataset.content = memo.content.toLowerCase();

        // 메모 헤더 (제목)
        const memoHeader = document.createElement('div');
        memoHeader.className = 'memo-header';
        
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'memo-title';
        titleInput.value = memo.title;
        titleInput.placeholder = '제목을 입력하세요';
        
        // 제목 자동 저장
        titleInput.oninput = () => {
            memo.title = titleInput.value;
            memoElement.dataset.title = titleInput.value.toLowerCase();
            saveGroups();
        };

        memoHeader.appendChild(titleInput);

        // 메모 콘텐츠
        const memoContent = document.createElement('div');
        memoContent.className = 'memo-content';
        
        const textarea = document.createElement('textarea');
        textarea.value = memo.content;
        textarea.placeholder = '메모를 입력하세요';
        
        const preview = document.createElement('div');
        preview.className = 'memo-preview markdown-body';
        preview.innerHTML = md.render(memo.content);
        preview.style.display = 'none';

        // 메모 푸터 (버튼들)
        const memoFooter = document.createElement('div');
        memoFooter.className = 'memo-footer';
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '저장';
        saveBtn.className = 'btn btn-primary';
        saveBtn.onclick = () => {
            // 메모 내용 업데이트
            memo.content = textarea.value;
            memoElement.dataset.content = textarea.value.toLowerCase();
            
            // 현재 그룹에서 메모 찾아서 업데이트
            const memoIndex = currentGroup.memos.findIndex(m => m.id === memo.id);
            if (memoIndex !== -1) {
                currentGroup.memos[memoIndex] = memo;
            }
            
            // 변경사항 저장
            saveGroups();
            
            // 저장 완료 표시
            saveBtn.textContent = '저장됨';
            setTimeout(() => {
                saveBtn.textContent = '저장';
            }, 1000);
            
            // 미리보기 업데이트
            preview.innerHTML = md.render(textarea.value);
        };

        // textarea 변경 감지
        textarea.oninput = () => {
            // 변경사항이 있음을 표시
            saveBtn.textContent = '저장*';
        };

        const colorBtn = document.createElement('button');
        colorBtn.textContent = '색상';
        colorBtn.className = 'btn btn-info';
        colorBtn.onclick = () => {
            const newColor = getRandomColor();
            memoElement.style.backgroundColor = newColor;
            memo.color = newColor;
            saveGroups();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '삭제';
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.onclick = () => {
            if (confirm('메모를 삭제하시겠습니까?')) {
                memoElement.remove();
                currentGroup.memos = currentGroup.memos.filter(m => m.id !== memo.id);
                saveGroups();
            }
        };

        // 자동 저장 제거 (저장 버튼으로 대체)
        memoContent.appendChild(textarea);
        memoContent.appendChild(preview);
        
        memoFooter.appendChild(saveBtn);
        memoFooter.appendChild(colorBtn);
        memoFooter.appendChild(deleteBtn);
        
        memoElement.appendChild(memoHeader);
        memoElement.appendChild(memoContent);
        memoElement.appendChild(memoFooter);
        
        memoList.appendChild(memoElement);
    }

    // CSV 내보내기/가져오기 함수 수정
    function exportToCSV() {
        const csvContent = [
            ['GroupID', 'GroupName', 'MemoID', '제목', '내용', '색상', '생성일'],
            ...groups.flatMap(group => 
                group.memos.map(memo => [
                    group.id,
                    group.name,
                    memo.id,
                    memo.title,
                    memo.content,
                    memo.color,
                    memo.created
                ])
            )
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `all_memos_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    }

    function importFromCSV(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n').map(row => 
                row.split(',').map(cell => cell.replace(/^"|"$/g, '')));
            
            rows.shift(); // 헤더 제거
            
            // 기존 데이터 초기화
            groups = [];
            groupList.innerHTML = '';
            memoList.innerHTML = '';
            
            // 그룹과 메모 재생성
            const groupMap = new Map();
            
            rows.forEach(([groupId, groupName, memoId, title, content, color, created]) => {
                if (!groupMap.has(groupId)) {
                    const group = {
                        id: parseInt(groupId),
                        name: groupName,
                        memos: []
                    };
                    groupMap.set(groupId, group);
                    groups.push(group);
                }
                
                const group = groupMap.get(groupId);
                if (content) {
                    group.memos.push({
                        id: parseInt(memoId),
                        title,
                        content,
                        color,
                        created
                    });
                }
            });
            
            // 저장 및 렌더링
            saveGroups();
            groups.forEach(group => renderGroup(group));
            
            // 현재 선택된 그룹 초기화
            selectGroup(null);
        };
        reader.readAsText(file);
    }

    // 이벤트 리스너
    addGroupBtn.onclick = () => createGroup();
    addMemoBtn.onclick = () => createMemo();
    exportMemosBtn.onclick = exportToCSV;
    importMemosInput.onchange = (e) => {
        if (e.target.files[0]) {
            importFromCSV(e.target.files[0]);
        }
    };

    // 검색 기능 초기화
    initSearch();

    // 초기 렌더링
    groups.forEach(group => renderGroup(group));
}

// 검색 기능 추가
function initSearch() {
    const searchInput = document.getElementById('memoSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const memos = document.querySelectorAll('.memo');

        memos.forEach(memo => {
            const title = memo.dataset.title || '';
            const content = memo.dataset.content || '';
            const isVisible = 
                title.includes(searchTerm) || 
                content.includes(searchTerm);
            
            memo.style.display = isVisible ? 'block' : 'none';
        });
    });
}