<?php
/**
 * @file reject-application.php
 * @description API endpoint for enterprises to reject a job application (postulante).
 * Handles PUT requests, verifies permissions, checks application ownership, and updates applicant status to rejected.
 * Ensures only enterprise users (user_type_id = 1) can reject applicants for their own job offers.
 * Rolls back on failure and returns a standardized JSON response.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - creator_id: (int) ID of the enterprise user (must be the creator of the offer)
 *     - user_id: (int) ID of the applicant to reject
 *     - application_id: (int) ID of the job offer
 *
 * Example:
 *   PUT /src/API/requests/enterprise/reject-application.php
 *   Body: { "creator_id": 5, "user_id": 12, "application_id": 7 }
 *   Response: { "status": "success", "message": "Postulante rechazado con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->user_id) || !isset($data->application_id)) return_response("failed", "Faltan datos obligatorios.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
$creator_id = intval($_SESSION['user']['id']);
$user_id = intval($data->user_id);
$application_id = intval($data->application_id);
$accepted_status_id = 2; // REJECTED

try{
    $connection->beginTransaction();
    // Verificar que el creator_id es una empresa
    $stmt = $connection->prepare("SELECT user_type_id FROM users WHERE id = :id");
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || intval($user['user_type_id']) !== 1){
        return_response("failed", "El usuario no tiene permisos para aceptar postulantes.", null);
    }

    // Verificar que esa oferta fue creada por esa empresa
    $stmt = $connection->prepare("SELECT * FROM applications WHERE id = :application_id AND creator_id = :creator_id");
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $application = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$application) {
        return_response("failed", "No se encontró la oferta de trabajo o no pertenece al usuario.", null);
    }

    // Actualizar estado del postulante
    $stmt = $connection->prepare("UPDATE applicants SET status_id = :status_id WHERE user_id = :user_id AND application_id = :application_id");
    $stmt->bindParam(':status_id', $accepted_status_id, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $connection->commit();
        return_response("success", "Postulante rechazado con éxito.", null);
    } else {
        $connection->rollBack();
        return_response("failed", "No se pudo rechazar al postulante o ya fue rechazado anteriormente.", null);
    }
}catch (PDOException $e){
    if ($connection->inTransaction()) {
        $connection->rollBack();
    }
    return_response("failed", "Error en el servidor:" . $e->getMessage(), null);
}

?>