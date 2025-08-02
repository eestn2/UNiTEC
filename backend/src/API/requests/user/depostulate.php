<?php

session_start();

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
if (!is_admin($_SESSION['user']['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden eliminar usuarios.", null);
}

$data->offerId = intval($data->offerId);

try {
    $connection->beginTransaction();
    $query = "DELETE FROM applicants WHERE user_id = :id AND offer_id = :offerId";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    $connection->commit();
    return_response("success", "Usuario eliminado con exito.", null);

} catch(PDOException $e) {
    return_response("failed", "Error al eliminar el usuario: " . $e->getMessage(), null);
}
?>