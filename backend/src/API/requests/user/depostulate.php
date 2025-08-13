<?php

session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);

$data->offerId = intval($data->offerId);

try {
    $connection->beginTransaction();

    $stmt = $connection->prepare("SELECT `status` FROM offers WHERE id = ?");
    $stmt->execute([$offer_id]);
    $offer = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$offer) return_response("failed", "La oferta no existe.", null);
    if ($offer['status'] == 0) return_response("failed", "La oferta ya cerro.", null);
    
    $query = "DELETE FROM applicants WHERE user_id = :id AND offer_id = :offerId";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $_SESSION['user']['id'], PDO::PARAM_INT);
    $stmt->bindParam(':offerId', $data->offerId, PDO::PARAM_INT);
    $stmt->execute();
    $connection->commit();
    return_response("success", "Usuario eliminado con exito.", null);

} catch(PDOException $e) {
    return_response("failed", "Error al eliminar el usuario: " . $e->getMessage(), null);
}
?>