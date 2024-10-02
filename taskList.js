document.getElementById('addTaskButton').addEventListener('click', function() {
    // Redirect to the task creation page when "ADD NEW TASK" is clicked
    window.location.href = 'addTask.html';
});

// Function to open the edit form in a modal
function openEditForm(task) {
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;

    const dueDateTime = new Date(task.due_date_time);
    document.getElementById('taskDueDate').value = dueDateTime.toISOString().split('T')[0];
    document.getElementById('taskDueTime').value = dueDateTime.toTimeString().split(' ')[0];

    document.getElementById('editTaskId').value = task.id; // Set the task ID
    document.getElementById('taskStatus').value = task.status; // Set the task status

    document.getElementById('editTaskModal').style.display = 'block'; // Show the modal

    document.getElementById('editTaskForm').onsubmit = async function(e) {
        e.preventDefault();

        const updatedTask = {
            id: document.getElementById('editTaskId').value,
            name: document.getElementById('taskName').value,
            description: document.getElementById('taskDescription').value,
            dueDateTime: `${document.getElementById('taskDueDate').value} ${document.getElementById('taskDueTime').value}`,
            status: document.getElementById('taskStatus').value // Get the updated status
        };

        try {
            const response = await fetch(`updateTask.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                alert('Task updated successfully!');
                closeModal();
                fetchTasks(); // Refresh the task list
            } else {
                const errorData = await response.json();
                alert('Error updating task: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task.');
        }
    };
}

// Function to close the modal
function closeModal() {
    document.getElementById('editTaskModal').style.display = 'none';
}

// Function to delete a task
async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            await fetch(`deleteTask.php?id=${taskId}`, { method: 'DELETE' });
            fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
}

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('getTasks.php');
        const tasks = await response.json();
        const taskTableBody = document.getElementById('taskTable').querySelector('tbody');
        taskTableBody.innerHTML = ''; // Clear previous rows

        tasks.forEach(task => {
            const row = taskTableBody.insertRow();
            row.insertCell(0).innerText = task.name;
            row.insertCell(1).innerText = task.description;

            const dueDate = new Date(task.due_date_time);
            const formattedDate = dueDate.toLocaleDateString();
            const formattedTime = dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            row.insertCell(2).innerText = `${formattedDate} | ${formattedTime}`;

            row.insertCell(3).innerText = task.status;

            const actionsCell = row.insertCell(4);
            
            // Create Edit button
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style.backgroundColor = 'green';
            editButton.onclick = () => openEditForm(task);
            actionsCell.appendChild(editButton);

            // Create Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id);
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Call fetchTasks on page load to populate the task list
window.onload = fetchTasks;
