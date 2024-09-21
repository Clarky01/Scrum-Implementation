document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('dueDate').value;
        const dueTime = document.getElementById('dueTime').value;

        const newTask = {
            taskName,
            taskDescription,
            dueDate,
            dueTime,
        };

        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); 
            window.location.href = 'tasklist.html'; 
            form.reset(); 
        })
        .catch(error => console.error('Error creating task:', error));
    });
});
