<?php
/**
 * @file end-job-offer.php
 * @description API endpoint for marking a job offer as closed by its creator (enterprise).
 * Handles PUT requests, verifies that the user is the creator of the offer, and updates the offer status to closed.
 * Returns a standardized JSON response indicating success or failure.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - offer_id: (int) ID of the job offer to close
 *
 * Example:
 *   PUT /src/API/requests/enterprise/end-job-offer.php
 *   Body: { "offer_id": 7 }
 *   Response: { "message": "Oferta marcada como cerrada correctamente.", "data": null }
 */

session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");
if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->offer_id)) return_response(status::BAD_REQUEST, "Faltan datos obligatorios.");

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

    if (!$offer) return_response(status::FORBIDDEN, "No tienes permisos para modificar esta oferta.");

} catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al verificar permisos.");
}

// Actualizar el estado de la oferta
try {
    $stmt = $connection->prepare("UPDATE offers SET `status` = 0 WHERE id = :offer_id");
    $stmt->bindParam(':offer_id', $offer_id, PDO::PARAM_INT);
    $stmt->execute();

    return_response(status::OK, "Oferta marcada como cerrada correctamente.");
} catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al actualizar la oferta.");
}
?>