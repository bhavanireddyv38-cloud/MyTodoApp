let input =
    document.getElementById("taskInput");

let addButton =
    document.getElementById("addButton");

let taskList =
    document.getElementById("taskList");

let clearButton = 
    document.getElementById("clearButton");

addButton.addEventListener("click", function() {
    let task = input.value;

    if (task === "") {
        return;
    }

    let li = document.createElement("li");

    li.textContent = task;

    taskList.appendChild(li);

    let deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    li.appendChild(deleteButton);

    deleteButton.style.marginLeft = " 10px";

    li.addEventListener("click", function () {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }
        localStorage.setItem ("todo", tasklist.innerHTML);
    });

    deleteButton.addEventListener("click", function () {
        li.remove();
    });
    input.value = "";

    localStorage.setItem("todo", taskList.innerHTML);
});

taskList.innerHTML = localStorage.getItem("todo") || "";

let savedButtons = taskList.querySelectorAll("button");

savedButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.parentElement.remove();
        localStorage.setItem("todo", taskList.innerHTML);
    });
});

let savedTasks = taskList.querySelectorAll("li");

savedTasks.forEach(function(li) {
    li.addEventListener("click", function() {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }
    });
});
clearButton.addEventListener("click", function() {
    taskList.innerHTML = "";
    localStorage.removeItem("todo");
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});