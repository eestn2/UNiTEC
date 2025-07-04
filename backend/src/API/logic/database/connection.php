<?php
/**
 * @file connection.php
 * @description Establishes a secure PDO connection to the MySQL database using environment variables.
 * Loads configuration from .env, supports production and development environments, and sets recommended PDO options for security and performance.
 * Throws HTTP 500 errors and logs details on failure, without exposing sensitive information to the client.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   Include this file in any PHP script that requires a database connection.
 *   Provides a global `$connection` PDO instance.
 *
 * Example:
 *   require_once __DIR__ . '/../logic/connection.php';
 *   $stmt = $connection->prepare("SELECT * FROM users WHERE id = ?");
 *   $stmt->execute([$id]);
 *   $user = $stmt->fetch();
 */

// Load Composer's autoloader if available
if (file_exists(__DIR__ . '/../../../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../../../vendor/autoload.php';
} else {
    throw new Exception('Composer autoloader not found. Please run "composer install" in the project root.');
}

use Dotenv\Dotenv;

// Load environment variables from .env file if present
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../../');
$dotenv->safeLoad();

// Select configuration based on environment
$env = getenv('ENVIRONMENT');
error_log("Current environment: $env");
if ($env === 'production') {
    $host = getenv('DB_HOST_PROD');
    $user = getenv('DB_USER_PROD');
    $password = getenv('DB_PASS_PROD');
    $db = getenv('DB_NAME_PROD');
    $port = (int)getenv('DB_PORT_PROD');
} else {
    $host = getenv('DB_HOST_DEV');
    $user = getenv('DB_USER_DEV');
    $password = getenv('DB_PASS_DEV');
    $db = getenv('DB_NAME_DEV');
    $port = (int)getenv('DB_PORT_DEV');
}

// Validate environment variables
if (!$host || !$user || !$db || !$port) {
    error_log("Database configuration error: Missing environment variables.");
    http_response_code(500);
    die("Database configuration error.");
}

// Build DSN string for PDO
$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4;port=$port;";


try {
    $connection = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Throw exceptions on errors
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Fetch results as associative arrays
        PDO::ATTR_EMULATE_PREPARES => false, // Disable emulated prepared statements for security
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4', // Set character set to utf8mb4
        PDO::MYSQL_ATTR_FOUND_ROWS => true, // Enable found rows for SELECT statements
    ]);
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    http_response_code(500);
    die("No se pudo conectar a la base de datos.");
}
?>