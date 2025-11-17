<?php
/**
 * @file postulated.php
 * @description API endpoint to check if the current user is postulated to a specific offer.
 * Handles GET requests, expects 'offer_id' as a query parameter, and returns a standardized JSON response.
 *
 * Usage:
 *   GET /src/API/requests/user/postulated.php?offer_id=123
 *   Response: { "status": "success", "postulated": true/false }
 */

session_start();

require_once __DIR__ . '/../cors-policy.php';
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';



if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "Usuario no autenticado.");
if (!isset($_GET['offer_id'])) return_response(status::BAD_REQUEST, "Falta el parámetro offer_id");

$user_id = $_SESSION['user']['id'];
$offer_id = intval($_GET['offer_id']);

try {
    $stmt = $connection->prepare("SELECT `status` FROM applicants WHERE user_id = ? AND offer_id = ?");
    $stmt->execute([$user_id, $offer_id]);

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $is_postulated = !$result ? false : true; // Default to not postulated if not found
    error_log("Debug: user_id=$user_id, offer_id=$offer_id, is_postulated=" . $is_postulated);
    return_response(status::OK, "Estado de postulación obtenido.", ["postulated" => $is_postulated]);
} catch (PDOException $e) {
    error_log("Error checking postulation status: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al verificar estado de postulación.");
}

?>
