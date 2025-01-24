/* js/todo.js */
export function initTodo() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    const exportTodoCsvBtn = document.getElementById('exportTodoCsv');
    const importTodoCsvBtn = document.getElementById('importTodoCsv');

    if (!todoInput || !addTodoBtn || !todoList || !exportTodoCsvBtn || !importTodoCsvBtn) {
        return;
    }

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
                    ${todo.text}
                </span>
                <div>
                    <button onclick="toggleTodoItem(${index})">${todo.completed ? '되돌리기' : '완료'}</button>
                    <button onclick="deleteTodoItem(${index})">삭제</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false, createdAt: new Date().toISOString() });
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    }

    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    // 전역으로 노출(HTML onclick에서 접근)
    window.toggleTodoItem = (index) => toggleTodo(index);
    window.deleteTodoItem = (index) => deleteTodo(index);

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function exportToCsv() {
        const csvContent = [
            ['할일', '완료여부', '생성일'],
            ...todos.map(todo => [
                todo.text,
                todo.completed ? '완료' : '미완료',
                todo.createdAt || new Date().toISOString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'todo-list.csv';
        link.click();
    }

    function importFromCsv(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const rows = text.split('\n').slice(1); // 첫 줄은 헤더
            const importedTodos = rows.map(row => {
                const [todoText, completed] = row.split(',');
                return {
                    text: todoText,
                    completed: completed === '완료',
                    createdAt: new Date().toISOString()
                };
            });
            todos = [...todos, ...importedTodos];
            saveTodos();
            renderTodos();
        };
        reader.readAsText(file);
    }

    exportTodoCsvBtn.addEventListener('click', exportToCsv);
    importTodoCsvBtn.addEventListener('change', (e) => {
        if (e.target.files[0]) {
            importFromCsv(e.target.files[0]);
        }
    });

    // 페이지 로드 시 초기 렌더링
    renderTodos();
}
