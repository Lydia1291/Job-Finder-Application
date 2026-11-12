<?php
// This file is the backend API endpoint for saving or unsaving a job application.
// It receives a JSON payload with the job_id and saved status, and updates the database accordingly.
// It uses PDO for database interaction and handles errors gracefully.
require "cors.php";
require "db.php";

// React sends the data as JSON in the request body, so we need to read it and decode it into a PHP array.
// e.g. of what arrives -> {"job_id": 123, "saved": true} 
$data = json_decode(file_get_contents('php://input'), true);

$jobId = (int) ($data['job_id'] ?? 0);
$saved = (bool) ($data['saved'] ?? false);

// Hardcoded user ID for now, will be replaced with real user login later.
$userId = 1;

// Makes sure the job_id is a positive integer, otherwise returns a 400 error with a message.
if ($jobId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'job_id is required']);
    exit;
}

try {
    // tries to get connection with DB 
    $pdo = getConnection();

    // If user clicked save, we insert a new row into the job_applications table with the user_id, job_id, and status 'saved'.
    // If user clicked unsave, we delete the row from the job_applications table where the user_id and job_id match.
    // Userid and jobid are our compositive primary key, so there can only be one row for each user and job combination.
    // INSERT IGNORE means that if the row already exists, it will not throw an error and will just ignore the insert.
    if ($saved) {
        $stmt = $pdo->prepare(
            "INSERT IGNORE INTO job_applications (user_id, job_id, status)
             VALUES (?, ?, 'saved')"
        );
    // clicks unsave
    } else {
        $stmt = $pdo->prepare(
            "DELETE FROM job_applications WHERE user_id = ? AND job_id = ?"
        );
    }

    // Our place holders are replaced with userid and jobid
    // keeping values separate prevents a sql injection 
    $stmt->execute([$userId, $jobId]);

    //Tells React it worked, and finally turns the job into saved or unsaved
    echo json_encode(['ok' => true]);

// If there is an error connecting to the database or updating the job, return a 500 error with a message
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not update job']);
}