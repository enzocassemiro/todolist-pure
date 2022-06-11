todoTask = document.querySelector('#task');
todoList = document.querySelector('#todo-list');
btn = document.querySelector('#button-submit');

window.addEventListener('load', () => {
    //todos = JSON.parse(localStorage.getItem('todos')) || [];
    console.log('Loaded');
    console.log(todoTask);
    
    btn.addEventListener('click', e =>{
        e.preventDefault();
        if (!todoTask.value || todoTask.value.trim() === '') {
            console.log('Empty');
            alert('Please enter a task');
            clearInput(todoTask);
            return;
        }
        console.log('Submitted');
        console.log(todoTask.value);
        todoList.innerHTML += `
        <div class="list--item">
            <div class="list--checkbox">
                <input type="checkbox" id="teste" class="todo__list--checkbox--input">
            </div>
            <div class="list--text">
                <input class="list--text--title" value="${todoTask.value}" readonly />
            </div>
            <div class="list--action">
                <button class="list--action--edit">Edit</button>
                <button class="list--action--delete">Delete</button>
            </div>
        </div>`;
        checkbox = document.querySelector('#teste');
        console.log(checkbox);
        console.log(checkbox.checked);
        clearInput(todoTask.value);
    })
})

const setCheckBox = () => {
    // evento de click no checkbox
    // text-decoration: line-through;
    checkbox = document.querySelector('#teste');
    checkbox.addEventListener('click', e => {
        console.log(e.target.checked);
        if (e.target.checked) {
            e.target.parentElement.parentElement.classList.add('completed');
        } else {
            e.target.parentElement.parentElement.classList.remove('completed');
        }
    }
    )
}

const clearInput = (element) => {
    element.value = '';
}

const createTodo = () => {
    const todo = {
        title: todoTask.value,
        completed: false
    }
    return todo;
}
