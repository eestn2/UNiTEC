<?php
/**
 * @file accept-new-users.php
 * @description API endpoint for administrators to accept (activate) new user accounts.
 * Handles PUT requests, verifies admin permissions, and updates the 'enabled' status of the target user.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - target_user_id: (int) ID of the user to accept (activate)
 *     - id: (int) ID of the authenticated admin user (for permission check)
 *
 * Example:
 *   PUT /src/API/requests/admin/accept-new-users.php
 *   Body: { "target_user_id": 8, "id": 1 }
 *   Response: { "status": "success", "message": "Usuario aceptado con exito.", "data": null }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";
require_once __DIR__ . "/../function/get-user-from-request.php";
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    return_response("failed", "Method not allowed", null);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->target_user_id)) {
    return_response("failed", "Falta el ID del usuario a aceptar", null);
    exit;
}

$target_user_id = intval($data->target_user_id);
if ($target_user_id <= 0) {
    return_response("failed", "ID de usuario a aceptar inválido.", null);
    exit;
}

// Obtener el usuario autenticado
$auth_user = get_user_from_request($data);
if (!$auth_user || !isset($auth_user['id'])) {
    return_response("failed", "Usuario no encontrado", null);
    exit;
}

// Verificar si el usuario autenticado es admin
if (!is_admin($auth_user['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden aceptar usuarios.", null);
    exit;
}

// Activar al usuario destino
try {
    $stmt = $connection->prepare("UPDATE users SET enabled = 1 WHERE id = :id");
    $stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        return_response("success", "Usuario aceptado con exito.", null);
    } else {
        return_response("failed", "No se encontró al usuario o ya estaba aceptado.", null);
    }
} catch(PDOException $e) {
    // Log error server-side if needed
    return_response("failed", "Error al aceptar el usuario.", null);
    exit;
}
?>