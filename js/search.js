document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('toolSearch');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const menuItems = document.querySelectorAll('.nav-menu li'); // 네비게이션 메뉴 아이템

        menuItems.forEach(item => {
            const link = item.querySelector('a');
            const text = link.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                item.style.display = '';
                item.classList.add('search-highlight');
                setTimeout(() => item.classList.remove('search-highlight'), 2000);
            } else {
                item.style.display = 'none';
            }
        });

        // 검색 결과가 없을 경우
        const visibleItems = document.querySelectorAll('.nav-menu li[style=""]').length;
        const noResultsMsg = document.getElementById('noResultsMessage');
        
        if (visibleItems === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.id = 'noResultsMessage';
                message.className = 'no-results';
                message.textContent = '검색 결과가 없습니다.';
                document.querySelector('.nav-menu').appendChild(message);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', performSearch);

    // 엔터 키 입력 이벤트
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 실시간 검색
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        if (this.value.length >= 1) { // 1글자부터 검색 시작
            searchTimeout = setTimeout(performSearch, 300); // 타이핑 후 300ms 후에 검색 실행
        } else {
            // 검색어가 없을 때 모든 항목 표시
            document.querySelectorAll('.nav-menu li').forEach(item => {
                item.style.display = '';
            });
            const noResultsMsg = document.getElementById('noResultsMessage');
            if (noResultsMsg) noResultsMsg.remove();
        }
    });
}); 