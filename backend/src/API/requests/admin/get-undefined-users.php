<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden ver los usuarios a aprobar.");

try {
    $stmt = $connection->query("SELECT * FROM users WHERE enabled= 0");
    $users = $stmt->fetchAll();
    if (!$users) return_response(status::OK, "No hay usuarios no habilitados.", ["users" => []]);
    // Sanitize user data to match the expected structure
    $users = array_map(function($user) {
        return [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email'],
            "location" => $user['location'],
            "status" => $user['status'],
            "description" => $user['description'],
            "portfolio" => $user['portfolio'],
            "type" => $user['user_type'],
            "profile_picture" => $user['profile_picture'] ?? null,
            "birth_date" => $user['birth_date'],
            "is_enabled" => $user['enabled'] == 1,
        ];
    }, $users);
    error_log("Users retrieved successfully: " . json_encode($users));
    return_response(status::OK, "Usuarios recuperados correctamente.", ["users" => $users]);
} catch (PDOException $e) {
    error_log("Error retrieving users: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar los usuarios.");
}

?>