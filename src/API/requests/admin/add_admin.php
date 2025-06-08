<?php
/**
 * @file add_admin.php
 * @description API endpoint for promoting a user to administrator (user_type = 4). Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and updates the user_type in the database.
 * Returns a standardized JSON response indicating success or failure.
 * 
 * Usage:
 *   Send a POST request with JSON body containing:
 *     - user_id: (int) ID of the user requesting the promotion (must be an admin)
 *     - target_id: (int) ID of the user to promote to admin
 * 
 * Example:
 *   POST /src/API/requests/admin/add_admin.php
 *   Body: { "user_id": 1, "target_id": 5 }
 *   Response: { "status": "success", "message": "Usuario promovido a administrador.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->admin_email)) return_response("failed", "Faltan datos.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden agregar administradores.", null);
}

$admin_email = $data->admin_email;

try {
    $query = "UPDATE users SET user_type = 4 WHERE email = :admin_email";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':admin_email', $admin_email, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        return_response("success", "Usuario promovido a administrador.", null);
    } else {
        return_response("failed", "No se encontró el usuario o ya es administrador.", null);
    }
} catch (PDOException $e) {
    return_response("failed", "Error al promover a administrador: " . $e->getMessage(), null);
}
?>