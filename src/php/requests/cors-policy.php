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

include_once(__DIR__ . '/../DotEnv.php');

// Load environment variables from .env file
(new DotEnv(__DIR__ . '/../../../.env'))->load();

// Set CORS headers
$allowedOrigins = explode(',', getenv('ALLOWED_ORIGINS'));
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
?>