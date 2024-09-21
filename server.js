const http = require('http');
const url = require('url');

let tasks = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);


    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST' && parsedUrl.pathname === '/tasks') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const task = JSON.parse(body);
            tasks.push(task);
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Task created!' }));
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/tasks') {
        res.writeHead(200);
        res.end(JSON.stringify(tasks));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
