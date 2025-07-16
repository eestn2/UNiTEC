<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden ver las reseñas.", null);
}

try {
    $stmt = $connection->prepare("
        SELECT r.*, 
            user.email AS user_email, 
            user.user_type AS user_type,
            reviewed.email AS reviewed_email
        FROM reviews r
        JOIN users user ON r.user_id = user.id
        JOIN users reviewed ON r.reviewed_id = reviewed.id
    ");
     $stmt->execute();
    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return_response("success", "reviews retrieved successfully.", ["reviews" => $reviews]);
} catch (PDOException $e) {
    error_log("Error retrieving reviews: " . $e->getMessage());
    return_response("failed", "Error retrieving reviews.", null);
}

?>