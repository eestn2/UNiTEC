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

try {
    $stmt = $connection->prepare("SELECT * FROM offers WHERE creator_id = :id AND status = 1");
    $stmt->execute(['id' => $_SESSION['user']['id']]);
    $offers = $stmt->fetchAll();
    foreach ($offers as &$offer) {
        // Fetch related applicants for each offer
        $offerId = $offer['id'];
        $applicantsStmt = $connection->prepare("SELECT * FROM applicants WHERE offer_id = :id");
        $applicantsStmt->execute([$offerId]);
        $offer['applicants'] = $applicantsStmt->fetchAll();
    }
    return_response("success", "offers retrieved successfully.", ["offers" => $offers]);
} catch (PDOException $e) {
    error_log("Error retrieving job offers: " . $e->getMessage());
    return_response("failed", "Error retrieving offers.", null);
}
?>