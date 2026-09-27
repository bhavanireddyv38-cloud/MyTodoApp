let input =
    document.getElementById("taskInput");

let addButton =
    document.getElementById("addButton");

let taskList =
    document.getElementById("taskList");

let clearButton =
    document.getElementById("clearButton");

let showAllButton =
    document.getElementById("showAllButton");

let pendingButton =
    document.getElementById("pendingButton");

let completedButton =
    document.getElementById("completedButton");



function saveTasks() {
    localStorage.setItem("todo", taskList.innerHTML);
}


function addTask(task) {

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);

    let taskText = document.createElement("span");
    taskText.textContent = task;

    li.appendChild(taskText);

    checkbox.addEventListener("change", function() {

    if (checkbox.checked) {
        li.style.textDecoration = "line-through";
    } else {
        li.style.textDecoration = "none";
    }

    saveTasks();
});


    // Edit button
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.marginLeft = "10px";

    li.appendChild(editButton);


    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";

    li.appendChild(deleteButton);


    // Complete / incomplete task
    li.addEventListener("click", function(event) {

        if (event.target === taskText) {

            if (li.style.textDecoration === "line-through") {
                li.style.textDecoration = "none";
            } else {
                li.style.textDecoration = "line-through";
            }

            saveTasks();
        }
    });


    // Edit button
    editButton.addEventListener("click", function(event) {

        event.stopPropagation();

        let editInput = document.createElement("input");

        editInput.type = "text";
        editInput.value = taskText.textContent;

        li.replaceChild(editInput, taskText);

        editButton.textContent = "Save";


        editButton.onclick = function(event) {

            event.stopPropagation();

            if (editInput.value.trim() !== "") {

                taskText.textContent = editInput.value;

                li.replaceChild(taskText, editInput);

                editButton.textContent = "Edit";

                saveTasks();
            }
        };
    });


    // Delete button
    deleteButton.addEventListener("click", function(event) {

        event.stopPropagation();

        li.remove();

        saveTasks();
    });


    taskList.appendChild(li);

    saveTasks();
}


// Add Task
addButton.addEventListener("click", function() {

    let task = input.value.trim();

    if (task === "") {
        return;
    }

    addTask(task);

    input.value = "";
});


// Clear All
clearButton.addEventListener("click", function() {

    taskList.innerHTML = "";

    localStorage.removeItem("todo");
});


// Enter key
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addButton.click();
    }
});

showAllButton.addEventListener("click",function()
{

    let tasks=taskList.querySelectorAll("li");

    tasks.forEach(function(task){
        task.style.display="list-item";
    });

});

pendingButton.addEventListener("click",function(){

    let tasks=taskList.querySelectorAll("li");

    tasks.forEach(function(task){

        let checkbox=task.querySelector("input");

        if (checkbox.checked){
            task.style.display="none";
        }else{
            task.style.display="list-item";
        }
    });
});

completedButton.addEventListener("click",function(){

    let tasks = taskList.querySelectorAll("li");

    tasks.forEach(function(task){

        let checkbox=task.querySelector("input");

        if(checkbox.checked){
            task.style.display="list-item";
        }else{
            task.style.display="none";
        }
    });
});