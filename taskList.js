// Event listener for the "ADD NEW TASK" button
document.getElementById('addTaskButton').addEventListener('click', function() {
    // Redirects to the task creation page when clicked
    window.location.href = 'addTask.html';
});

// Function to open the edit form in a modal with the task data populated
function openEditForm(task) {
    // Set task details in the edit form fields
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;

    // Set the due date and time in the edit form
    const dueDateTime = new Date(task.due_date_time);
    document.getElementById('taskDueDate').value = dueDateTime.toISOString().split('T')[0];
    document.getElementById('taskDueTime').value = dueDateTime.toTimeString().split(' ')[0];

    // Set the task ID and status in the form
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('taskStatus').value = task.status;

    // Display the edit modal
    document.getElementById('editTaskModal').style.display = 'block';

    // Handle the form submission for editing the task
    document.getElementById('editTaskForm').onsubmit = async function(e) {
        e.preventDefault(); // Prevents default form submission behavior

        // Create an updated task object with the form data
        const updatedTask = {
            id: document.getElementById('editTaskId').value,
            name: document.getElementById('taskName').value,
            description: document.getElementById('taskDescription').value,
            dueDateTime: `${document.getElementById('taskDueDate').value} ${document.getElementById('taskDueTime').value}`,
            status: document.getElementById('taskStatus').value // Get updated status
        };

        try {
            // Send the updated task data to the server for processing
            const response = await fetch(`updateTask.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Content type set as JSON
                },
                body: JSON.stringify(updatedTask) // Send updated task as JSON
            });

            if (response.ok) {
                alert('Task updated successfully!');
                closeModal(); // Close the modal after successful update
                fetchTasks(); // Refresh the task list
            } else {
                const errorData = await response.json();
                alert('Error updating task: ' + errorData.error); // Show error if any
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task.');
        }
    };
}

// Function to close the modal
function closeModal() {
    document.getElementById('editTaskModal').style.display = 'none'; // Hides the modal
}

// Function to delete a task
async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) { // Confirm deletion
        try {
            // Send DELETE request to the server to remove the task
            await fetch(`deleteTask.php?id=${taskId}`, { method: 'DELETE' });
            fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
}

// Function to fetch and display tasks in the table
async function fetchTasks() {
    try {
        // Fetch the list of tasks from the server
        const response = await fetch('getTasks.php');
        const tasks = await response.json();
        const taskTableBody = document.getElementById('taskTable').querySelector('tbody');
        taskTableBody.innerHTML = ''; // Clear previous task rows

        // Loop through the fetched tasks and insert rows into the task table
        tasks.forEach(task => {
            const row = taskTableBody.insertRow();
            row.insertCell(0).innerText = task.name; // Task name
            row.insertCell(1).innerText = task.description; // Task description

            // Format the due date and time
            const dueDate = new Date(task.due_date_time);
            const formattedDate = dueDate.toLocaleDateString();
            const formattedTime = dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            row.insertCell(2).innerText = `${formattedDate} | ${formattedTime}`; // Due date/time

            row.insertCell(3).innerText = task.status; // Task status

            // Add Edit and Delete buttons for each task
            const actionsCell = row.insertCell(4);

            // Create Edit button and attach click event to open the edit modal
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style.backgroundColor = 'green';
            editButton.onclick = () => openEditForm(task); // Open edit modal
            actionsCell.appendChild(editButton);

            // Create Delete button and attach click event to delete the task
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id); // Delete task
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Fetch tasks on page load to populate the task list
window.onload = fetchTasks;
