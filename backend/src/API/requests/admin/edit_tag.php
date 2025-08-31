<?php
/**
 * @file edit_tag.php
 * @description API endpoint for editing the name of a tag. Only administrators are authorized to perform this action.
 * Handles PUT requests, verifies admin permissions, and updates the tag name in the database.
 * Returns a standardized JSON response indicating success or failure.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - id: (int) ID of the tag to edit
 *     - name: (string) New name for the tag
 *
 * Example:
 *   PUT /src/API/requests/admin/edit_tag.php
 *   Body: { "id": 2, "name": "Frontend" }
 *   Response: { "message": "Tag editada con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->id) || !isset($data->name) || empty(trim($data -> name))) return_response(status::BAD_REQUEST, "Faltan datos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden cambiar tags.");
$data->id = intval($data->id);
$name = $data->name;
try{
    $query = "UPDATE tags SET name = :name WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response(status::OK, "Tag editada con éxito.");
} catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al editar la tag: " . $e->getMessage());
}
?>