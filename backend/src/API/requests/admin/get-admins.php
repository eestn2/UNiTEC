<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden ver la lista de admins.");

try {
    $stmt = $connection->prepare("
        SELECT id, name, email
        FROM users
        WHERE user_type = 4 AND id != :id
    ");
    $stmt->execute(['id' => $_SESSION['user']['id']]);
    $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return_response(status::OK, "Lista de administradores recuperada correctamente.", ["admins" => $admins]);
} catch (PDOException $e) {
    error_log("Error retrieving admins: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar la lista de administradores.");
}

?>