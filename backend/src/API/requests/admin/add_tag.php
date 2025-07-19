<?php
/**
 * @file add_tag.php
 * @description API endpoint for adding a new tag to the system. Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and inserts the new tag into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 17, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing:
 *     - user_id: (int) ID of the user requesting the addition (must be an admin)
 *     - name: (string) Name of the tag to add
 *
 * Example:
 *   POST /src/API/requests/admin/add_tag.php
 *   Body: { "user_id": 4, "name": "Frontend" }
 *   Response: { "status": "success", "message": "tag insertada con exito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->name) || empty(trim($data -> name))) return_response("failed", "Faltan datos.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden agregar tags.", null);
}
$name = $data->name;
try{
    $query = "INSERT INTO tags (name) VALUES (:name)";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "tag insertada con exito.", null);
}catch(PDOException $e) {
    return_response("failed","Error al insertar la tag". $e->getMessage(), null);
}
?>