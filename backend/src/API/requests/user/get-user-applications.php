<?php
/**
 * @file get-user-applications.php
 * @description API endpoint to retrieve all active job applications (postulaciones) made by a specific user (postulante).
 * Handles GET requests, verifies that the user is a postulante (user_type_id = 2), and returns all their active applications.
 * Joins with applications and application_statuses tables to provide detailed information about each application.
 * Returns a standardized JSON response with the list of applications or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a GET request with the user_id as a query parameter:
 *     - user_id: (int) ID of the postulante whose applications are requested
 *
 * Example:
 *   GET /src/API/requests/user/get-user-applications.php?user_id=12
 *   Response: { "status": "success", "message": "Postulaciones activas encontradas.", "data": [ ... ] }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    return_response("failed", "Metodo no permitido.", null);
    exit;
}

$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : null;
if (!$user_id || $user_id <= 0) {
    return_response("failed", "Falta el ID del usuario.", null);
    exit;
}

try {
    // Verificar que el user_id es un postulante
    $stmt = $connection->prepare("SELECT user_type_id FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || intval($user['user_type_id']) !== 2) {
        return_response("failed", "El usuario no tiene permisos para ver postulaciones.", null);
        exit;
    }

    // 3 = Pendiente
    $status_id = 3;

    $query = $connection->prepare("
        SELECT
            applicants.id AS applicant_id,
            applicants.application_id,
            applications.title,
            applications.description,
            applications.date,
            application_statuses.status AS application_status
        FROM
            applicants
        JOIN 
            applications ON applicants.application_id = applications.id
        JOIN
            application_statuses ON applicants.status_id = application_statuses.id
        WHERE
            applicants.user_id = ?
            AND applicants.status_id = ?
            AND applications.status = 'disponible'
    ");

    $query->execute([$user_id, $status_id]);
    $applications = $query->fetchAll(PDO::FETCH_ASSOC);
    if ($applications) {
        return_response("success", "Postulaciones activas encontradas.", $applications);
    } else {
        return_response("failed", "No se encontraron postulaciones.", null);
    }
} catch (PDOException $e) {
    // Log error server-side if needed
    return_response("failed", "Error en la consulta.", null);
}
?>