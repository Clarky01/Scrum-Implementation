const http = require('http');
const url = require('url');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'scrum', // Replace with your MySQL username
    password: 'secret123', // Replace with your MySQL password
    database: 'task_manager'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Handle POST request to create a task
    if (req.method === 'POST' && parsedUrl.pathname === '/tasks') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const task = JSON.parse(body);
            const query = 'INSERT INTO tasks (name, description, due_date_time) VALUES (?, ?, ?)';
            const values = [task.name, task.description, task.dueDateTime];

            connection.query(query, values, (err, results) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ message: 'Error saving task' }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ message: 'Task created!', id: results.insertId }));
            });
        });
    }

    // Handle GET request to fetch tasks
    else if (req.method === 'GET' && parsedUrl.pathname === '/tasks') {
        const query = 'SELECT * FROM tasks';
        
        connection.query(query, (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Error fetching tasks' }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results)); // Return the tasks array
        });
    }

    // Handle unsupported routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
