<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = 'localhost';
$user = 'scrum'; // Replace with your MySQL username
$password = 'secret123'; // Replace with your MySQL password
$database = 'task_manager';

// Create a connection to the database
$connection = new mysqli($host, $user, $password, $database);

// Check if the connection was successful
if ($connection->connect_error) {
    die('Error connecting to the database: ' . $connection->connect_error);
}

// Define the request method and URL path
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle POST request to create a task
if ($method === 'POST' && $path === '/tasks') {
    // Decode the JSON input from the request body
    $input = json_decode(file_get_contents('php://input'), true);

    // Prepare an SQL statement to insert the task into the database
    $stmt = $connection->prepare('INSERT INTO tasks (name, description, due_date_time) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $input['name'], $input['description'], $input['dueDateTime']);

    // Execute the query and check if it was successful
    if ($stmt->execute()) {
        // If successful, return a success message with the inserted ID
        http_response_code(201);
        echo json_encode(['message' => 'Task created!', 'id' => $stmt->insert_id]);
    } else {
        // If there's an error, return an error message
        http_response_code(500);
        echo json_encode(['message' => 'Error saving task']);
    }

    // Close the statement
    $stmt->close();
}

// Handle GET request to fetch all tasks
elseif ($method === 'GET' && $path === '/tasks') {
    // Query to fetch all tasks from the database
    $query = 'SELECT * FROM tasks';
    $result = $connection->query($query);

    // If the query was successful
    if ($result) {
        // Fetch all results as an associative array
        $tasks = $result->fetch_all(MYSQLI_ASSOC);

        // Send the tasks in JSON format with a 200 status code
        http_response_code(200);
        echo json_encode($tasks);
    } else {
        // Handle query error
        http_response_code(500);
        echo json_encode(['message' => 'Error fetching tasks']);
    }

    // Close the result set
    $result->close();
}

// Handle unsupported routes
else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
}

// Close the database connection
$connection->close();
?>
