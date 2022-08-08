const TODOS_KEY = 'todos';

const inputTodoAdd = document.querySelector('[data-input-add]');
const buttonAdd = document.querySelector('[data-button-add]');
const todoItemTemplate = document.querySelector('[data-todo-item-template]');
const todoContainer = document.querySelector('[data-todo-container]');
const buttonDeleteAll = document.querySelector('[data-button-delete-all]');

function saveToLocalStorage () {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
};

let todoList = [];

buttonAdd.addEventListener('click', () => {
    let inputValue = inputTodoAdd.value.trim();

    if (inputValue) {
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            date: getDate(),
            isChecked: false,
        }

    todoList.push(newTodo);
    inputTodoAdd.value = '';
}

inputTodoAdd.focus();
    render();
});

function createTodo(id, text, isChecked) {
    const todoItem = document.importNode(todoItemTemplate.content, true);
    const todoItemText = todoItem.querySelector('[data-todo-text]');

    todoItemText.textContent = text;

    const buttonTodoDelete = todoItem.querySelector('[data-todo-button-delete]');
    buttonTodoDelete.addEventListener('click', deleteTodoItem);

    const todoDate = todoItem.querySelector('[data-todo-date]');
    todoDate.append(getDate());

    function deleteTodoItem() {
        todoList = todoList.filter(item => item.id !== id);
        render();
    }

    const checkToDoId = `doggo-${id}`
    const checkTodoLabel = todoItem.querySelector('[data-todo-checkbox-label]');
    checkTodoLabel.htmlFor = checkToDoId;

    const checkTodo = todoItem.querySelector('[data-todo-checkbox]');
    checkTodo.id = checkToDoId;
    checkTodo.checked = isChecked;
    checkTodo.addEventListener('change', () => {
        const todo = todoList.find(item => item.id === id);
        todo.isChecked = !todo.isChecked;
        saveToLocalStorage();
    });

    return todoItem;
};

function clearTodo() {
    todoContainer.innerHTML = '';
};

function appendTodo() {
    if (todoList.length) {
        todoList.forEach(element => {

            const todo = createTodo(element.id, element.text, element.isChecked);
            todoContainer.append(todo);
        });
    } else {
        todoContainer.insertAdjacentHTML('beforeend', `<p class = "noTodos">No todo</p>`);
    }
};

function render() {
    clearTodo();
    appendTodo();
    saveToLocalStorage();
};

function deleteAll() {
    todoList = [];
    render();
};

buttonDeleteAll.addEventListener('click', deleteAll);

const getDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();

    min < 10 ? (min = '0' + min) : min;
    return `${day}.${month}.${year} ${hour}:${min}`;
};

function onRestart() {

    const todos = localStorage.getItem(TODOS_KEY);

    if (todos !== null) {
        todoList = JSON.parse(todos)
    }
    render();
};

onRestart();
