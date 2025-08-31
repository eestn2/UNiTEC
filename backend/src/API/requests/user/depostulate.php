<?php

session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));
if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
if (!$data || !isset($data->offer_id)) return_response(status::BAD_REQUEST, "Faltan datos obligatorios.");

$offer_id = $data->offer_id = intval($data->offer_id);

try {
    $connection->beginTransaction();

    $stmt = $connection->prepare("SELECT `status` FROM offers WHERE id = ?");
    $stmt->execute([$offer_id]);
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$offer) return_response(status::NOT_FOUND, "La oferta no existe.");
    if ($offer['status'] == 0) return_response(status::GONE, "La oferta ya está cerrada.");
    
    $query = "DELETE FROM applicants WHERE user_id = :id AND offer_id = :offer_id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $_SESSION['user']['id'], PDO::PARAM_INT);
    $stmt->bindParam(':offer_id', $data->offer_id, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        $connection->rollBack();
        return_response(status::NOT_FOUND, "No se encontró la postulación.");
    }
    
    $connection->commit();
    return_response(status::OK, "Postulación retirada con éxito.");

} catch(PDOException $e) {
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al retirar la postulación.");
}
?>