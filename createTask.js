// Add event listener for form submission
document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Capture values from form inputs
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    const dueTime = document.getElementById('dueTime').value;

    // Combine due date and time into a single string
    const dueDateTime = `${dueDate} ${dueTime}`;

    try {
        // Send a POST request to the server with the task data
        const response = await fetch('/Scrum/tasks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify({ // Convert task details into JSON format
                name: taskName,
                description: taskDescription,
                dueDateTime: dueDateTime
            })
        });

        // Handle the server's response
        const responseData = await response.json();
        console.log('Response from server:', responseData);

        if (response.ok) {
            // Alert the user on successful task creation
            alert('Task created successfully with ID: ' + responseData.id);
            window.location.href = 'taskList.html'; // Redirect to task list
        } else {
            alert('Error creating task: ' + responseData.message); // Show error message
        }
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        alert('Something went wrong.'); // Alert user if request fails
    }
});
