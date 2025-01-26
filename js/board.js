const posts = [
    {
        id: 'labor-law',
        date: '2024-02-14',
        title: '2025년 최저시급 및 주요 노동법 변경사항',
        file: 'posts/labor-law.html'
    },
    {
        id: 'year-end-tax',
        date: '2024-02-14',
        title: '2025년 연말정산 필수 준비서류',
        file: 'posts/year-end-tax.html'
    }
];

function loadPosts() {
    const boardList = document.getElementById('boardList');
    if (!boardList) return;

    boardList.innerHTML = posts.map(post => `
        <div class="board-item">
            <a href="#" onclick="loadPost('${post.id}'); return false;">
                <span class="post-date">${post.date}</span>
                <span class="post-title">${post.title}</span>
            </a>
        </div>
    `).join('');
}

async function loadPost(postId) {
    const boardList = document.getElementById('boardList');
    const postDetail = document.getElementById('postDetail');
    const post = posts.find(p => p.id === postId);

    if (post) {
        try {
            const response = await fetch(post.file);
            const content = await response.text();
            
            document.getElementById('postTitle').textContent = post.title;
            document.getElementById('postDate').textContent = post.date;
            document.getElementById('postBody').innerHTML = content;

            boardList.style.display = 'none';
            postDetail.style.display = 'block';
            
            history.pushState({ postId }, '', `#post=${postId}`);
        } catch (error) {
            console.error('게시글 로드 실패:', error);
        }
    }
}

function showList() {
    const boardList = document.getElementById('boardList');
    const postDetail = document.getElementById('postDetail');
    
    boardList.style.display = 'block';
    postDetail.style.display = 'none';
    
    history.pushState({}, '', '#infoShare');
}

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.postId) {
        loadPost(event.state.postId);
    } else {
        showList();
    }
});

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    const postId = hash.match(/post=([^&]*)/)?.[1];
    
    if (postId) {
        loadPost(postId);
    } else {
        loadPosts();
    }
}); 