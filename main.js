todoTask = document.getElementById('task');
btn = document.getElementById('button-submit');

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
        clearInput(todoTask);
    })
})



const clearInput = (element) => {
    element.value = '';
}