const TODO_TASK = document.querySelector('.todo__add--input');
const TODO_LIST = document.querySelector('.todo__list');
const BUTTON_SUBMIT = document.querySelector('#button-submit');

const todoItems = [];

window.addEventListener('load', e => {
    //todos = JSON.parse(localStorage.getItem('todos')) || [];
    e.preventDefault();
    console.log('Loaded');
    BUTTON_SUBMIT.addEventListener('click', e => {
        e.preventDefault();
        if (!TODO_TASK.value || TODO_TASK.value.trim() === '') {
            console.log('Empty');
            alert('Please enter a task');
            clearInput(TODO_TASK);
            return;
        }
        createTodo(TODO_TASK);
        clearInput(TODO_TASK);
    })
})

const createTodo = (element) => {
    const item = {
        id: Date.now(),
        name: element.value,
        isChecked: false
    }

    todoItems.push(item);
    console.log('todoItems:', todoItems)
    
    const itemDiv = document.createElement('div');
    const itemDivCheckBox = document.createElement('div');
    const itemDivText = document.createElement('div');
    const itemDivAction = document.createElement('div');
    const itemName = document.createElement('input');
    const itemCheckbox = document.createElement('input');
    const itemButtonEdit = document.createElement('button');
    const itemButtonDelete = document.createElement('button');

    itemDiv.classList.add('list--item');
    itemDivCheckBox.classList.add('list--checkbox');
    itemDivText.classList.add('list--text');
    itemDivAction.classList.add('list--action');
    itemName.classList.add('list--text--title');
    itemButtonEdit.classList.add('list--action--edit');
    itemButtonDelete.classList.add('list--action--delete');

    itemCheckbox.type = 'checkbox';
    itemName.type = 'text';

    itemName.value = item.name;
    itemName.readOnly = true;
    itemButtonEdit.innerHTML = "Edit";
    itemButtonDelete.innerHTML = "Delete";
    itemCheckbox.checked = item.isChecked;
    
    itemCheckbox.addEventListener('click', e => {
        setCheckBox(item);
        setInputStyle(itemCheckbox, itemName);
    })

    itemButtonEdit.addEventListener('click', e => {
        console.log('Cliclou em edit')
        console.log('Target: ', e.target)
        console.log('Posição na lista', todoItems.indexOf(item))    
    })

    itemButtonDelete.addEventListener('click', e => {
        const question = confirm('Are you sure, you want delete?')
        if (question) {
            const index = todoItems.indexOf(item);
            todoItems.splice(index, 1);
            itemDiv.remove();
            return
        }
        
    })
    
    setInputStyle(itemCheckbox, itemName);

    itemDiv.appendChild(itemDivCheckBox);
    itemDiv.appendChild(itemDivText);
    itemDiv.appendChild(itemDivAction);
    itemDivCheckBox.appendChild(itemCheckbox);
    itemDivText.appendChild(itemName);
    itemDivAction.appendChild(itemButtonEdit);
    itemDivAction.appendChild(itemButtonDelete);
    TODO_LIST.appendChild(itemDiv);

    console.log(todoItems);
    console.log(TODO_LIST);
}

const clearInput = (element) => {
    element.value = '';
}

const setCheckBox = (value) => {
    const index = todoItems.indexOf(value);
    todoItems[index].isChecked = value.isChecked;
}

const setInputStyle = (element, text) => {
    if (element.checked) {
        text.style.textDecoration = 'line-through';
        return
    }
    text.style.textDecoration = 'none';
}




