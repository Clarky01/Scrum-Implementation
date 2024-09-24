document.getElementById('addTaskButton').addEventListener('click', function() {
    // Redirect to the task creation page when "ADD NEW TASK" is clicked
    window.location.href = 'addTask.html';
});

// Optionally, you can implement a fetch function to retrieve and display tasks
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
            row.insertCell(2).innerText = new Date(task.due_date_time).toLocaleDateString();
            row.insertCell(3).innerText = new Date(task.due_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            row.insertCell(4).innerText = task.status;

        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Call fetchTasks on page load to populate the task list
window.onload = fetchTasks;

