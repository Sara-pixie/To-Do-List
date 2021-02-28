function countTasks(){
    let listItems = document.querySelectorAll("li");
    if (tasks.length > 0){
        document.querySelector("#task-number").innerHTML = listItems.length+1;
    } else {document.querySelector("#task-number").innerHTML = 0;}
        //document.querySelectorAll("li").forEach();
}
function createNewTask(content){
    let li = document.createElement("li");
    document.querySelector("#task-list").appendChild(li);
    li.innerHTML = `<button class="check"><i class="fas fa-check"></button></i>${content}<hr />`;
    
}
function handleCreate(event){
    event.preventDefault();
    let newTask = document.querySelector("#new-task-input").value;
    if (newTask.length >= 1){
        tasks.push(newTask);
        countTasks();
        createNewTask(newTask);
    }
}
function deleteTasks(event){
    event.preventDefault();
    document.querySelector("#task-list").innerHTML = null;
    tasks.length = 0;
    countTasks();
}
let tasks = [];
let title = "My To-Do List";
document.querySelector("#title").innerHTML = title;
document.querySelector("#new-task-btn").addEventListener("click", handleCreate);
document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
countTasks();
