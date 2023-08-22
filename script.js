// Find all important ELement 
let form = document.querySelector(".form")
let input = document.querySelector("#input");
let todoButton = document.querySelector(".addTodoButton");
let todoLists = document.querySelector(".lists");
let message = document.querySelector(".message");


// find the input form valu 
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let inputValue = input.value;
    // unic id generate
    let unicId = Date.now().toString();
    addTodo(inputValue,unicId);
    const todos = FromLocalStorage();
    todos.push({inputValue,unicId});
    localStorage.setItem("method",JSON.stringify(todos));
    input.value = "";
});
//Add todos from Local Storage 
FromLocalStorage = ()=>{
    return localStorage.getItem("method") ? JSON.parse(localStorage.getItem("method")) : [];
    
};

// Create add todo method 
const addTodo = (inputValue,unicId)=>{
    let li = document.createElement("li");
    li.id = unicId;
    li.classList.add("listStyle");
    li.innerHTML = `<span>${inputValue}</span><span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>`
    todoLists.appendChild(li);
    ShowMessage("Todo is added","success");

    let deleteButton = li.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deletefunction);
};
//Show  message method 
const ShowMessage = (text , status) =>{
    message.innerHTML=`Todo is ${text}`;
    message.classList.add(status);
    setTimeout(() => {
        message.innerHTML=" ";
        message.classList.remove(status);
    }, 1100);
};
//delete a todo form local storage
const deletefunction = (event) => {
    const parentElement = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(parentElement);
    ShowMessage("Todo is Deleted", "danger");
    const deleteTodoId = parentElement.id;
    let todos = FromLocalStorage();
    todos = todos.filter((todo) => todo.unicId != deleteTodoId);
    localStorage.setItem("method", JSON.stringify(todos));
};

//This Eventlistener loaded to show from local storage to my todo app 
window.addEventListener("DOMContentLoaded", () => {
    let todos = FromLocalStorage();
    todos.forEach((todo) => {
        addTodo(todo.inputValue, todo.unicId);
    });
});
