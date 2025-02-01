<!-- components/memo-tool.php -->
<div id="memoTool" class="section">
    <h2>메모 기능</h2>
    <div class="memo-notice">
        ※ 로컬 환경에 저장하기 때문에 인터넷 기록을 삭제하면 내용이 없어질 수 있습니다. CSV내보내기와 CSV 가져오기 기능으로 내용을 백업하고 유지하세요.
    </div>
    <div class="memo-container">
        <div class="memo-sidebar">
            <button id="addGroup" class="btn btn-primary">새 그룹</button>
            <div class="group-list" id="groupList"></div>
            <div id="currentGroupName">그룹을 선택해주세요</div>
            <div class="csv-controls">
                <button id="exportMemos" class="btn btn-secondary">CSV 내보내기</button>
                <input type="file" id="importMemos" accept=".csv" style="display: none;">
                <label for="importMemos" id="importLabel" class="btn btn-secondary">CSV 가져오기</label>
            </div>
        </div>
        <div class="memo-main">
            <div class="memo-header">
                <div class="memo-search">
                    <input type="text" id="memoSearch" class="search-input" placeholder="메모 검색...">
                </div>
                <button id="addMemo" class="btn btn-primary" disabled>새 메모</button>
            </div>
            <div class="memo-list" id="memoList"></div>
        </div>
    </div>
</div>
