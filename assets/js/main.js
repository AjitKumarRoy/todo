// Load Todos from localStorage when the page loads
window.onload = function () {
    loadTodos();
    
}


initializeTodos();

// add demo todos to local storage
function initializeTodos() {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (existingTodos.length === 0) {
        saveTodos('<a href="https://www.linkedin.com/in/ajitroyofficial/" target="_blank">Created by Ajit</a>');
        saveTodos('<a href="https://github.com/AjitKumarRoy" target="_blank">Visit my Github</a>');
    }
}


// function to load todos from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    console.log(todos);
    const parentElement = document.getElementById('todos');

    // check how many todos are there already on the page
    const index = document.querySelectorAll('div span.counter').length;

    for (let i = 0; i < todos.length; i++) {
        const todoContent = todos[i];
        const createDiv = document.createElement('div');
        const todoCounter = i + 1 + index;
        createDiv.setAttribute('id', 'todo-' + (todoCounter));
        createDiv.setAttribute('class', 'todo-item');

        createDiv.innerHTML = `
        <h4>
            <span class="counter">${todoCounter}</span>
            <span class="separator">. </span>
            <span class="content">${todoContent}</span>
        </h4> 
        <div class="buttons">
            <button class="deleteButton" onclick=" deleteTodo(${todoCounter}) "><i class="fa-solid fa-trash"></i></button> 
            <button class="editButton"><i class="fa-solid fa-pen-to-square"></i></button> 
        </div>
        `;

        const parentElement = document.getElementById('todos');
        parentElement.appendChild(createDiv);
    }
}




//function to save todos to local storage
function saveTodos(todoContent) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoContent);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//function to remove a todo from local storage
function removeTodo(index) {
    //remove the todo from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index - 1, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);

    // Update the counters of remaining todos
    const remainingTodos = document.querySelectorAll('#todos > div');

    for (let index = 0; index < remainingTodos.length; index++) {
        const todo = remainingTodos[index]; // Get the current todo item
        const counterElement = todo.querySelector('.counter');
        counterElement.textContent = index + 1; // Update the counter text
        todo.setAttribute('id', 'todo-' + (index + 1)); // Update the todo ID
        const deleteButton = todo.querySelector('.deleteButton');
        deleteButton.setAttribute('onclick', `deleteTodo(${index + 1})`); // Update the delete button's onclick
    }
}




//Add Todo

function addTodo() {
    //fetch the data from input field
    const inputElement = document.querySelector('.input-todo');
    const todoContent = inputElement.value.trim();
    console.log(todoContent);

    //check if the input field is empty
    if (todoContent === '') {
        alert('Please enter a todo item.');
        return;
    }

    // Add the new todo to localStorage
    saveTodos(todoContent);

    //fetch the counter
    let todoCounter = 0;

    if (document.querySelectorAll('div span.counter').length === 0) {
        todoCounter = 1;
    } else {
        const fetchCounter = document.querySelectorAll('div span.counter').length;
        console.log(fetchCounter);

        todoCounter = fetchCounter + 1;
    }

    console.log(todoCounter);

    //create the todo item
    const todoItem = document.createElement('div');
    todoItem.setAttribute('id', 'todo-' + todoCounter);
    todoItem.setAttribute('class', 'todo-item');

    todoItem.innerHTML = `
    <h4>
            <span class="counter">${todoCounter}</span>
            <span class="separator">. </span>
            <span class="content">${todoContent}</span>
    </h4> 
    <div class="buttons">
        <button class="deleteButton" onclick=" deleteTodo(${todoCounter}) "><i class="fa-solid fa-trash"></i></button> 
        <button class="editButton"><i class="fa-solid fa-pen-to-square"></i></button> 
    </div>
    `;

    console.log(todoItem);


    //append the todo item to the parent element

    const parentElement = document.getElementById('todos');
    parentElement.appendChild(todoItem);


    //clear the input field
    inputElement.value = '';
}




//Delete Todo

function deleteTodo(number) {
    const todoItem = document.getElementById('todo-' + number);
    todoItem.parentNode.removeChild(todoItem);


    // remove the todo from localStorage
    removeTodo(number);

}

