<?php
/**
 * @file add_admin.php
 * @description API endpoint for promoting a user to administrator (user_type = 4). Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and updates the user_type in the database.
 * Returns a standardized JSON response indicating success or failure.
 * @date Aug 31, 2025
 * 
 * Usage:
 *   Send a POST request with JSON body containing:
 *     - admin_email: (string) Email of the user to promote to admin
 * 
 * Example:
 *   POST /src/API/requests/admin/add_admin.php
 *   Body: { "admin_email": "user@example.com" }
 *   Response: { "message": "Usuario promovido a administrador.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->admin_email)) return_response(status::BAD_REQUEST, "Faltan datos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden agregar administradores.");

$admin_email = $data->admin_email;

try {
    $query = "UPDATE users SET user_type = 4 WHERE email = :admin_email";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':admin_email', $admin_email, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) return_response(status::OK, "Usuario promovido a administrador.");
    return_response(status::NOT_FOUND, "No se encontró el usuario o ya es administrador.");
} catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al promover a administrador.");
}
?>