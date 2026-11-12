<?php
// This file is the API endpoint for fetching jobs from the database. 
// It connects to the database, retrieves the jobs, and returns them as a JSON response. 
// It also checks if the user has saved any of the jobs and includes that information in the response.
// Include the CORS and database connection files
require "cors.php";
require "db.php";

// For now, we are using a hardcoded user ID. 
// Later on, we will have a real user login
$userId = 1;

// Try to connect to the database and fetch the jobs
try {
    $pdo = getConnection();
    // The SQL query selects job details from the jobs table and checks if the user has saved each job,
    // by performing a LEFT JOIN with the job_applications table.
    // A left join is a type of join that returns all records from the left table (jobs), and the matched records from the right table (job_applications).
    // We used a left join because we want to get all jobs, even if the user has not saved any of them.
    //
    // Prepare sends the SQL to mySQL with a placeholder for the user ID. 
    // This is a security measure to prevent SQL injection attacks as its treated like data and not SQL.
    $stmt = $pdo->prepare(
        // The SQL query selects job details from the jobs table and checks if the user has saved each job,
        "SELECT j.id, j.title, j.company, j.location, j.salary, j.url,
                (a.job_id IS NOT NULL) AS saved
         FROM jobs j
         LEFT JOIN job_applications a
           ON a.job_id = j.id AND a.user_id = ?"
    );
    // Run the query replacing the placeholder with the actual user ID.
    $stmt->execute([$userId]);
    // Fetch all the rows from the result set
    $rows = $stmt->fetchAll();

    // Convert the saved field to a boolean for each job (saved or not saved)
    foreach ($rows as &$row) {
        $row['saved'] = (bool) $row['saved'];
    }

    echo json_encode($rows);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not load jobs']);
}