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

require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '/../function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

// Query to fetch all job offers
$query = "SELECT * FROM applications";
$result = $connection->query($query);

// Handle query failure
if (!$result) return_response("failed", "Error retrieving job offers: " . $connection->error, null); 

$jobOffers = [];
// Fetch all rows and store them in an array
while ($row = $result->fetch_assoc()) $jobOffers[] = $row;

return_response("success", "Job offers retrieved successfully.", ["job_offers" => $jobOffers]);
?>