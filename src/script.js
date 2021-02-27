function countTasks(){
    let listitems = document.querySelectorAll("li");
    document.querySelector("#task-number").innerHTML = listitems.length;
    //document.querySelectorAll("li").forEach();
}
function createNewTask(event){
    event.preventDefault();
    let newTask = document.querySelector("#new-task-input").value;
    if (newTask.length >= 1){
        let li = document.createElement("li");
        document.querySelector("#task-list").appendChild(li);
        li.innerHTML = newTask;
    }
    countTasks();
}
function deleteTasks(event){
    event.preventDefault();
    document.querySelector("#task-list").innerHTML = null;
    countTasks();
}
localStorage.setItem("title", "My To-Do List");
document.querySelector("#title").innerHTML = localStorage.getItem("title");
document.querySelector("#new-task-btn").addEventListener("click", createNewTask);
document.querySelector("#delete-btn").addEventListener("click", deleteTasks);
countTasks();
