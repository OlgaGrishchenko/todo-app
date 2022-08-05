const todoItemTemplate = document.querySelector('[data-todo-item-template]');
const todosList = document.querySelector('[data-todos-container]'); 
const inputAdd = document.querySelector('[data-input-add]');
const buttonAdd = document.querySelector('[data-button-add]');
const buttonDeleteAll = document.querySelector('[data-button-delete-all]');


let todos; 
!localStorage.todos ? todos = [] :todos = JSON.parse(localStorage.getItem('todos')); 

const updateLocal = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

buttonAdd.addEventListener('click', () => {
    const text = inputAdd.value.trim();

    const getUserTime = (date) => {
        let D = date.getDate();
        let M = date.getMonth() + 1;
        let Y = date.getFullYear();
        let H = date.getHours();
        let m = date.getMinutes();
        m < 10 ? (m = '0' + m) : m;
        return `${D}-${M}-${Y} / ${H}:${m}`;
      };

    if(text) {
        const newTodo = {
            id : todos.length + 1,
            text,
            date: getUserTime(new Date()),
        }
        todos.push(newTodo);
        inputAdd.value = '';
    }
    updateLocal();
    inputAdd.focus();
    render();
})

buttonDeleteAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    updateLocal();
    render();
})



function createTodoItem(id, text, date) {
    const todoItem = document.importNode(todoItemTemplate.content, true);
    const todoData = todoItem.querySelector('[data-todo-date]');
    todoData.textContent = `${date}`;
    const todoDescription = todoItem.querySelector('[data-todo-description]');
    todoDescription.textContent = text;
    
    const buttonDelete = todoItem.querySelector('[data-todo-button-delete]');

    buttonDelete.addEventListener('click', () => {
        todos = todos.filter(todo => todo.id !== id)
        updateLocal();
        render();
    })

    return todoItem;
}

function clearTodoList() {
    todosList.innerHTML = '';
}

function appendTodos() {
    if (todos.length) {
        todos.forEach(el => {
            const todo = createTodoItem(el.id, el.text, el.date);
            todosList.append(todo);
        })
    
    } else {
        todosList.insertAdjacentHTML('beforeend', `<p class = "noTodos"> No todos </p>` ) 
    }
    updateLocal();
}

function render() {
    clearTodoList();
    appendTodos();
}

render();
