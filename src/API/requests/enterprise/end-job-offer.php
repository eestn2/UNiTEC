<?php
/**
 * @file end-job-offer.php
 * @description API endpoint for marking a job offer as closed by its creator (enterprise).
 * Handles PUT requests, verifies that the user is the creator of the offer, and updates the offer status to closed.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - application_id: (int) ID of the job offer to close
 *     - creator_id: (int) ID of the enterprise user (must be the creator)
 *
 * Example:
 *   PUT /src/API/requests/enterprise/end-job-offer.php
 *   Body: { "application_id": 7, "creator_id": 5 }
 *   Response: { "status": "success", "message": "Oferta marcada como cerrada correctamente.", "data": null }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Método no permitido.", null);

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->application_id) || !isset($data->creator_id)) return_response("failed", "Faltan datos obligatorios.", null);

$application_id = intval($data->application_id);
$creator_id = intval($data->creator_id);
$status = 2; // Oferta de trabajo cerrada

// Verificar que el usuario sea el creador de la oferta
try {
    $stmt = $connection->prepare("SELECT * FROM applications WHERE id = :application_id AND creator_id = :creator_id");
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $application = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$application) {
        return_response("failed", "No tienes permisos para modificar esta oferta.", null);
    }
} catch (PDOException $e) {
    return_response("failed", "Error al verificar permisos: " . $e->getMessage(), null);
}

// Actualizar el estado de la oferta
try {
    $stmt = $connection->prepare("UPDATE applications SET status = :status WHERE id = :application_id");
    $stmt->bindParam(':status', $status, PDO::PARAM_INT); 
    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->execute();

    return_response("success", "Oferta marcada como cerrada correctamente.", null);
} catch (PDOException $e) {
    return_response("failed", "Error al actualizar la oferta.", null); // Don't expose $e->getMessage()
}
?>