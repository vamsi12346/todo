document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = [];

    // Function to add a new task
    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks(tasks);
    }

    // Function to toggle task completion
    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        renderTasks(tasks);
    }

    // Function to delete a task
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks(tasks);
    }

    // Function to edit a task
    function editTask(taskId) {
        const newTaskText = prompt('Edit your task:');
        if (newTaskText) {
            tasks = tasks.map(task =>
                task.id === taskId ? { ...task, text: newTaskText } : task
            );
            renderTasks(tasks);
        }
    }

    // Function to filter tasks
    function filterTasks(filter) {
        let filteredTasks = [];
        if (filter === 'all') {
            filteredTasks = tasks;
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        }
        renderTasks(filteredTasks);
    }

    // Function to render tasks
    function renderTasks(taskArray) {
        taskList.innerHTML = '';
        taskArray.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">Complete</button>
                    <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Event listeners
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.dataset.filter);
        });
    });

    // Initial render
    filterTasks('all');
});
