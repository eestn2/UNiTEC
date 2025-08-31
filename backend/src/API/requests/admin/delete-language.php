<?php
/**
 * @file delete_language.php
 * @description API endpoint for deleting a language. Only administrators are authorized to perform this action.
 * Handles DELETE requests, verifies admin permissions, and deletes the language from the database.
 * 
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

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) return_response(status::BAD_REQUEST, "Datos de entrada inválidos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden eliminar idiomas.");

$data->id = intval($data->id);

try {
    $connection->beginTransaction(); 

    $query = "DELETE FROM user_languages WHERE language_id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();

    $query = "DELETE FROM languages WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();

    $connection->commit(); 

    return_response(status::OK, "Idioma eliminado con éxito.");
} catch(PDOException $e) {
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al eliminar el idioma.");
}
?>