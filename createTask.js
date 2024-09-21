document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('dueDate').value;
        const dueTime = document.getElementById('dueTime').value;

        console.log(`Task Details:\nName: ${taskName}\nDescription: ${taskDescription}\nDue Date: ${dueDate}\nDue Time: ${dueTime}`);

        window.location.href = 'tasklist.html'; 
        
        form.reset();
    });
});
