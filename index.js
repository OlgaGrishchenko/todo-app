const TODOS_KEY = 'todos';

const inputTodoAdd = document.querySelector('[data-input-add]');
const buttonAdd = document.querySelector('[data-button-add]');
const todoItemTemplate = document.querySelector('[data-todo-item-template]');
const todoContainer = document.querySelector('[data-todo-container]');
const buttonDeleteAll = document.querySelector('[data-button-delete-all]');
const inputAdd = document.querySelector('[data-input-add]');

const inputSearch = document.querySelector('[data-input-search]');

const taskActive = document.querySelector('[data-counter-active-span]');
const taskCompleted = document.querySelector('[data-counter-completed-span]');

function saveToLocalStorage() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
};

let todoList = [];
let filteredTodoList = [];

function addTodo() {
    {
        const inputValue = inputTodoAdd.value.trim();

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
    }
};

buttonAdd.addEventListener('click', () =>
    addTodo()
);

inputAdd.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addTodo()
    }
});

function createTodo(id, text, isChecked, date) {
    const todoItem = document.importNode(todoItemTemplate.content, true);
    const todoItemText = todoItem.querySelector('[data-todo-text]');

    todoItemText.textContent = text;

    const buttonTodoDelete = todoItem.querySelector('[data-todo-button-delete]');
    buttonTodoDelete.addEventListener('click', deleteTodoItem);

    const todoDate = todoItem.querySelector('[data-todo-date]');
    todoDate.textContent = date;

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
        taskActive.textContent = calcActive();
        taskCompleted.textContent = calcCompleted();
    });

    return todoItem;
};

function clearTodo() {
    todoContainer.innerHTML = '';
};

function appendTodo() {
    if (todoList.length) {
        todoList.forEach(element => {

            const todo = createTodo(element.id, element.text, element.isChecked, element.date);
            todoContainer.append(todo);
        });
    } else {
        todoContainer.insertAdjacentHTML('beforeend', `<p class = "noTodos">No todos</p>`);
    }
};

function render() {
    clearTodo();
    appendTodo();
    saveToLocalStorage();
    taskActive.textContent = calcActive();
    taskCompleted.textContent = calcCompleted();
};

function deleteAll() {
    todoList = [];
    render();
};

buttonDeleteAll.addEventListener('click', deleteAll);

const getDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();

    min < 10 ? (min = '0' + min) : min;
    day < 10 ? (day = '0' + day) : day;
    month < 10 ? (month = '0' + month) : month;
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

function calcCompleted() {
    return todoList.filter((value) => value.isChecked === true).length;
};

function calcActive() {
    return todoList.filter((value) => value.isChecked === false).length;
};

inputSearch.addEventListener('input', () => {
    const valueSearch = inputSearch.value.toLowerCase();
    const valueOfTodo = Array.from(document.querySelectorAll('.todo__text'));
    for (value of valueOfTodo) {
        const textValueFromTodo = value.innerHTML.toLowerCase();
        if (textValueFromTodo.includes(valueSearch)) {
            value.parentElement.style.display = 'flex';
        } else { value.parentElement.style.display = 'none'; }
    }
});

//clock
const clock = document.querySelector('[data-clock]');

const updateClock = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    const b = clock.children;

    b[0].textContent = hours;
    b[1].textContent = minutes;
    b[2].textContent = seconds;
};

updateClock();

setInterval(() => {
    updateClock();
}, 1000);