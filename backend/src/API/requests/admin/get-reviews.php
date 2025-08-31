<?php
session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!is_admin($_SESSION['user']['id'], $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden ver las reseñas.");

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
    return_response(status::OK, "Reseñas recuperadas correctamente.", ["reviews" => $reviews]);
} catch (PDOException $e) {
    error_log("Error retrieving reviews: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar las reseñas.");
}

?>