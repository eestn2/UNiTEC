<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/notifications/send_notification.php';


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->offer_id)) return_response(status::BAD_REQUEST, "Faltan datos obligatorios.");

// Validate session and user authentication
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "Usuario no autenticado.");

$user_id = $_SESSION['user']['id'];
$offer_id = intval($data->offer_id);
if ($user_id <= 0 || $offer_id <= 0) return_response(status::BAD_REQUEST, "Datos inválidos.");

try {
    $connection->beginTransaction();

    $stmt = $connection->prepare("SELECT `status` FROM offers WHERE id = ?");
    $stmt->execute([$offer_id]);
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$offer) return_response(status::NOT_FOUND, "La oferta no existe.");
    if ($offer['status'] == 0) return_response(status::GONE, "La oferta ya está cerrada.");
    
    $stmt = $connection->prepare( 
        "INSERT INTO applicants (user_id, offer_id, `status`) VALUES (?, ?, 0)");
    $stmt->execute([$user_id, $offer_id]);

    $connection->commit();
    // Notify applicant
    send_notification(
        $connection,
        NotificationType::APPLICATION_RECEIVED,
        $user_id,
        ['offer_id' => $offer_id]
    );
    // Notify enterprise (offer creator)
    $stmt = $connection->prepare("SELECT creator_id FROM offers WHERE id = ?");
    $stmt->execute([$offer_id]);
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($offer && isset($offer['creator_id'])) {
        send_notification(
            $connection,
            NotificationType::ENTERPRISE_RECEIVED_APPLICATION,
            intval($offer['creator_id']),
            ['offer_id' => $offer_id, 'applicant_id' => $user_id]
        );
    }
    return_response(status::CREATED, "Usuario postulado con éxito.");
} catch (PDOException $e) {
    error_log("Error inserting postulation for user ID: $user_id, offer ID: $offer_id. Error: " . $e->getMessage());
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al insertar la postulación.");
}
?>