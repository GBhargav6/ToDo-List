let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskPriority = document.getElementById('taskPriority');

    if (taskInput.value === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        text: taskInput.value,
        dueDate: taskDueDate.value,
        priority: taskPriority.value
    };

    tasks.push(task);
    displayTasks();
    clearInputFields();
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskDetails = taskItem.querySelector('span').innerText;

    const taskInput = document.getElementById('taskInput');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskPriority = document.getElementById('taskPriority');

    const [taskText, taskInfo] = taskDetails.split(' (Due: ');
    const [dueDate, priority] = taskInfo.split(', Priority: ');
    const cleanedPriority = priority.slice(0, -1); // remove trailing )

    taskInput.value = taskText;
    taskDueDate.value = dueDate;
    taskPriority.value = cleanedPriority;

    // Remove the task from the array and update the display
    tasks = tasks.filter(task => task.text !== taskText || task.dueDate !== dueDate || task.priority !== cleanedPriority);
    displayTasks();
}

function markCompleted(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskDetails = taskItem.querySelector('span').innerText;

    const [taskText, taskInfo] = taskDetails.split(' (Due: ');
    const [dueDate, priority] = taskInfo.split(', Priority: ');
    const cleanedPriority = priority.slice(0, -1); // remove trailing )

    // Remove the task from the array and update the display
    tasks = tasks.filter(task => task.text !== taskText || task.dueDate !== dueDate || task.priority !== cleanedPriority);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Sort tasks by due date
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.text} (Due: ${task.dueDate}, Priority: ${task.priority})</span>
            <div>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="markCompleted(this)">Complete</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function clearInputFields() {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskPriority').value = 'Low';
}
