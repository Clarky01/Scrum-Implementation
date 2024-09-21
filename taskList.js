window.onload = function() {
    fetch('path/to/your/api/endpoint')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `${task.taskName} - ${task.taskDescription} - ${task.dueDate} ${task.dueTime}`;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
};
