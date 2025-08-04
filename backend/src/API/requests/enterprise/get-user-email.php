<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

if (!isset($_GET['userId'])) return_response("failed", "Falta el parámetro userId.", null);

$userId = intval($_GET['userId']);

try {
    $stmt = $connection->prepare("SELECT email, name FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user === false) {
        return_response("failed", "Usuario no encontrado.", null);
    } else {
        return_response("success", "Datos encontrados.", ["email" => $user['email'], "name" => $user['name']]);
    }
} catch (PDOException $e) {
    error_log("Error retrieving user email: " . $e->getMessage());
    return_response("failed", "Error retrieving user email.", null);
}
?>