<!-- components/todo.php -->
<div id="todo" class="section">
    <h2>To-Do 리스트</h2>
    <div class="section-description">
        <p>할 일을 관리하고 진행 상황을 추적할 수 있는 도구입니다.</p>
        <ul>
            <li>새로운 할 일을 추가하고 관리할 수 있습니다.</li>
            <li>완료된 항목을 체크하고 삭제할 수 있습니다.</li>
            <li>로컬 환경에 저장하기 때문에 인터넷 기록을 삭제하면 사라질 수 있습니다.</li>
            <li>CSV 파일로 내보내기/가져오기 기능을 이용해 자료를 유지하세요.</li>
        </ul>
    </div>
    <div class="input-group">
        <input type="text" id="todoInput" placeholder="할 일을 입력하세요">
        <button id="addTodo">추가</button>
    </div>
    <div class="csv-controls">
        <button id="exportTodoCsv">CSV로 내보내기</button>
        <input type="file" id="importTodoCsv" accept=".csv">
        <label for="importTodoCsv" class="file-label">CSV 가져오기</label>
    </div>
    <ul id="todoList"></ul>
</div>
