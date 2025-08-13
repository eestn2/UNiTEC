<?php
/**
 * @file user-info.php
 * @description API endpoint to retrieve a user's name and profile picture by user ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response.
 * @author Haziel Magallanes, Federico Nicolas Martinez.
 * @date May 11, 2025
 *
 * Usage:
 *   Send a GET request with the 'id' query parameter to receive user information.
 *
 * Example:
 *   GET /src/php/requests/user/user-info.php?id=1
 *   Response: { "status": "success", "message": "...", "data": { "user": { "name": "...", "profile_picture": "..." } } }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    return_response("failed", "Metodo no permitido.", null);
}

// Retrieve and validate the user ID from the query parameters
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    return_response("failed", "Ocurrió un error, intente de nuevo.", null);
}

$id = intval($_GET['id']);

try {
    $stmt = $connection->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$id]);
    $user = $stmt->fetch();
    $stmt = $connection->prepare("
    SELECT l.name, ul.level
    FROM user_languages ul
    INNER JOIN languages l ON ul.language_id = l.id
    WHERE ul.user_id = ?
");
    $stmt->execute([$id]);
    $languages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $connection->prepare("
    SELECT t.name, ut.level
    FROM user_tags ut
    INNER JOIN tags t ON ut.tag_id = t.id
    WHERE ut.user_id = ?
");
    $stmt->execute([$id]);
    $tags = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!$user) return_response("failed", "Usuario no encontrado.", null);
    return_response("success", "Datos del usuario devueltos correctamente.", [
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"],
            "location" => $user["location"],
            "status" => $user["status"],
            "description" => $user["description"],
            "portfolio" => $user["portfolio"],
            "type" => $user["user_type"],
            "profile_picture" => $user["profile_picture"] ?? null,
            "languages" => $languages ?? null,
            "tags" => $tags ?? null
        ]
    ]);
} catch (PDOException $e) {
    error_log("Error retrieving user info: " . $e->getMessage());
    return_response("failed", "Error al recuperar la información del usuario.", null);
}
?>