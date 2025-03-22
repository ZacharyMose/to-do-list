document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    let dueDateInput = document.getElementById("dueDateInput");
    let categoryInput = document.getElementById("category-input");

    let dueDate = dueDateInput.value;
    let category = categoryInput.value;

    if(taskText ===""){
        alert("Please enter a task");
        return;
    }

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");
    li.innerHTML = `<span>${taskText}</span> - <small>${dueDate || "No due date"}</small> <strong>${category}</strong>`;

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
    dueDateInput.value = "";
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

function filterTasks(){
    let searchText = document.getElementById("search-input").value.toLoweCase();
    let categoryFilter = document.getElementById("category-input").value;
    let dateFilter = document.getElementById("date-filter").value;
    let today = new Date().toISOString().split("T")[0];// get today's date

    document.querySelectorAll("#task-list li").forEach(task =>{
        let text = task.querySelector("span")?.textContent || "";
        let dueDate = task.querySelector("small")?.textContent || "No due date";
        let category = task.querySelector("strong")?.textContent || "Other";
        let taskDate = new Date(dueDate).toISOString().split("T")[0];

        let matchesSearch = taskText.includes(searchText);
        let matchesCategory = categoryFilter ==="" || category === categoryFilter;
        let matchesDate = true;

        if(dateFilter ==="today"){
            matchesDate = taskDate === today;
        }

        else if(dateFilter === "week"){
            let weekFromNow = new Date();
            weekFromNow.setDate(weekFromNow.getDate() + 7);
            matchesDate = new Date(taskDate) >= new Date(today) && new Date(taskDate) <= weekFromNow;
        }

        else if(dateFilter === "overdue"){
            matchesDate = new Date(taskDate) < new Date(today);
        }

        if(matchesCategory && matchesDate && matchesSearch){
            task.style.display = "";
        }

        else{
            task.style.display = "none";
        }
    });
}

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
    let taskListItems = document.querySelectorAll("#task-list li");
    console.log("found tasks", taskListItems);
  let tasks = [];
  document.querySelectorAll("task-list li").forEach(task => {
    let text = task.querySelector("span")?.textContent || "";
    let dueDate = task.querySelector("small")?.textContent || "No due date";
    let category = task.querySelector("strong")?.textContent || "Other";
    let isCompleted = task.classList.contains("completed");

    tasks.push({text,dueDate,category, completed:isCompleted});
  });

  console.log(document.querySelectorAll("#task-list li"))
  console.log("Tasks to be saved", tasks);
  console.log("Tasks to be saved", JSON.stringify(tasks));
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    console.log("saded tasks",localStorage.getItem("tasks"));
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    savedTasks.forEach(task =>{
        let li = document.createElement("li");
        li.innerHTML = `<span>${taskText}</span> - <small>${dueDate || "No due date"}</small> <strong>${category}</strong>`;

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
    });

}

document.getElementById("search-input").addEventListener("input", filterTasks);
document.getElementById("category-filter").addEventListener("change", filterTasks);
document.getElementById("date-filter").addEventListener("change", filterTasks);
