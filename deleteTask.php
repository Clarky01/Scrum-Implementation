<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";  
$username = "root";  
$password = "Secret_123";  
$dbname = "task_manager";  

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$taskId = $_GET['id'];

if (!isset($taskId)) {
    echo json_encode(["error" => "Task ID is required."]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
$stmt->bind_param("i", $taskId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Task deleted successfully"]);
} else {
    echo json_encode(["error" => "Execution error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
