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

if (!isset($_SESSION['user']['user_type']) || $_SESSION['user']['user_type'] != 3) {
    return_response("failed", "Acceso no autorizado. Solo disponible para empresas.", null);
}

try {
    $stmt = $conn->prepare("
        SELECT 
            o.id AS offer_id, o.title, o.description, o.company_id,
            a.user_id AS applicant_user_id,
            u.id AS user_id, u.name, u.profile_picture
        FROM offers o
        LEFT JOIN applicants a ON o.id = a.offer_id
        LEFT JOIN users u ON a.user_id = u.id
    ");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $offers = [];

    foreach ($results as $row) {
        $offerId = $row['offer_id'];

        if (!isset($offers[$offerId])) {
            $offers[$offerId] = [
                'id' => $offerId,
                'title' => $row['title'],
                'description' => $row['description'],
                'company_id' => $row['company_id'],
                'applicants' => []
            ];
        }

        if ($row['user_id'] !== null) {
            $offers[$offerId]['applicants'][] = [
                'id' => $row['user_id'],
                'name' => $row['name'],
                'profile_picture' => $row['profile_picture']
            ];
        }
    }

    echo json_encode(array_values($offers));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>