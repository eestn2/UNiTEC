<?php
/**
 * @file publish-offer.php
 * @description API endpoint for publishing a new job offer by an enterprise user.
 * Handles POST requests, verifies that the user is an enterprise, and inserts the new job offer into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing:
 *     - title: (string) Title of the job offer
 *     - description: (string) Description of the job offer
 *
 * Example:
 *   POST /src/API/requests/enterprise/publish-offer.php
 *   Body: { "creator_id": 5, "title": "Frontend Developer", "description": "Buscamos desarrollador frontend..." }
 *   Response: { "status": "success", "message": "Oferta de trabajo publicada con exito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);
// Validate session and user authentication
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) {
    return_response("failed", "Usuario no autenticado.", null);
}
$creator_id = $_SESSION['user']['id'];
$data = json_decode(file_get_contents("php://input"));

if ( !isset($data->title) || !isset($data->description) || !isset($data->languages) || !isset($data->tags) ) return_response("failed", "Faltan datos.", null);

$title = trim($data->title);
$description = trim($data->description);
$date = date('Y-m-d H:i:s');
$status = 1; // Oferta de trabajo abierta
$user_languages = $data->languages ?? [];
$user_tags = $data->tags ?? [];

try{
    $stmt = $connection->prepare("SELECT user_type FROM users WHERE id = :id");
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        return_response("failed", "Usuario no encontrado.", null);
    }
    if (intval($user['user_type']) !== 1){
        return_response("failed", "Solo las empresas pueden publicar ofertas de trabajo.", null);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al verificar el tipo de usuario:" . $e->getMessage(), null);
}

try {
    $connection->beginTransaction();

    $query = "INSERT INTO offers (creator_id, title, date, description, status) VALUES (:id, :title, :date, :description, :status)";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $creator_id, PDO::PARAM_INT);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':status', $status, PDO::PARAM_INT);
    $stmt->execute();


    $connection->commit();
    return_response("success", "Oferta de trabajo publicada con exito.", null);
} catch (PDOException $e) {
    if ($connection->inTransaction()) {
        $connection->rollBack();
    }
    return_response("failed", "Error al insertar la oferta de trabajo: " . $e->getMessage(), null);
}
?>