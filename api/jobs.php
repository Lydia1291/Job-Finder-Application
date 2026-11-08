<?php
require "cors.php";
require "db.php";

$userId = 1;

try {
    $pdo = getConnection();
    $stmt = $pdo->prepare(
        "SELECT j.id, j.title, j.company, j.location, j.salary, j.url,
                (a.job_id IS NOT NULL) AS saved
         FROM jobs j
         LEFT JOIN job_applications a
           ON a.job_id = j.id AND a.user_id = ?"
    );
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll();

    foreach ($rows as &$row) {
        $row['saved'] = (bool) $row['saved'];
    }

    echo json_encode($rows);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not load jobs']);
}