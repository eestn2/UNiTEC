<?php
/**
 * @file login.php
 * @description API endpoint for user login. Validates credentials and returns user data on success.
 * Adds response delay to mitigate brute-force attacks.
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/delay_response.php';

$startTime = microtime(true);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    wait_until_five_seconds($startTime);
    return_response("failed", "Método no permitido.", null);
}

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)) {
    wait_until_five_seconds($startTime);
    return_response("failed", "Faltan datos.", null);
}

$email = $data->email;
$password = $data->password;

// Buscar usuario
$stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    wait_until_five_seconds($startTime);
    return_response("failed", "Dirección de correo electrónico no registrada.", null);
}

if (!password_verify($password, $user["password"])) {
    wait_until_five_seconds($startTime);
    return_response("failed", "Contraseña incorrecta.", null);
}

// Cancelar eliminación si estaba programada
if ($user["delete_requested_at"] !== null) {
    $stmt = $connection->prepare("UPDATE users SET delete_requested_at = NULL WHERE id = ?");
    $stmt->execute([$user["id"]]);
}

// Guardar datos de sesión (sin contraseña)
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

wait_until_five_seconds($startTime);
return_response("success", "Inicio de sesión exitoso.", null);
?>