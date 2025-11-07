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
    return_response(status::FORBIDDEN, "Solo los administradores pueden ver los reportes.");
}

try {
    $stmt = $connection->prepare("
        SELECT r.*, 
            reporter.email AS reporter_email, 
            reported.email AS reported_email
        FROM reports r
        JOIN users reporter ON r.reporter_id = reporter.id
        JOIN users reported ON r.reported_id = reported.id
    ");
    $stmt->execute();
    $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return_response(status::OK, "Reportes recuperados con éxito.", ["reports" => $reports]);
} catch (PDOException $e) {
    error_log("Error retrieving reports: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar los reportes.");
}

?>