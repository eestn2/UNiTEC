<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden buscar usuarios.", null);
}

if (!isset($_GET['email']) || empty(trim($_GET['email']))) {
    return_response("failed", "Parámetro de búsqueda requerido.", null);
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
    return_response("success", "Usuarios encontrados.", ["users" => $users]);
} catch (PDOException $e) {
    error_log("Error retrieving users: " . $e->getMessage());
    return_response("failed", "Error al buscar usuarios.", null);
}
?>