<?php
/**
 * @file delete_admin.php
 * @description API endpoint for deleting a user (admin). Only administrators are authorized to perform this action.
 * Handles DELETE requests, verifies admin permissions, and deletes the user from the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 31, 2025
 *
 * Usage:
 *   Send a DELETE request with JSON body containing:
 *     - user_id: (int) ID of the user requesting the deletion (must be an admin)
 *     - id: (int) ID of the user to delete
 *
 * Example:
 *   DELETE /src/API/requests/admin/delete_admin.php
 *   Body: { "user_id": 4, "id": 2 }
 *   Response: { "status": "success", "message": "Usuario eliminado con exito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden eliminar usuarios.", null);
}
$data->id = intval($data->id);

try {
    $query = "DELETE FROM users WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "Usuario eliminado con exito.", null);

} catch(PDOException $e) {
    return_response("failed", "Error al eliminar el usuario: " . $e->getMessage(), null);
}
?>