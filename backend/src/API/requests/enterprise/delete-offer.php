<?php
/**
 * @file delete-offer.php
 * @description API endpoint for deleting a job offer by its creator (enterprise) or an administrator.
 * Handles DELETE requests, verifies user permissions, checks offer ownership, and deletes the offer if authorized.
 * Only enterprise users (user_type = 1) and administrators (user_type = 4) can delete job offers.
 * Returns a standardized JSON response indicating success or failure.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a DELETE request with JSON body containing:
 *     - id: (int) ID of the job offer to delete
 *
 * Example:
 *   DELETE /src/API/requests/enterprise/delete-offer.php
 *   Body: { "id": 7 }
 *   Response: { "message": "Oferta de trabajo eliminada con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) return_response(status::BAD_REQUEST, "Faltan datos.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
$creator_id = intval($_SESSION['user']['id']);
$id = intval($data->id);

try{
    $stmt = $connection->prepare("SELECT user_type FROM users WHERE id = :id");
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) return_response(status::NOT_FOUND, "Usuario no encontrado.");
    $isAdmin = intval($user['user_type']) === 4;
    if (!in_array(intval($user['user_type']), [1, 4])) return_response(status::FORBIDDEN, "Solo las empresas o el administrador pueden eliminar ofertas de trabajo.");
}catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al verificar el tipo de usuario.");
}

try{
    if ($isAdmin) {
        $stmt = $connection->prepare("SELECT * FROM offers WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    } else {
        $stmt = $connection->prepare("SELECT * FROM offers WHERE id = :id AND creator_id = :creator_id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    }
    $stmt->execute();

    if (!$stmt->fetch()) return_response(status::NOT_FOUND, "No se encontró la oferta de trabajo o no pertenece al usuario.");

    $connection->beginTransaction();
    // Delete all applicants for this offer first
    $stmt = $connection->prepare("DELETE FROM applicants WHERE offer_id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    // Now delete the offer itself
    $stmt = $connection->prepare("DELETE FROM offers WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $connection->commit();
    return_response(status::OK, "Oferta de trabajo eliminada con éxito.");
}catch (PDOException $e){
    if ($connection->inTransaction()) $connection->rollBack();
    error_log("Error al eliminar la oferta de trabajo: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al eliminar la oferta de trabajo.");
}
?>