<?php
/**
 * @file get-active-offers.php
 * @description API endpoint to retrieve all active job offers created by a specific enterprise user.
 * Handles GET requests, validates the creator_id parameter, and returns all job offers with active status (status = 1) for the given creator.
 * Returns a standardized JSON response with the list of active offers or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a GET request with the creator_id as a query parameter:
 *     - creator_id: (int) ID of the enterprise user whose active offers are requested
 *
 * Example:
 *   GET /src/API/requests/enterprise/get-active-offers.php?creator_id=5
 *   Response: { "status": "success", "message": "Ofertas de trabajo activas encontradas.", "data": [ ... ] }
 */

require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Método no permitido.", null);

if (!isset($_GET['creator_id'])) return_response("failed", "Falta el parámetro creator_id.", null);

$creator_id = intval($_GET['creator_id']);
if ($creator_id <= 0) return_response("failed", "creator_id inválido.", null);

$active_status = 1; // Active status

try{
    $stmt = $connection->prepare("SELECT * from applications WHERE creator_id = :creator_id AND status = :status");
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->bindParam(':status', $active_status, PDO::PARAM_INT);
    $stmt->execute();
    $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$applications) {
        return_response("failed", "No se encontraron ofertas de trabajo activas para el usuario.", null);
    }else{
        return_response("success", "Ofertas de trabajo activas encontradas.", $applications);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al obtener las ofertas de trabajo activas.", null);
}
?>