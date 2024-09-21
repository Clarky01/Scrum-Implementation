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

    const dueDateCell = document.createElement('td');
    dueDateCell.textContent = dueDate;
    newRow.appendChild(dueDateCell);

    const dueTimeCell = document.createElement('td');
    dueTimeCell.textContent = dueTime;
    newRow.appendChild(dueTimeCell);

    // Create and append the status cell (default is "Pending")
    const statusCell = document.createElement('td');
    statusCell.textContent = 'Pending'; // Default status
    newRow.appendChild(statusCell);

    // Append the new row to the table body
    taskTableBody.appendChild(newRow);

    // Clear the form after submission
    document.getElementById('taskForm').reset();

    // Optionally hide the form after submission
    document.getElementById('taskForm').style.display = 'none';
});
