
document.getElementById('addTaskButton').addEventListener('click', function() {
    // Redirect to the task creation page when "ADD NEW TASK" is clicked
    window.location.href = 'addTask.html';
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values from the form
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const dueTime = document.getElementById('dueTime').value;

    // Get the task table body
    const taskTableBody = document.querySelector('#taskTable tbody');

    // Create a new row
    const newRow = document.createElement('tr');

    // Create and append cells for task details
    const taskNameCell = document.createElement('td');
    taskNameCell.textContent = taskName;
    newRow.appendChild(taskNameCell);

    const taskDescriptionCell = document.createElement('td');
    taskDescriptionCell.textContent = taskDescription;
    newRow.appendChild(taskDescriptionCell);

    // Combine the due date and due time into one string
    const dueDateTimeCell = document.createElement('td');
    dueDateTimeCell.textContent = `${dueDate} ${dueTime}`; // Combining date and time
    newRow.appendChild(dueDateTimeCell);

    // Append the new row to the table body
    taskTableBody.appendChild(newRow);

    // Optionally hide the form after submission
    document.getElementById('taskForm').style.display = 'none';
});
