const form = document.getElementById("new-todo-form")
const todoInput = document.getElementById("todo-input")
const list = document.getElementById("list")
const template = document.getElementById("list-item-template")
// Setting prefix for our keys in local storage
// It's because local storage is for all aplications if keys will get same names it could conflict with each other
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST-"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach(renderTodo)

list.addEventListener('change', e => {
    if (!e.target.matches("[data-list-item-checkbox]")) return

    // Get the todo that is clicked on
    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    const todo = todos.find(t => t.id === todoId)
    todo.complete = e.target.checked
    // Toggle the complete property to be equal to the checkbox value
    // Save our updated todo
    saveTodos()
})

list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return

    const parent = e.target.closest('.list-item')
    const todoId = parent.dataset.todoId
    parent.remove() // Delete from screen
    todos = todos.filter(todo => todo.id !== todoId)
    saveTodos()
})

// Add Todos
// User will type in todo and click add todo button.
form.addEventListener('submit', e => {
    e.preventDefault()

    const todoName = todoInput.value
    if (todoName === "") return
    const newTodo = {
        name: todoName,
        complete: false,
        id: new Date().valueOf().toString()
    }
    // Render todo
    todos.push(newTodo)
    renderTodo(newTodo)
    saveTodos()
    todoInput.value = ""
})

// This should then add the todo to the list above.

function renderTodo(todo) {
    // We are taking the template code from HTML and cloning it and it takes everything inside no matter how nested it is.
    // You can template tag to create some code in html without being read. It can be used instead of writing html-code inside js.
    const templateClone = template.content.cloneNode(true)
    const listItem = templateClone.querySelector(".list-item")
    listItem.dataset.todoId = todo.id
    const textElement = templateClone.querySelector("[data-list-item-text]")
    textElement.innerText = todo.name
    const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
    checkbox.checked = todo.complete
    list.appendChild(templateClone)
}


// Save Todos
function saveTodos() {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

// Load Todos
function loadTodos() {
    const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todosString) || []
}

// Delete Todos
// Complete Todos
