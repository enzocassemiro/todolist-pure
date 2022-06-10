todoTask = document.querySelector('#task');
todoList = document.querySelector('#todo-list');
btn = document.querySelector('#button-submit');

window.addEventListener('load', () =>{
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
        todoList.innerHTML += `<div class="list--item">
                            <div class="list--checkbox">
                                <input type="checkbox" class="todo__list--checkbox--input">
                            </div>
                            <div class="list--text">
                                <input class="list--text--title" value="${todoTask.value}" readonly />
                            </div>
                        <div class="list--action">
                            <button class="list--action--edit">Edit</button>
                            <button class="list--action--delete">Delete</button>
                        </div>`;
        clearInput(todoTask);
    })
})

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
