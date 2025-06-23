<?php
/**
 * @file delete_tag.php
 * @description API endpoint for deleting a tag. Only administrators are authorized to perform this action.
 * Handles DELETE requests, verifies admin permissions using session authentication, and deletes the tag from the database.
 * Returns a standardized JSON response indicating success or failure.
 * 
 * Note: The authenticated user is retrieved from the session, not from the request body.
 * 
 * @author Francesco Sidotti
 * @date May 31, 2025
 *
 * Usage:
 *   Send a DELETE request with JSON body containing:
 *     - id: (int) ID of the tag to delete
 *
 * Example:
 *   DELETE /src/API/requests/admin/delete_tag.php
 *   Body: { "id": 2 }
 *   Response: { "status": "success", "message": "Tag eliminada con éxito.", "data": null }
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
    return_response("failed", "Solo los administradores pueden eliminar idiomas.", null);
}
$data->id = intval($data->id);

try {
    $query = "DELETE FROM tags WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "Tag eliminada con exito.", null);

} catch(PDOException $e) {
    return_response("failed", "Error al eliminar la tag: " . $e->getMessage(), null);
}
?>