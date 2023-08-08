
let numOfActiveTasks = 0;
let totalDisp = document.getElementById('taskTotal')
let tasksHolderDiv = document.getElementById('tasks')
let taskNameFld = document.getElementById("taskNameFld")
let addTaskBtn = document.getElementById("addTaskBtn")
addTaskBtn.addEventListener('click', addTask)

function addTask()
{
    let taskName = taskNameFld.value

    if(taskName !== '')
    {
        let parentDiv = document.createElement('div');
        let taskTitle = document.createElement('h2');
        let taskCompleteBtn = document.createElement('button');

        taskTitle.classList.add('taskElement')
        taskTitle.textContent = taskName
        taskCompleteBtn.classList.add('taskElement')
        taskCompleteBtn.textContent = "Remove"

        parentDiv.appendChild(taskTitle)
        parentDiv.appendChild(taskCompleteBtn)

        parentDiv.classList.add('task')
        tasksHolderDiv.appendChild(parentDiv)

        taskCompleteBtn.addEventListener('click', ()=>{removeTask(parentDiv)})

        taskTotal.textContent = 'Total tasks = ' + ++numOfActiveTasks
        taskNameFld.value = ''
    }
}

function removeTask(parent)
{
    tasksHolderDiv.removeChild(parent)
    taskTotal.innerHTML = 'Total tasks = ' + --numOfActiveTasks
}



