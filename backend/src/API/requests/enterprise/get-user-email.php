<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_GET['userId'])) return_response(status::BAD_REQUEST, "Falta el parámetro userId.");

$userId = intval($_GET['userId']);

try {
    $stmt = $connection->prepare("SELECT email, name FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user === false) return_response(status::NOT_FOUND, "Usuario no encontrado.");
    return_response(status::OK, "Datos encontrados.", ["email" => $user['email']]);
} catch (PDOException $e) {
    error_log("Error retrieving user email: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar el email del usuario.");
}
?>