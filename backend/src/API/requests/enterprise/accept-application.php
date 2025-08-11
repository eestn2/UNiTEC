<?php
/**
 * @file accept-application.php
 * @description API endpoint for enterprises to accept a job application (postulante).
 * Handles PUT requests, verifies permissions, checks application ownership, and updates applicant `status`.
 * Ensures only enterprise users (user_type_id = 1) can accept applicants for their own job offers.
 * Rolls back on failure and returns a standardized JSON response.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - creator_id: (int) ID of the enterprise user (must be the creator of the offer)
 *     - user_id: (int) ID of the applicant to accept
 *     - offer_id: (int) ID of the job offer
 *
 * Example:
 *   PUT /src/API/requests/enterprise/accept-application.php
 *   Body: { "creator_id": 5, "user_id": 12, "offer_id": 7 }
 *   Response: { "`status`": "success", "message": "Postulante aceptado con éxito.", "data": null }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->creator_id) || !isset($data->user_id) || !isset($data->offer_id)) return_response("failed", "Faltan datos obligatorios.", null);

$creator_id = intval($data->creator_id);
$user_id = intval($data->user_id);
$offer_id = intval($data->offer_id);

try{
    $connection->beginTransaction();
    // Verificar que el creator_id es una empresa
    $stmt = $connection->prepare("SELECT user_type FROM users WHERE id = :id");
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || intval($user['user_type']) !== 1){
        return_response("failed", "El usuario no tiene permisos para aceptar postulantes.", null);
    }

    // Verificar que esa oferta fue creada por esa empresa
    $stmt = $connection->prepare("SELECT * FROM offers WHERE id = :offer_id AND creator_id = :creator_id");
    $stmt->bindParam(':offer_id', $offer_id, PDO::PARAM_INT);
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $application = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$application) {
        return_response("failed", "No se encontró la oferta de trabajo o no pertenece al usuario.", null);
    }

    
    // Actualizar estado del postulante
    
    $stmt = $connection->prepare("UPDATE applicants SET `status` = 1 WHERE user_id = :user_id AND offer_id = :offer_id");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->bindParam(':offer_id', $offer_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $connection->commit();
        return_response("success", "Postulante aceptado con éxito.", null);
    } else {
        $connection->rollBack();
        return_response("failed", "No se pudo aceptar al postulante o ya fue aceptado anteriormente.", null);
    }
}catch (PDOException $e){
    if ($connection->inTransaction()) {
        $connection->rollBack();
    }
    return_response("failed", "Error en el servidor:" . $e->getMessage(), null);
}

?>