<?php
/**
 * @file retrieve-notifications.php
 * @description API endpoint to retrieve all notifications for a given user ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response with notifications.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   Send a GET request with the 'user_id' query parameter to receive notifications for that user.
 *
 * Example:
 *   GET /src/php/requests/user/retrieve-notifications.php?user_id=1
 *   Response: { "status": "success", "message": "...", "notifications": [ ... ] }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) {
    return_response("failed", "Usuario no autenticado.", null);
}
$user_id = intval($_SESSION['user']['id']);
// Query notifications for the given user_id in reverse order (latest first)
try {
    $stmt = $connection->prepare("SELECT id, `type`, `message` FROM notifications WHERE receiver_id = ? ORDER BY id DESC");
    $stmt->execute([$user_id]);
    $notifications = $stmt->fetchAll();
    return_response("success", "Notificaciones recuperadas correctamente.", ["notifications" => $notifications]);
} catch (PDOException $e) {
    error_log("Error retrieving notifications: " . $e->getMessage());
    return_response("failed", "Error al recuperar las notificaciones.", null);
}
?>