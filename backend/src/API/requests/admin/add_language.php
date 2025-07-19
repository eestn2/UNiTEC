<?php
/**
 * @file add_language.php
 * @description API endpoint for adding a new language to the system. Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and inserts the new language into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 17, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing:
 *     - user_id: (int) ID of the user requesting the addition (must be an admin)
 *     - name: (string) Name of the language to add
 *
 * Example:
 *   POST /src/API/requests/admin/add_language.php
 *   Body: { "user_id": 4, "name": "Español" }
 *   Response: { "status": "success", "message": "lenguaje insertada con exito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->name) || empty(trim($data -> name))) return_response("failed", "Faltan datos o estan vacios.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden agregar lenguajes.", null);
}
$name = $data->name;
try{
    $query = "INSERT INTO languages (name) VALUES (:name)";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "lenguaje insertada con exito.", null);
}catch(PDOException $e) {
    return_response("failed","Error al insertar el lenguaje". $e->getMessage(), null);
}
?>