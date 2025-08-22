<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden ver los usuarios a aprobar.", null);
}

try {
    $stmt = $connection->query("SELECT * FROM users WHERE enabled= 0");
    $users = $stmt->fetchAll();
    if (!$users) return_response("success", "No hay usuarios no habilitados.", ["users" => []]);
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
    return_response("success", "not enabled retrieved successfully.", ["users" => $users]);
} catch (PDOException $e) {
    error_log("Error retrieving users: " . $e->getMessage());
    return_response("failed", "Error retrieving users.", null);
}

?>