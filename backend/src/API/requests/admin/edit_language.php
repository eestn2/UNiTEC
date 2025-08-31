<?php
/**
 * @file edit_language.php
 * @description API endpoint for editing the name of a language. Only administrators are authorized to perform this action.
 * Handles PUT requests, verifies admin permissions, and updates the language name in the database.
 * Returns a standardized JSON response indicating success or failure.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - user_id: (int) ID of the user requesting the change (must be an admin)
 *     - id: (int) ID of the language to edit
 *     - name: (string) New name for the language
 *
 * Example:
 *   PUT /src/API/requests/admin/edit_language.php
 *   Body: { "user_id": 4, "id": 2, "name": "Español" }
 *   Response: { "status": "success", "message": "lenguaje editado con exito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id) || !isset($data->name) || empty(trim($data->name))) return_response(status::BAD_REQUEST, "Datos de entrada inválidos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden editar lenguajes.");

$data->id = intval($data->id);
$name = $data->name;

try {
    $connection->beginTransaction();

    // Verify language exists
    $checkQuery = "SELECT id FROM languages WHERE id = :id";
    $checkStmt = $connection->prepare($checkQuery);
    $checkStmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $checkStmt->execute();
    
    if (!$checkStmt->fetch()) {
        $connection->rollBack();
        return_response(status::NOT_FOUND, "El lenguaje no existe.");
    }

    $query = "UPDATE languages SET name = :name WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    
    $connection->commit();
    return_response(status::OK, "Lenguaje editado con éxito.");

} catch(PDOException $e) {
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al editar el lenguaje");
}
?>