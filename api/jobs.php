<?php
require "db.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');

try {
    $pdo = getConnection();
    $rows = $pdo->query(
        "SELECT id, external_id, title, company, location, salary, url FROM jobs"
    )->fetchAll();
    echo json_encode($rows);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not load jobs']);
}