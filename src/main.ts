const TODO_TASK  = document.querySelector('.todo__add--input') as HTMLInputElement;
const TODO_LIST = document.querySelector('.todo__list') as HTMLElement;
const BUTTON_SUBMIT  = document.querySelector('#button-submit') as HTMLElement;

const todoItems: Object[] = [];

window.addEventListener('load', (): void => {
    renderLocalStorage();

    BUTTON_SUBMIT?.addEventListener('click', (e) => {
        e.preventDefault();

        if (!TODO_TASK.value || TODO_TASK.value.trim() === '') {
            alert('Please enter a TASK');
            clearInput(TODO_TASK);
            return;
        }
        createTodo();
        clearInput(TODO_TASK);
    })
})

const renderLocalStorage = (): void => {
    Object.keys(localStorage).forEach(function (element) {
        const elementObject = JSON.parse(localStorage.getItem(element)!) as itemInterface;
        renderTodo(elementObject);
        todoItems.push(elementObject);
    });
}

const createTodo = (): void => {
        
        const item: itemInterface = {
            id: Date.now(),
            taskValue: TODO_TASK.value,
            isChecked: false,
            readOnly: true,
        }

        todoItems.push(item);
        window.localStorage.setItem(String(item.id), JSON.stringify(item));
        renderTodo(item);
}

const clearInput = (element: HTMLInputElement): void => {
        element.value = '';
}

interface itemInterface {
    id: number,
    taskValue: string,
    isChecked: boolean,
    readOnly: boolean
}

const renderTodo = (item: itemInterface) => {
    const itemDiv = document.createElement('div') as HTMLDivElement;
    const itemDivCheckBox = document.createElement('div') as HTMLDivElement;
    const itemDivText = document.createElement('div') as HTMLDivElement;
    const itemDivAction = document.createElement('div') as HTMLDivElement;
    const itemName = document.createElement('input') as HTMLInputElement;
    const itemCheckbox = document.createElement('input') as HTMLInputElement;
    const itemButtonEdit = document.createElement('button') as HTMLButtonElement;
    const itemButtonDelete = document.createElement('button') as HTMLButtonElement;

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

    doneTask(itemCheckbox, item, itemName);

    editTask(itemButtonEdit, itemName, item );

    deleteTask(itemButtonDelete, itemDiv, item);

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

const doneTask = (itemCheckbox: HTMLInputElement, item: itemInterface, itemName: HTMLInputElement) => {
    itemCheckbox.addEventListener('click', e => {
        setCheckBox(item);
        setInputStyle(itemCheckbox, itemName);
    })
}

const setCheckBox = (value: itemInterface) => {
    value.isChecked = !value.isChecked;
    window.localStorage.setItem(String(value.id), JSON.stringify(value));
}

const setInputStyle = (element: HTMLInputElement, text: HTMLInputElement) => {
    if (element.checked) {
        text.style.textDecoration = 'line-through';
        text.style.color = '#696169';
        return
    }
    text.style.textDecoration = 'none';
    text.style.color = '#E0DDE3';
}

const editTask = (itemButtonEdit: HTMLButtonElement, itemName:HTMLInputElement, item:itemInterface) => {
    itemButtonEdit.addEventListener('click', () => {
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
            window.localStorage.setItem(String(item.id), JSON.stringify(item));
        }
        else alert('You cannot edit a completed task')
    })
}

const deleteTask = (itemButtonDelete: HTMLButtonElement, itemDiv: HTMLDivElement, item: itemInterface) => {
    itemButtonDelete.addEventListener('click', e => {
        const question = confirm('Do you really want to delete this task?');
        if (question) {
            const index = todoItems.indexOf(item);
            todoItems.splice(index, 1);
            itemDiv.remove();
            window.localStorage.removeItem(String(item.id));
        }
    })
}