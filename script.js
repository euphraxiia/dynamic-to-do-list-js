document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM elements and store them in constants
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();
        
        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create new list item element. Set its textContent to taskText.
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task. Set its textContent to "Remove", and give it a class name of 'remove-btn'.
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList.
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the li element, then append the li to taskList.
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = '';
    }

    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the "Enter" key. Inside this event listener, check if event.key is equal to 'Enter' before calling addTask.
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
