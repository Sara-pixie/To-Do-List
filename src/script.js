function countTasks(){
    let taskCount = document.querySelector("#task-number");
    let completedCount = document.querySelector("#completed-task-number");
    if (completedTasks.length > 0){
        completedCount.innerText = completedTasks.length;
    } else {completedCount.innerText = 0;}
    if (tasks.length > 0){
        taskCount.innerText = tasks.length;
    } else {taskCount.innerText = 0;}
}
function deleteTaskFromArray(array, task){
    for (var i = 0; i < array.length; i++){
        if (array[i] === task){
            array.splice(i, 1);
            i--;
        }
    }
}
function handleCompleted(taskId) {
    completedTasks.push(taskId);
    localStorage.setItem("completedTasks", `${completedTasks}`);
    document.querySelector(`#task${taskId}-content`).classList.add("completed");
}
function handleNotCompleated(taskId){
    let notCompletedTask = document.querySelector(`#task${taskId}-content`);
    deleteTaskFromArray(completedTasks, taskId);
    localStorage.setItem("completedTasks", completedTasks);
    notCompletedTask.classList.remove("completed");
}
function toggleChecked(event){
    this.classList.toggle("checked");
    let taskId = this.id.replace(`check`,'');
    if(this.classList.contains("checked")){
        handleCompleted(taskId);
    } else {
        handleNotCompleated(taskId);
    }
    countTasks();
}
function handleStarred(taskId){
    starredTasks.push(taskId);
    localStorage.setItem("starredTasks", `${starredTasks}`);
    document.querySelector(`#task${taskId}-content`).classList.add("starredTask");
}
function handleNotStarred(taskId){
    deleteTaskFromArray(starredTasks, taskId);
    localStorage.setItem("starredTasks", starredTasks);
    document.querySelector(`#task${taskId}-content`).classList.remove("starredTask");
}
function toggleStarred(event){
    this.classList.toggle("starred");
    let taskId = this.id.replace(`star`,'');
    if(this.classList.contains("starred")){
        handleStarred(taskId);
    } else {
        handleNotStarred(taskId);
    }
}
function createNewTask(ID){
    let content = localStorage.getItem(`${ID}`);
    let li = document.createElement("li");
    document.querySelector("#task-list").appendChild(li);
    li.innerHTML = `<button class="check" id="check${ID}"><i class="fas fa-check"></i></button><string id="task${ID}-content">${content}</string><button class="trash" id="trash${ID}"><i class="fas fa-trash-alt"></i></button><button class="star" id="star${ID}"><i class="fas fa-star"></i></button><hr />`;
    document.querySelector(`#check${ID}`).addEventListener("click", toggleChecked);
    document.querySelector(`#star${ID}`).addEventListener("click", toggleStarred);
    document.querySelector(`#trash${ID}`).addEventListener("click", deleteThisTask);
    li.setAttribute(`id`, ID);
}
function handleCreate(event){
    event.preventDefault();
    let newTask = document.querySelector("#new-task-input").value.trim();
    if (newTask.length >= 1 && newTask !== ","){
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        var ID = '_' + Math.random().toString(36).substr(2, 9);
        //Save task and id to local storage
        localStorage.setItem(`${ID}`, `${newTask}`);
        tasks.push(`${ID}`);
        localStorage.setItem("tasks", tasks);
        createNewTask(ID);
    }
    countTasks();
}
function deleteThisTask(event){
    event.preventDefault();
    let taskId = this.id.replace(`trash`,'');
    //delete task from storage
    localStorage.removeItem(`${taskId}`);
    //delete from tasks
    deleteTaskFromArray(tasks, taskId);
    localStorage.setItem("tasks", tasks);
    if(completedTasks.includes(`${taskId}`)){
        //delete from compleated tasks
        deleteTaskFromArray(completedTasks, taskId);
        localStorage.setItem("completedTasks", completedTasks);
    }
    //delete li
    let li = document.querySelector(`#${taskId}`);
    let ul = document.querySelector("#task-list");
    ul.removeChild(li);
    countTasks();
}
function deleteTasks(event){
    event.preventDefault();
    let title = localStorage.getItem("title");
    document.querySelector("#task-list").innerHTML = null;
    localStorage.clear();
    tasks = [];
    completedTasks = [];
    localStorage.setItem("title", title);
    countTasks();
}
function toggleNewTaskSection(event){
    let newStyle = "transform: rotate(45deg); transition: 200ms linear;"
    let origStyle = "transform: rotate(0deg); transition: 200ms linear;"
    let currentStyle = this.getAttribute("style");
    if(currentStyle === newStyle){
        this.setAttribute("style", `${origStyle}`);
    } else {
        this.setAttribute("style", `${newStyle}`);
    }
    let newTaskBtn = document.querySelector("#new-task-btn");
    let newTaskInput = document.querySelector("#new-task-input");
    newTaskBtn.classList.toggle("hidden");
    newTaskInput.classList.toggle("hidden");

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
            if (task === ""){
                tasks.splice(number);
            }
            if(task.length > 0) {
                createNewTask(task);
            }
        }
        if (storedCompletedTasks){
            completedTasks = storedCompletedTasks;
            completedTasks.forEach(function(completedTask){
                let id = completedTask;
                let check = document.querySelector(`#check${id}`);
                let task = document.querySelector(`#task${id}-content`);
                check.classList.add("checked");
                task.classList.add("completed");
            });
        }
        if(storedStarredTasks){
            starredTasks = storedStarredTasks;
            starredTasks.forEach(function(starredTask){
                let id = starredTask;
                let star = document.querySelector(`#star${id}`);
                let task = document.querySelector(`#task${id}-content`);
                star.classList.add("starred");
                task.classList.add("starredTask");
            });
        }
    }
}
//title
let title = null;
let storedTitle = localStorage.getItem("title");
if (storedTitle){
    title = storedTitle;
} else {
    localStorage.setItem("title", "My To-Do List");
    title = storedTitle;
}
document.querySelector("#title").innerHTML = title;
//tasks
let tasks = [];
let storedTasks = localStorage.getItem("tasks");
if (storedTasks){storedTasks = storedTasks.split(",");}
//compleated tasks
let completedTasks = [];
let storedCompletedTasks = localStorage.getItem("completedTasks");
if (storedCompletedTasks){storedCompletedTasks = storedCompletedTasks.split(",");}
//starred tasks
let starredTasks = [];
let storedStarredTasks = localStorage.getItem("starredTasks");
if (storedStarredTasks){storedStarredTasks = storedStarredTasks.split(",");}
//event listeners
document.querySelector("#plus-btn").addEventListener("click", toggleNewTaskSection);
document.querySelector("#new-task-btn").addEventListener("click", handleCreate);
document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
document.querySelector("#change-title-btn").addEventListener("click", changeTitleForm);
//run functions
createStoredTasks();
countTasks();
