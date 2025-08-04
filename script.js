document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load existing tasks from Local Storage when page loads
    loadTasks();

    // Add event listeners
    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, true); // true means save to Local Storage
            taskInput.value = ''; // Clear input field
        }
    });

    // Allow adding tasks by pressing Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText, true);
                taskInput.value = '';
            }
        }
    });

    /**
     * Load tasks from Local Storage and display them
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
    }

    function addTask(taskText, save = true) {
        // Create list item element
        const li = document.createElement('li');
        li.className = 'task-item';

        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';

        // Add click event to remove button
        removeBtn.addEventListener('click', () => {
            removeTask(li, taskText);
        });

        // Append elements to list item
        li.appendChild(taskSpan);
        li.appendChild(removeBtn);

        // Add list item to task list
        taskList.appendChild(li);

        // Save to Local Storage if specified
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    function removeTask(taskElement, taskText) {
        // Remove from DOM
        taskList.removeChild(taskElement);

        // Remove from Local Storage
        removeTaskFromLocalStorage(taskText);
    }

    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
