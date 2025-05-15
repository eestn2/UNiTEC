<?php
/**
 * @file get-notification-data.php
 * @description API endpoint to retrieve all data for a specific notification by its ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response with the notification data.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   GET /src/php/requests/function/get-notification-data.php?id=123
 *   Response: { "status": "success", "notification": { ... } }
 */

require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connection.php';
require_once __DIR__ . '/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Metodo no permitido.", null);

if (!isset($_['id']) || !is_numeric($_GET['id'])) {
    return_response("failed", "Falta o es inválido el parámetro id.", null);
}

$notification_id = intval($_GET['id']);

try {
    $stmt = $connection->prepare("SELECT * FROM notifications WHERE id = ?");
    $stmt->execute([$notification_id]);
    $notification = $stmt->fetch();
    if (!$notification) return_response("failed", "Notificacion no encontrada.", null);
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
    return_response("success", "Notificacion encontrada.", $response);
} catch (PDOException $e) {
    error_log("Error retrieving notification data: " . $e->getMessage());
    return_response("failed", "Error al recuperar la notificacion.", null);
}
?>