document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const dueTime = document.getElementById('dueTime').value;

    const dueDateTime = `${dueDate} ${dueTime}`;

    try {
        const response = await fetch('/Scrum/tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: taskName,
                description: taskDescription,
                dueDateTime: dueDateTime
            })
        });

        const responseData = await response.json();
        console.log('Response from server:', responseData);

        if (response.ok) {
            alert('Task created successfully with ID: ' + responseData.id);
            window.location.href = 'taskList.html';
        } else {
            alert('Error creating task: ' + responseData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong.');
    }
});
