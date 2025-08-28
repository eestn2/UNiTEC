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



if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

if (!isset($_SESSION['user']['id'])) return_response("failed", "Usuario no autenticado.", null);
if (!isset($_GET['offer_id'])) return_response("failed", "Falta el parametro offer_id", null);
$user_id = $_SESSION['user']['id'];
$offer_id = intval($_GET['offer_id']);

$stmt = $connection->prepare("SELECT `status` FROM applicants WHERE user_id = ? AND offer_id = ?");
$stmt->execute([$user_id, $offer_id]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);
// check if length of result is 0
$is_postulated = !$result ? false : true; // Default to not postulated if not found
error_log("Debug: user_id=$user_id, offer_id=$offer_id, is_postulated=" . $is_postulated);
return_response("success", "Estado de postulación obtenido.", ["postulated" => $is_postulated]);

?>
