<?php
/**
 * @file get-offers-and-applicants.php
 * @description API endpoint to retrieve all available offers and their applicants from the database.
 * Handles GET requests, queries the offers table, and returns a standardized JSON response with the list of offers or an error message.
 * @author Francesco Sidotti
 * @date June 6, 2025
 *
 * Usage:
 *   Send a GET request to this endpoint to receive all offers with their respective applicants.
 *
 * Example:
 *   GET /src/API/requests/enterprise/get-offers-and-applicants.php
 *   Response: { "status": "success", "message": "offers retrieved successfully.", "data": { "offers": [applicants[...], ... ] } }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

// Validate session and user authentication
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) {
    return_response("failed", "Usuario no autenticado.", null);
}


try {
    $stmt = $connection->prepare("SELECT * FROM offers WHERE creator_id = :id AND status = 1");
    // Verify user has enterprise role
    if (!isset($_SESSION['user']['user_type']) || $_SESSION['user']['user_type'] != 3) {
        return_response("failed", "Acceso no autorizado. Solo disponible para empresas.", null);
    }
    $stmt->execute(['id' => $_SESSION['user']['id']]);
    $offers = $stmt->fetchAll();
    // Fetch all applicants for the offers in a single query
    if (!empty($offers)) {
        $offerIds = array_column($offers, 'id');
        $placeholders = str_repeat('?,', count($offerIds) - 1) . '?';
        $applicantsStmt = $connection->prepare("SELECT * FROM applicants WHERE offer_id IN ($placeholders)");
        $applicantsStmt->execute($offerIds);
        $allApplicants = $applicantsStmt->fetchAll();
        
        // Group applicants by offer_id
        $applicantsByOffer = [];
        foreach ($allApplicants as $applicant) {
            $applicantsByOffer[$applicant['offer_id']][] = $applicant;
        }
        
        // Assign applicants to their respective offers
        foreach ($offers as &$offer) {
            $offer['applicants'] = $applicantsByOffer[$offer['id']] ?? [];
        }
    }
    return_response("success", "offers retrieved successfully.", ["offers" => $offers]);
} catch (PDOException $e) {
    error_log("Error retrieving job offers: " . $e->getMessage());
    // Don't expose internal database errors to client
    if (strpos($e->getMessage(), 'Connection') !== false) {
       return_response("failed", "Servicio temporalmente no disponible.", null);
    } else {
        return_response("failed", "Error retrieving offers.", null);
    }
}
?>