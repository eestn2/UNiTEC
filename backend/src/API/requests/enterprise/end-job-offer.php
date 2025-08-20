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
 *     - offer_id: (int) ID of the job offer to close
 *     - creator_id: (int) ID of the enterprise user (must be the creator)
 *
 * Example:
 *   PUT /src/API/requests/enterprise/end-job-offer.php
 *   Body: { "offer_id": 7, "creator_id": 5 }
 *   Response: { "status": "success", "message": "Oferta marcada como cerrada correctamente.", "data": null }
 */

session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Método no permitido.", null);
if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->offer_id)) return_response("failed", "Faltan datos obligatorios.", null);

$offer_id = intval($data->offer_id);
$creator_id = $_SESSION["user"]["id"];
$status = 2; // Oferta de trabajo cerrada

// Verificar que el usuario sea el creador de la oferta
try {
    $stmt = $connection->prepare("SELECT * FROM offers WHERE id = :offer_id AND creator_id = :creator_id");
    $stmt->bindParam(':offer_id', $offer_id, PDO::PARAM_INT);
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$offer) return_response("failed", "No tienes permisos para modificar esta oferta.", null);

} catch (PDOException $e) {
    return_response("failed", "Error al verificar permisos.", null);
}

// Actualizar el estado de la oferta
try {
    $stmt = $connection->prepare("UPDATE offers SET `status` = 0 WHERE id = :offer_id");
    $stmt->bindParam(':offer_id', $offer_id, PDO::PARAM_INT);
    $stmt->execute();

    return_response("success", "Oferta marcada como cerrada correctamente.", null);
} catch (PDOException $e) {
    return_response("failed", "Error al actualizar la oferta.", null); 
}
?>