<?php
/**
 * @file delete_language.php
 * @description API endpoint for deleting a language. Only administrators are authorized to perform this action.
 * Handles DELETE requests, verifies admin permissions, and deletes the language from the database.
 * 
 * Note: The authenticated user is obtained from the session, not from the request body.
 * 
 * @author Francesco Sidotti
 * @date May 31, 2025
 *
 * Usage:
 *   Send a DELETE request with JSON body containing:
 *     - id: (int) ID of the language to delete
 *
 * Example:
 *   DELETE /src/API/requests/admin/delete_language.php
 *   Body: { "id": 2 }
 *   Response: { "status": "success", "message": "Idioma eliminado con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) {
    return_response("failed", "Datos de entrada inválidos.", null);
}
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden eliminar idiomas.", null);
}
$data->id = intval($data->id);

try {
    $connection->beginTransaction(); 

    $query = "DELETE FROM languages WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();

    $connection->commit(); 

    return_response("success", "Idioma eliminado con exito.", null);
} catch(PDOException $e) {
    $connection->rollBack(); 
    return_response("failed", "Error al eliminar el idioma: " . $e->getMessage(), null);
}
?>