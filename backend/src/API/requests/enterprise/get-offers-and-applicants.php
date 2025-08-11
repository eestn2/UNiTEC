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


if (!isset($_SESSION['user']['id'])) {
    return_response("failed", "No se ha iniciado sesión", null);
}

try {
    $stmt = $connection->prepare("
        SELECT 
            o.id AS offer_id, o.title, o.description, o.creator_id, o.status,
            a.status AS applicant_status,
            u.id AS user_id, u.name, u.profile_picture
        FROM offers o
        LEFT JOIN applicants a ON o.id = a.offer_id
        LEFT JOIN users u ON a.user_id = u.id
        WHERE o.creator_id = :id
    ");
    $stmt->execute(['id' => $_SESSION['user']['id']]);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $offers = [];

    foreach ($results as $row) {
        $offerId = $row['offer_id'];

        if (!isset($offers[$offerId])) {
            $offers[$offerId] = [
                'id' => $offerId,
                'creator_id' => $row['creator_id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'status' => $row['status'],
                'applicants' => []
            ];
        }

        if ($row['user_id'] !== null) {
            $offers[$offerId]['applicants'][] = [
                'id' => $row['user_id'],
                'name' => $row['name'],
                'profile_picture' => $row['profile_picture'],
                'status' => $row['applicant_status'] !== null ? intval($row['applicant_status']) : null
            ];
        }
    }

    return_response("success", "offers retrieved successfully.", [ "offers" => array_values($offers) ]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>