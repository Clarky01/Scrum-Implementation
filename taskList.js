document.getElementById('addTaskButton').addEventListener('click', function() {
    window.location.href = 'addTask.html';
});

// Function to open the edit form in a modal
function openEditForm(name, description, dueDate, dueTime, status) {
    document.getElementById('taskName').value = name;
    document.getElementById('taskDescription').value = description;
    document.getElementById('taskDueDate').value = dueDate;
    document.getElementById('taskDueTime').value = dueTime;
    document.getElementById('taskStatus').value = status;

    document.getElementById('editTaskModal').style.display = 'block';
    
    document.getElementById('editTaskForm').onsubmit = function(e) {
        e.preventDefault();
        alert('Changes saved!'); // You would send the data to your backend here
        closeModal();
        fetchTasks(); // Refresh the task list
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
            // Here you would typically send a request to your backend to delete the task
            await fetch(`deleteTask.php?id=${taskId}`, { method: 'DELETE' }); // Replace with your actual delete endpoint
            fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
}

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('getTasks.php'); // Ensure this points to your PHP file for fetching tasks
        const tasks = await response.json();
        const taskTableBody = document.getElementById('taskTable').querySelector('tbody');
        taskTableBody.innerHTML = ''; // Clear previous rows

        tasks.forEach(task => {
            const row = taskTableBody.insertRow();
            row.insertCell(0).innerText = task.name;
            row.insertCell(1).innerText = task.description;

            // Combine due date and due time
            const dueDate = new Date(task.due_date_time);
            const formattedDate = dueDate.toLocaleDateString(); // Format as MM/DD/YYYY
            const formattedTime = dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM AM/PM
            row.insertCell(2).innerText = `${formattedDate} | ${formattedTime}`; // Combine date and time

            row.insertCell(3).innerText = task.status;

            const actionsCell = row.insertCell(4);
            
            // Create Edit button
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style.backgroundColor = 'green'; // Make the edit button green
            editButton.onclick = () => openEditForm(
                task.name,
                task.description,
                formattedDate, // Use the formatted date
                formattedTime, // Use the formatted time
                task.status
            );
            actionsCell.appendChild(editButton);

            // Create Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id); // Assuming task.id is the unique identifier
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Call fetchTasks on page load to populate the task list
window.onload = fetchTasks;
