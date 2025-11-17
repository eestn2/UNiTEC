<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response(status::FORBIDDEN, "Solo los administradores pueden buscar usuarios.");
}

if (!isset($_GET['email']) || empty(trim($_GET['email']))) {
    return_response(status::BAD_REQUEST, "Parámetro de búsqueda requerido.");
}

$email = trim($_GET['email']);

try {
    $stmt = $connection->prepare("
        SELECT id, email, name, user_type
        FROM users
        WHERE email LIKE :email
          AND user_type != :excluded_type
    ");
    $stmt->bindValue(':excluded_type', 4, PDO::PARAM_INT);
    $search = '%' . $email . '%';
    $stmt->bindParam(':email', $search, PDO::PARAM_STR);
    $stmt->execute();
    $users = $stmt->fetchAll();
    return_response(status::OK, "Usuarios encontrados.", ["users" => $users]);
} catch (PDOException $e) {
    error_log("Error retrieving users: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al buscar usuarios.");
}
?>