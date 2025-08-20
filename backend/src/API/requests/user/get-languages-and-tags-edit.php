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

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if (!isset($_SESSION['user']['id'])) {
    return_response("failed", "No se ha iniciado sesión", null);
}


if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

$userId = $_SESSION['user']['id'];


try {
    
    // Tags
    $stmt = $connection->prepare("SELECT tag_id, `level` FROM user_tags WHERE user_id = ?");
    $stmt->execute([$userId]); // <-- parámetro dentro de un array
    $loadedTags = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Languages
    $stmt = $connection->prepare("SELECT language_id, `level` FROM user_languages WHERE user_id = ?");
    $stmt->execute([$userId]);
    $loadedLanguages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $connection->query("SELECT * FROM tags");
    $tags = $stmt->fetchAll();

    $stmt = $connection->query("SELECT * FROM languages");
    $languages = $stmt->fetchAll();
    return_response("success", "Datos obtenidos correctamente.", [
        "languages" => $languages,
        "tags" => $tags,
        "loadedLanguages" => $loadedLanguages,
        "loadedTags" => $loadedTags
    ]);
} catch (PDOException $e) {
    error_log("Error retrieving job languages: " . $e->getMessage());
    return_response("failed", "Error retrieving languages.", $e->getMessage());
}
?>