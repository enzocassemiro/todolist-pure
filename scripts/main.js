const TODO_TASK = document.querySelector('.todo__add--input');
const TODO_LIST = document.querySelector('.todo__list');
const BUTTON_SUBMIT = document.querySelector('#button-submit');
const LIGHT_SCHEME_ICON = document.querySelector('link#light-scheme-icon');
const DARK_SCHEME_ICON = document.querySelector('link#dark-scheme-icon');

const todoItems = [];

matcher = window.matchMedia('(prefers-color-scheme: dark)');
matcher.addListener(onUpdate);
onUpdate();

function onUpdate() {
    if (matcher.matches) {
        LIGHT_SCHEME_ICON.remove();
        document.head.append(DARK_SCHEME_ICON);
    } else {
        document.head.append(LIGHT_SCHEME_ICON);
        DARK_SCHEME_ICON.remove();
    }
}

window.addEventListener('load', e => {
    e.preventDefault();
    BUTTON_SUBMIT.addEventListener('click', e => {
        e.preventDefault();
        if (!TODO_TASK.value || TODO_TASK.value.trim() === '') {
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
        taskValue: element.value,
        isChecked: false,
        readOnly: true,
    }

    todoItems.push(item);

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

    itemCheckbox.checked = item.isChecked;
    itemName.readOnly = item.readOnly;
    itemName.value = item.taskValue;
    itemButtonEdit.innerHTML = "Edit";
    itemButtonDelete.innerHTML = "Delete";

    itemCheckbox.addEventListener('click', e => {
        setCheckBox(item);
        setInputStyle(itemCheckbox, itemName);
    })
    
    itemButtonEdit.addEventListener('click', e => {
        if (itemName.style.textDecoration == 'none') {
            if (itemButtonEdit.innerHTML == 'Edit') {
                itemButtonEdit.innerHTML = 'Save'
                itemButtonEdit.style.color = '#0fd916';
            } else {
                itemButtonEdit.innerHTML = 'Edit'
                itemButtonEdit.style.color = '#ffff';
            }
            
            item.readOnly = !item.readOnly
            itemName.readOnly = item.readOnly
            item.taskValue = itemName.value 
        }
        else alert('You cannot edit a completed task')
    })

    itemButtonDelete.addEventListener('click', e => {
        const question = confirm('Do you really want to delete this task?')
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
        text.style.color = '#696169';
        return
    }
    text.style.textDecoration = 'none';
    text.style.color = '#E0DDE3';
}
