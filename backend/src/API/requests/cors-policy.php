<?php
/**
 * @file cors-policy.php
 * @description Sets CORS (Cross-Origin Resource Sharing) headers for API requests based on environment configuration.
 * Loads environment variables and configures allowed origins and headers for secure cross-origin requests.
 * @author Haziel Magallanes
 * @date May 11, 2025
 *
 * Usage:
 *   Include this file at the top of PHP API endpoints to apply CORS policy.
 *
 * Example:
 *   include_once('cors-policy.php');
 */

// Load Composer's autoloader if available
if (file_exists(__DIR__ . '/../../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../../vendor/autoload.php';
} else {
    throw new Exception('Composer autoloader not found. Please run "composer install" in the project root.');
}
use Dotenv\Dotenv;
// Load environment variables from .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../../../');
$dotenv->safeLoad();

$allowedOrigins = explode(',', getenv('ALLOWED_ORIGINS'));
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Set CORS headers

// Check if the origin is allowed or just allow it if in development mode
if (in_array($origin, $allowedOrigins) || getenv('ENVIRONMENT') === 'development') {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
?>