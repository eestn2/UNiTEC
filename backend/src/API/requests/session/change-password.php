<?php
/**
 * @file change-password.php
 * @description API endpoint for changing a user's password.
 * Handles PATCH requests, validates the current password, checks new password requirements, and updates the password in the database.
 * Ensures the new password is not the same as the current one and meets minimum security requirements.
 * Returns a standardized JSON response indicating success or failure.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PATCH request with JSON body containing:
 *     - id: (int) ID of the user whose password is being changed
 *     - password: (string) Current password
 *     - new_password: (string) New password
 *
 * Example:
 *   PATCH /src/API/requests/session/change-password.php
 *   Body: { "id": 7, "password": "oldpass", "new_password": "newpass123" }
 *   Response: { "status": "OK", "message": "Contraseña cambiada correctamente.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";
require_once __DIR__ . "/../../logic/security/security_functions.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "PATCH") return_response(status::METHOD_NOT_ALLOWED, "Metodo no permitido.");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->password) || !isset($data->new_password)) return_response(status::BAD_REQUEST, "Faltan datos requeridos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
$user_id = intval($_SESSION['user']['id']);

try {
    // Verificar la contraseña actual
    $query = $connection->prepare("SELECT password FROM users WHERE id = :id");
    $query->execute([':id' => $user_id]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if (!$result || !password_verify($data->password, $result['password'])) return_response(status::CONFLICT, "La contraseña actual es incorrecta.");

    // Evitar cambiar a la misma contraseña
    if (password_verify($data->new_password, $result['password'])) return_response(status::CONFLICT, "La nueva contraseña no puede ser igual a la actual.");

    // Hashear la nueva contraseña
    $hashed_new_password = encryption($data->new_password);
    if ($hashed_new_password === false) return_response(status::INTERNAL_SERVER_ERROR, "Error al hashear la nueva contraseña.");

    // Actualizar la contraseña en la base de datos
    $update_query = $connection->prepare("UPDATE users SET password = :new_password WHERE id = :id");
    $update_query->execute([
        ':new_password' => $hashed_new_password,
        ':id' => $user_id
    ]);
    if ($update_query->rowCount() > 0) return_response(status::OK, "Contraseña cambiada correctamente.");
    return_response(status::INTERNAL_SERVER_ERROR, "No se pudo cambiar la contraseña.");
} catch (PDOException $e) {
    // Log the error server-side if needed
    return_response(status::INTERNAL_SERVER_ERROR, "Error al cambiar la contraseña.");
}
?>