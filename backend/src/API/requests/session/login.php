<?php
/**
 * @file login.php
 * @description API endpoint for user login. Validates credentials and returns user data on success.
 * Handles POST requests, checks email and password and returns a standardized JSON response.
 * @date May 11, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing 'email' and 'password' to authenticate a user.
 *
 * Example:
 *   POST /src/php/requests/session/login.php
 *   Body: { "email": "user@example.com", "password": "password123" }
 *   Response: { "status": OK, "message": "...", "data": null }
 */


session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "POST" ) return_response(status::METHOD_NOT_ALLOWED, "Metodo no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)) return_response(status::BAD_REQUEST, "Faltan datos.");

$email = trim($data->email, ' ');
$password = trim($data->password, ' ');
// Search for user email in database
$stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) return_response(status::NOT_FOUND, "Dirección de correo electronico o contraseña incorrectos.");


if (!password_verify($password, $user["password"])) return_response(status::NOT_FOUND, "Dirección de correo electronico o contraseña incorrectos.", null);
if ($user["enabled"] == 0) return_response(status::FORBIDDEN, "Usuario no habilitado.");

// Store user data in session (do not include password)
$_SESSION['user'] = [
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
    "type" => $user["user_type"],
    "status" => $user["status"]
];

return_response(status::OK, "Inicio de sesión exitoso.");
?>