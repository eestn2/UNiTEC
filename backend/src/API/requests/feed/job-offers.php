<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") 
    return_response("failed", "Metodo no permitido.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
$userId = intval($_SESSION['user']['id']);
$userType = intval($_SESSION['user']['type'] ?? 2);
try {
    if ($userType === 4) {
        // Admin: return ALL offers (ignore everything)
        $stmt = $connection->query("SELECT * FROM offers ORDER BY id DESC");
        $jobOffers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return_response("success", "Job offers retrieved successfully.", ["job_offers" => $jobOffers]);
    }

    if ($userType === 1) {
        // Enterprise: return their own offers (all statuses) + other active offers
        $sql = "
            SELECT DISTINCT o.*
            FROM offers o
            WHERE 
                o.creator_id = :userId
                OR (o.status != 0)
            ORDER BY o.id DESC
        ";
        $stmt = $connection->prepare($sql);
        $stmt->execute([":userId" => $userId]);
        $jobOffers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return_response("success", "Job offers retrieved successfully.", ["job_offers" => $jobOffers]);
    }

    // Normal users (students, etc.)
    $sql = "
        SELECT o.*
        FROM offers o
        WHERE o.status != 0
        AND NOT EXISTS (
            SELECT 1 FROM applicants a
            WHERE a.offer_id = o.id
                AND a.user_id = :userId
                AND a.status = 2
        )
        ORDER BY o.id DESC
    ";

    $stmt = $connection->prepare($sql);
    $stmt->execute([":userId" => $userId]);
    $jobOffers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return_response("success", "Job offers retrieved successfully.", ["job_offers" => $jobOffers]);
} catch (PDOException $e) {
    error_log("Error retrieving job offers: " . $e->getMessage());
    return_response("failed", "Error retrieving job offers.", null);
}
?>