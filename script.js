document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    let dueDateInput = document.getElementById("dueDateInput");
    let dueDate = dueDateInput.value;

    if(taskText ===""){
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");
    li.innerHTML = `<span>${taskText}</span> - <small>${dueDate || "No due date"}</small>`

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "\u2714 completed";
    completeBtn.onclick = function(){
        markAsComplete(this);
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "\u270F Edit";
    editBtn.onclick = function(){
        editTask(this);
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "\u274C delete";
    deleteBtn.onclick = function(){
        removeTask(this);
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
    dueDateInputInput.value = "";
    console.log("button clicked");
}

function editTask(button){
    let li = button.parentElement;
    let currentText = li.childNodes[0].textContent;

    let input = document.createElement("input");
    input.type ="text";
    input.value = currentText;

    //Create save button
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    saveBtn.onclick = function(){
        saveEditedTask(li, input.value);
    };

    //remove previous list content and add new one
    li.innerHTML = "";
    li.appendChild(input);
    li.appendChild(saveBtn);
};

function saveEditedTask(li, newText){
    if(newText ===""){
        alert("Please enter a task");
        return;
    }

    //The new text(task)
    li.textContent = newText;

    //Re-add the buttons after saving
    let completeBtn = document.createElement("button");
    completeBtn.textContent = "\u2714 completed";
    completeBtn.onclick = function(){
        markAsComplete(this);
    };
    
    let editBtn = document.createElement("button");
    editBtn.textContent = "\u270F Edit";
    editBtn.onclick = function(){
        editTask(this);
    };
    

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "\u274C delete";
    deleteBtn.onclick = function(){
        removeTask(this);
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    saveTasks();
};

function markAsComplete(button){
    let li = button.parentElement;
    li.classList.toggle("completed");
    saveTasks();
}

function removeTask(button){
    let taskList = document.getElementById("task-list");
    taskList.removeChild(button.parentElement);
    saveTasks();
}

function saveTasks(){
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task =>{
        tasks.push({text:task.childNodes[0].textContent.trim(), completed: task.classList.contains("completed")});
    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    let savedTaks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    let li = document.createElement("li");
    li.textContent = task.text;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "\u2714 completed";
    completeBtn.onclick = function(){
        markAsComplete(this);
};

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "\u274C delete";
deleteBtn.onclick = function(){
    removeTask(this);
};

let editBtn = document.createElement("button");
editBtn.textContent = "\u270F Edit";
editBtn.onclick = function(){
    editTask(this);
};

if(task.completed){
    li.classList.add("completed");
}
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    taskList.appendChild(li);
}