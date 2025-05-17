<?php
/**
 * @file get-languages.php
 * @description API endpoint to retrieve all available languages from the database.
 * Handles GET requests, queries the languages table, and returns a standardized JSON response with the list of languages or an error message.
 * @author Francesco Sidotti
 * @date May 17, 2025
 *
 * Usage:
 *   Send a GET request to this endpoint to receive all languages.
 *
 * Example:
 *   GET /src/API/requests/admin/get-languages.php
 *   Response: { "status": "success", "message": "languages retrieved successfully.", "data": { "languages": [ ... ] } }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

try {
    $stmt = $connection->query("SELECT * FROM languages");
    $languages = $stmt->fetchAll();
    return_response("success", "languages retrieved successfully.", ["languages" => $languages]);
} catch (PDOException $e) {
    error_log("Error retrieving job languages: " . $e->getMessage());
    return_response("failed", "Error retrieving languages.", null);
}
?>