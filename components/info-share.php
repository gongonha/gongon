<!-- components/info-share.php -->
<div id="infoShare" class="section">
    <h2>정보 공유</h2>
    <div class="section-description">
        <div id="boardContainer">
            <!-- 게시글 목록 -->
            <div id="boardList" class="board-list">
                <!-- 게시글 목록 로드 -->
            </div>
            <!-- 게시글 상세 보기 -->
            <div id="postDetail" class="post-detail" style="display: none;">
                <div class="post-header">
                    <button onclick="showList()" class="back-btn">
                        <i class="fas fa-arrow-left"></i> 목록으로
                    </button>
                    <h3 id="postTitle"></h3>
                    <div class="post-info">
                        <span id="postDate" class="post-date"></span>
                    </div>
                </div>
                <div id="postBody" class="post-body">
                    <!-- 게시글 내용 로드 -->
                </div>
            </div>
        </div>
    </div>
</div>
