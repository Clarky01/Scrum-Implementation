<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$servername = "localhost";
$username = "root";  
$password = "July_052004!";  
$dbname = "task_manager";  

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => "JSON error: " . json_last_error_msg()]);
    exit();
}

// Check for required fields
if (!isset($data['name'], $data['description'], $data['dueDateTime'])) {
    echo json_encode(["error" => "Missing required fields."]);
    exit();
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO tasks (name, description, due_date_time, status) VALUES (?, ?, ?, 'Pending')");
if ($stmt === false) {
    echo json_encode(["error" => "Prepare error: " . $conn->error]);
    exit();
}
$stmt->bind_param("sss", $data['name'], $data['description'], $data['dueDateTime']);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(['id' => $conn->insert_id, 'message' => 'Task created successfully']);
} else {
    echo json_encode(["error" => "Execution error: " . $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>