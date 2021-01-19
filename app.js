
//Selectors - selecting the elements. 
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

const filterOption = document.querySelector(".filter-todo");




//Event Listeners. *Built-in javascript functions that work with elements.
document.addEventListener("DOMContentLoaded", getTodos); // when everything for page is loaded, execute getTodos.
todoButton.addEventListener("click", addTodo); // when todoButton is clicked, run addTodo function.
todoList.addEventListener("click", deleteCheck); // based on whatever element is clicked on in todoList we run deleteCheck.
filterOption.addEventListener("click", filterTodo);




//functions

function addTodo(event) {
    
    //prevent form from submitting
    event.preventDefault();
    
    //Create todoDIV
    const todoDiv = document.createElement("div"); // Create a div Element.
    todoDiv.classList.add("todo"); // Give todoDiv a class called "todo".
    
    //Create LI (for each todo)
    const newTodo = document.createElement("li"); 
    newTodo.innerText = todoInput.value; // value inputed by user into todoInput
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo); //Place newTodo(li element) inside todoDiv

    //Add todo(actual text) to localstorage. We are executing saveLocalTodos function. 
    saveLocalTodos(todoInput.value);


    // Create Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    todoDiv.appendChild(completedButton);

    // Create Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv); 

    //Clear todoInput value (Default value for todoInput)
    todoInput.value = "";
}






// e.target is whatever element is clicked on.
function deleteCheck(e){
     const item = e.target;
     
     // if the first class of the element clicked on is trash-btn
     if (item.classList[0] === 'trash-btn'){
         const todo = item.parentElement;
         todo.classList.add("fall");
         removeLocalTodos(todo);
         //wait until animation ends then executes todo.remove().
         todo.addEventListener("transitionend", function(){
            todo.remove();
         });
        
     }

     if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
}

}


function filterTodo(e){
   const todos = todoList.childNodes; // array of each "todo" div created.
    // e.target.value = value prop of element
   todos.forEach(function(todo){
       switch(e.target.value){
           case "all": 
             todo.style.display = "flex"; //add syling to div -> display: flex; to the "todo" div. Which will display the div.
             break;
           case "completed" :
               if (todo.classList.contains("completed")) {
                 todo.style.display = "flex";  // if div has class of "completed", display it.
               } else {
                 todo.style.display = "none";
               }
               break;
           case "uncompleted": 
           if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";  
          } else {
            todo.style.display = "none";
          }
          break;
       }
   });

}


function saveLocalTodos(todo) {
    let todos;

    /*check if there is todos array in local storage. 
    if there isn't, create array and store in todos.
    
    if array exists, take the array from storage and store in todos.

    Add todo to array.

    take array in todos and store it back in localstorage.
    */
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodos(){
    let todos;
    
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    todos.forEach(function(todo){
        //Create todoDIV
    const todoDiv = document.createElement("div"); // Create a div Element.
    todoDiv.classList.add("todo"); // Give todoDiv a class called "todo".
    
    //Create LI
    const newTodo = document.createElement("li"); 
    newTodo.innerText = todo; // value inputed by user into todoInput
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo); //Place newTodo(li element) inside todoDiv

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    todoDiv.appendChild(completedButton);

    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv); 
    });

    
}


function removeLocalTodos(todo){
    let todos;
    
    if (localStorage.getItem("todos") === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText; // todo here is the = todo div
    todos.splice(todos.indexOf(todoIndex), 1); // todos.indexOf(todoIndex) gives the index of todoindex. splice() removes element or elements from array. the second argument of splice(), is how many you want to remove.
    localStorage.setItem("todos", JSON.stringify(todos));
}