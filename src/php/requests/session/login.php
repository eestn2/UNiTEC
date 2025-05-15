<?php
/**
 * @file login.php
 * @description API endpoint for user login. Validates credentials and returns user data on success.
 * Handles POST requests, checks email and password and returns a standardized JSON response.
 * @author Haziel Magallanes, Federico Nicolás Martínez.
 * @date May 11, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing 'email' and 'password' to authenticate a user.
 *
 * Example:
 *   POST /src/php/requests/session/login.php
 *   Body: { "email": "user@example.com", "password": "password123" }
 *   Response: { "status": "success", "message": "...", "user": { ...user fields... } }
 */

require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connection.php';
require_once __DIR__ . '/../function/return_response.php';
require_once __DIR__ . '/../../config/session-config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)) return_response("failed", "Faltan datos.", null);

$email = $data->email;
$password = $data->password;

// Search for user email in database
$stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) return_response("failed", "Dirección de correo electronico no registrada.", null);

if (!password_verify($password, $user["password"])) return_response("failed", "Contraseña incorrecta.", null);

return_response("success", "Inicio de sesión exitoso.", ["user" => [
    "id" => $user["id"],
    "name" => $user["name"],
    "age" => $user["birth_date"],
    "location" => $user["location"],
    "email" => $user["email"],
    "description" => $user["description"],
    "last_active_date" => $user["last_active_date"],
    "profile_picture" => $user["profile_picture"],
    "portfolio" => $user["portfolio"],
    "is_enabled" => $user["enabled"],
    "type_id" => $user["user_type_id"],
    "status" => $user["status_id"]
]]);
?>