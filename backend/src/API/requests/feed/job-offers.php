<?php
/**
 * @file job-offers.php
 * @description API endpoint to retrieve all job offers from the database.
 * Handles GET requests, queries the database for job offers, and returns a JSON response.
 * @author Haziel Magallanes
 * @date May 11, 2025
 *
 * Usage:
 *   Send a GET request to this endpoint to receive all job offers.
 *
 * Example:
 *   GET /src/php/requests/feed/job-offers.php
 *   Response: { "status": "success", "message": "...", "data": { "job_offers": [ ... ] } }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

try {
    // Query to fetch all job offers, latest first
    $stmt = $connection->query("SELECT * FROM offers WHERE status != 0 ORDER BY id DESC");
    $jobOffers = $stmt->fetchAll();
    return_response("success", "Job offers retrieved successfully.", ["job_offers" => $jobOffers]);
} catch (PDOException $e) {
    error_log("Error retrieving job offers: " . $e->getMessage());
    return_response("failed", "Error retrieving job offers.", null);
}
?>