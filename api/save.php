<?php
require "cors.php";
require "db.php";

$data = json_decode(file_get_contents('php://input'), true);
$jobId = (int) ($data['job_id'] ?? 0);
$saved = (bool) ($data['saved'] ?? false);
$userId = 1;

if ($jobId <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'job_id is required']);
    exit;
}

try {
    $pdo = getConnection();

    if ($saved) {
        $stmt = $pdo->prepare(
            "INSERT IGNORE INTO job_applications (user_id, job_id, status)
             VALUES (?, ?, 'saved')"
        );
    } else {
        $stmt = $pdo->prepare(
            "DELETE FROM job_applications WHERE user_id = ? AND job_id = ?"
        );
    }

    $stmt->execute([$userId, $jobId]);
    echo json_encode(['ok' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not update job']);
}