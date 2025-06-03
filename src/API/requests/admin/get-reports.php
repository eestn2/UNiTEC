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
    $stmt = $connection->query("SELECT * FROM reports");
    $reports = $stmt->fetchAll();
    return_response("success", "reports retrieved successfully.", ["reports" => $reports]);
} catch (PDOException $e) {
    error_log("Error retrieving reports: " . $e->getMessage());
    return_response("failed", "Error retrieving reports.", null);
}

?>