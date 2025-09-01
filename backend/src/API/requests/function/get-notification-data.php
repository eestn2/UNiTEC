<?php
/**
 * @file get-notification-data.php
 * @description API endpoint to retrieve all data for a specific notification by its ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response with the notification data.
 * @date May 14, 2025
 *
 * Usage:
 *   GET /src/php/requests/function/get-notification-data.php?id=123
 *   Response: { "status": "success", "notification": { ... } }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    return_response(status::BAD_REQUEST, "Falta o es inválido el parámetro id.");
}

$notification_id = intval($_GET['id']);

try {
    $stmt = $connection->prepare("SELECT * FROM notifications WHERE id = ?");
    $stmt->execute([$notification_id]);
    $notification = $stmt->fetch();
    if (!$notification) return_response(status::NOT_FOUND, "Notificación no encontrada.");
    $response = [
        "id" => $notification["id"],
        "type" => $notification["type"],
        "message" => $notification["message"],
        "sender_id" => $notification["sender_id"],
        "receiver_id" => $notification["receiver_id"],
        "action" => null,
    ];
    if ($notification["type"] == 3 || $notification["type"] == 4) {
        $response["action"] = "view_offer";
    }elseif ($notification["type"] == 5) {
        $response["action"] = "see_message";
    }
    return_response(status::OK, "Notificación encontrada.", $response);
} catch (PDOException $e) {
    error_log("Error retrieving notification data: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar la notificación.");
}
?>