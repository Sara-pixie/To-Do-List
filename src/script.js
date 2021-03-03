function countTasks(){
    if (completedTasks.length > 0){
        document.querySelector("#completed-task-number").innerHTML = completedTasks.length;
        localStorage.setItem("completedTasks", completedTasks.toString());
    } else {document.querySelector("#completed-task-number").innerHTML = 0;}
    if (tasks.length > 0){
        document.querySelector("#task-number").innerHTML = tasks.length;
        localStorage.setItem("tasks", tasks.toString());
        return tasks.length;
    } else {document.querySelector("#task-number").innerHTML = 0;}
}
function handleCompleted(event) {
    this.classList.add("checked");
    let number = this.id.replace(`check-`,'');
    let completedTask = document.querySelector(`#task-${number}-content`);
    completedTasks.push(`${number}`);
    completedTask.classList.add("completed");
    countTasks();
}
function createNewTask(content, number){
    let li = document.createElement("li");
    document.querySelector("#task-list").appendChild(li);
    li.innerHTML = `<button class="check" id="check-${number}"><i class="fas fa-check"></i></button><string id="task-${number}-content">${content}</string><hr />`;
    let identity = `task-${number}`;
    li.setAttribute(`id`, identity);
    document.querySelector(`#check-${number}`).addEventListener("click", handleCompleted);
}
function handleCreate(event){
    event.preventDefault();
    let newTask = document.querySelector("#new-task-input").value.trim();
    if (newTask.length >= 1){
        tasks.push(`${newTask}`);
        let taskNumber = countTasks();
        createNewTask(newTask, taskNumber);
    }
}
function deleteTasks(event){
    event.preventDefault();
    document.querySelector("#task-list").innerHTML = null;
    tasks.length = 0;
    localStorage.removeItem("tasks");
    completedTasks.length = 0;
    localStorage.removeItem("completedTasks");
    countTasks();
}
function collapseNewTaskSection(event){
    document.querySelector("#new-task-section").innerHTML =
    `<button class="plusBtn" id="plus-btn"><i class="fas fa-plus"></i></button>
    Create a new task
    <button class="btn btn-danger" id="delete-btn" data-bs-toggle="tooltip" container="newTaskSection" title="This will delete ALL created tasks!">Delete All</button>`;
    document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
    document.querySelector("#plus-btn").removeEventListener("click", collapseNewTaskSection);
    document.querySelector("#plus-btn").addEventListener("click", uncollapseNewTaskSection);
}
function uncollapseNewTaskSection(event){
    document.querySelector("#new-task-section").innerHTML =
    `<button class="plusBtn" id="plus-btn"><i class="fas fa-plus"></i></button>
    Create a new task
    <button class="btn btn-danger" id="delete-btn" data-bs-toggle="tooltip" container="newTaskSection" title="This will delete ALL created tasks!">Delete All</button>
    <input type="text" id="new-task-input" class="form-control" autocomplete="off" placeholder="New Task">
    To create multiple tasks at once seperate them with commas, click "Create new" button and refresh your page.<br />(This actually wasn't done on purpose.)<br />
    <button class="btn btn-primary" id="new-task-btn">Create New</button>`;
    document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
    document.querySelector("#new-task-btn").addEventListener("click", handleCreate);
    document.querySelector("#plus-btn").removeEventListener("click", uncollapseNewTaskSection);
    document.querySelector("#plus-btn").addEventListener("click", collapseNewTaskSection);
}
function changeTitle(event){
    let newTitle = document.querySelector("#change-title-input").value;
    if (newTitle.length > 0){
        localStorage.setItem("title", `${newTitle}`);
        title = localStorage.getItem("title");
    } else {
        localStorage.setItem("title", "My To-Do List");
        title = localStorage.getItem("title");
    }
    document.querySelector("#title-section").innerHTML =
    `<h1 class="title" id="title">${title}</h1>
    <button class="changeTitle" id="change-title-btn" data-bs-toggle="tooltip" container="titleSection" title="Change your list title"><i class="fas fa-pencil-alt"></i></button>`;
    document.querySelector("#change-title-btn").addEventListener("click", changeTitleForm);
}
function changeTitleForm(event){
    document.querySelector("#title-section").innerHTML =
    `<input type="text" class="form-control changeTitleInput" id="change-title-input" autocomplete="off" placeholder="My To-Do List">
    <button class="confirm" id="confirm-title"><i class="fas fa-check"></i></button>`;
    document.querySelector("#confirm-title").addEventListener("click", changeTitle);
}
function createStoredTasks(){
    if (storedTasks){
        tasks = storedTasks;
        for (let number = 0; number <= tasks.length-1; number++){
            let task = tasks[number].trim();
            createNewTask(task, number+1);
        }
        if (storedCompletedTasks){
            completedTasks = storedCompletedTasks;
            completedTasks.forEach(function(completedTask){
                let idNumber = completedTask;
                let check = document.querySelector(`#check-${idNumber}`);
                let task = document.querySelector(`#task-${idNumber}-content`);
                check.classList.add("checked");
                task.classList.add("completed");
            });
        }
    }
}
let title = null;
let tasks = [];
let completedTasks = [];
let storedTasks = localStorage.getItem("tasks");
if (storedTasks){storedTasks = storedTasks.split(",");}
let storedCompletedTasks = localStorage.getItem("completedTasks");
if (storedCompletedTasks){storedCompletedTasks = storedCompletedTasks.split(",");}
let storedTitle = localStorage.getItem("title");
if (storedTitle){
    title = storedTitle;
} else {localStorage.setItem("title", "My To-Do List");}
document.querySelector("#title").innerHTML = title;
document.querySelector("#plus-btn").addEventListener("click", uncollapseNewTaskSection);
document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
document.querySelector("#change-title-btn").addEventListener("click", changeTitleForm);
createStoredTasks();
countTasks();
