document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();

    if(taskText ===""){
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");
    li.textContent = taskText;

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

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
    console.log("button clicked");
}

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

if(task.completed){
    li.classList.add("completed");
}
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}