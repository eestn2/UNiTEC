<?php
/**
 * @file delete-offer.php
 * @description API endpoint for deleting a job offer by its creator (enterprise) or an administrator.
 * Handles DELETE requests, verifies user permissions, checks offer ownership, and deletes the offer if authorized.
 * Only enterprise users (user_type_id = 1) and administrators (user_type_id = 4) can delete job offers.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a DELETE request with JSON body containing:
 *     - creator_id: (int) ID of the user requesting deletion (must be the creator or admin)
 *     - id: (int) ID of the job offer to delete
 *
 * Example:
 *   DELETE /src/API/requests/enterprise/delete-offer.php
 *   Body: { "creator_id": 5, "id": 7 }
 *   Response: { "status": "success", "message": "Oferta de trabajo eliminada con éxito.", "data": null }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));
if (!isset($data->creator_id) || !isset($data->id)) return_response("failed", "Faltan datos.", null);

$creator_id = intval($data->creator_id);
$id = intval($data->id);

try{
    $stmt = $connection->prepare("SELECT user_type_id FROM users WHERE id = :id");
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        return_response("failed", "Usuario no encontrado.", null);
    }
    $isAdmin = intval($user['user_type_id']) === 4;
    if (!in_array(intval($user['user_type_id']), [1, 4])){
        return_response("failed", "Solo las empresas o el administrador pueden eliminar ofertas de trabajo.", null);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al verificar el tipo de usuario:" . $e->getMessage(), null);
}

try{
    if ($isAdmin) {
        $stmt = $connection->prepare("SELECT * FROM applications WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    } else {
        $stmt = $connection->prepare("SELECT * FROM applications WHERE id = :id AND creator_id = :creator_id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    }
    $stmt->execute();

    if (!$stmt->fetch()){
        return_response("failed", "No se encontró la oferta de trabajo o no pertenece al usuario.", null);
    }

    $connection->beginTransaction();
    $stmt = $connection->prepare("DELETE FROM applications WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $connection->commit();
    return_response("success", "Oferta de trabajo eliminada con éxito.", null);
}catch (PDOException $e){
    if ($connection->inTransaction()) {
        $connection->rollBack();
    }
    return_response("failed", "Error al eliminar la oferta de trabajo: " . $e->getMessage(), null);
}
?>