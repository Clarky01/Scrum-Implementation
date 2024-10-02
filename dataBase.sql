CREATE DATABASE task_manager;
USE task_manager;

CREATE TABLE tasks (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date_time DATETIME NOT NULL
);
ALTER TABLE tasks ADD COLUMN status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending'
