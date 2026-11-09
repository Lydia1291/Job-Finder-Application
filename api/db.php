// this file is the database connection file. 
// It uses PDO to connect to a MySQL database using environment variables for the host, database name, username, and password.
// It also sets some options for error handling and fetch mode.
//
// PDO is a PHP extension that provides an interface for accessing different databases. 
// It supports prepared statements, which help prevent SQL injection attacks.


<?php
// This function returns a PDO connection to the database.
// Connecting to the database with getConnection() allows us to reuse the same connection code in multiple files,
// and makes it easier to change the connection settings in one place if needed.
function getConnection(): PDO {
    return new PDO(
        // The connection string specifies the database type (mysql), host, database name, and character set.
        'mysql:host=' . getenv('DB_HOST') . ';dbname=' . getenv('DB_NAME') . ';charset=utf8mb4',

        // Username and password from dockercompose file 
        getenv('DB_USER'),
        getenv('DB_PASS'),
        [
            // If something goes wrong with the database connection or query, throw an exception instead of failing silently.
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
}