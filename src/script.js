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
function handleCompleted(taskId) {
    completedTasks.push(taskId);
    localStorage.setItem("completedTasks", `${completedTasks}`);
    document.querySelector(`#task${taskId}-content`).classList.add("completed");
}
function handleNotCompleated(taskId){
    let notCompletedTask = document.querySelector(`#task${taskId}-content`);
    for (var i = 0; i < completedTasks.length; i++){
        if (completedTasks[i] === taskId){
            completedTasks.splice(i, 1);
            i--;
        }
    }
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
function createNewTask(ID){
    let content = localStorage.getItem(`${ID}`);
    let li = document.createElement("li");
    document.querySelector("#task-list").appendChild(li);
    li.innerHTML = `<button class="check" id="check${ID}"><i class="fas fa-check"></i></button><string id="task${ID}-content">${content}</string><hr />`;
    document.querySelector(`#check${ID}`).addEventListener("click", toggleChecked);
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
} else {
    localStorage.setItem("title", "My To-Do List");
    title = storedTitle;
}
document.querySelector("#title").innerHTML = title;
document.querySelector("#plus-btn").addEventListener("click", toggleNewTaskSection);
document.querySelector("#new-task-btn").addEventListener("click", handleCreate);
document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
document.querySelector("#change-title-btn").addEventListener("click", changeTitleForm);
createStoredTasks();
countTasks();
