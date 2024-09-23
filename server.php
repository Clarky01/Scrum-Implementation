<?php
// Enable error reporting for debugging 
error_reporting(E_ALL); 
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Database configuration
$servername = "localhost";
$username = "your_username"; // replace with your database username
$password = "your_password"; // replace with your database password
$dbname = "task_manager";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["message" => "Connection failed: " . $conn->connect_error]));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['name'], $input['description'], $input['dueDateTime'])) {
        $name = $conn->real_escape_string($input['name']);
        $description = $conn->real_escape_string($input['description']);
        $dueDateTime = $conn->real_escape_string($input['dueDateTime']);

        $sql = "INSERT INTO tasks (name, description, due_date_time) VALUES ('$name', '$description', '$dueDateTime')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["id" => $conn->insert_id]);
        } else {
            echo json_encode(["message" => "Error: " . $sql . "<br>" . $conn->error]);
        }
    } else {
        echo json_encode(["message" => "Invalid input"]);
    }
}

$conn->close();
?>
