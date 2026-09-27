let input = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let clearButton = document.getElementById("clearButton");

let showAllButton = document.getElementById("showAllButton");
let pendingButton = document.getElementById("pendingButton");
let completedButton = document.getElementById("completedButton");

let menuButton = document.getElementById("menuButton");
let menuOptions = document.getElementById("menuOptions");


// Load saved tasks safely
let tasks = [];

try {
    let savedTasks = localStorage.getItem("todo");

    if (savedTasks) {
        let data = JSON.parse(savedTasks);

        if (Array.isArray(data)) {
            tasks = data;
        }
    }
} catch (error) {
    tasks = [];
}


// Save tasks
function saveTasks() {
    localStorage.setItem("todo", JSON.stringify(tasks));
}


// Display tasks
function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        // Filter
        if (filter === "pending" && task.completed) {
            return;
        }

        if (filter === "completed" && !task.completed) {
            return;
        }


        let li = document.createElement("li");


        // Checkbox
        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        li.appendChild(checkbox);


        // Task text
        let taskText = document.createElement("span");

        taskText.textContent = task.text;

        taskText.style.marginLeft = "5px";

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        li.appendChild(taskText);


        // Checkbox action
        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
            } else {
                taskText.style.textDecoration = "none";
            }

            saveTasks();
        });


        // Edit button
        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.style.marginLeft = "10px";

        li.appendChild(editButton);


        editButton.addEventListener("click", function() {

            if (editButton.textContent === "Edit") {

                let editInput = document.createElement("input");

                editInput.type = "text";
                editInput.value = task.text;

                li.replaceChild(editInput, taskText);

                editButton.textContent = "Save";

            } else {

                let newText = li.querySelector("input[type='text']").value.trim();

                if (newText !== "") {

                    task.text = newText;

                    saveTasks();

                    displayTasks();
                }
            }
        });


        // Delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";

        li.appendChild(deleteButton);


        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();
        });


        taskList.appendChild(li);
    });
}


// Add Task
addButton.addEventListener("click", function() {

    let taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    displayTasks();

    input.value = "";
});


// Enter key
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addButton.click();
    }
});


// Clear All
clearButton.addEventListener("click", function() {

    tasks = [];

    saveTasks();

    displayTasks();
});


// Show All
showAllButton.addEventListener("click", function() {
    displayTasks("all");
});


// Pending
pendingButton.addEventListener("click", function() {
    displayTasks("pending");
});


// Completed
completedButton.addEventListener("click", function() {
    displayTasks("completed");
});


// Menu
menuButton.addEventListener("click", function() {

    if (menuOptions.style.display === "block") {
        menuOptions.style.display = "none";
    } else {
        menuOptions.style.display = "block";
    }
});


// Display saved tasks when page opens
displayTasks();