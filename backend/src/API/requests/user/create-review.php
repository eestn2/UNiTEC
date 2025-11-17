<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->reviewed_id) || !isset($data->text)) return_response(status::BAD_REQUEST, "Faltan datos obligatorios.");

// Validate session and user authentication
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "Usuario no autenticado.");

$user_id = $_SESSION['user']['id'];
$reviewed_id = intval($data->reviewed_id);
$text = trim($data->text);
if ($user_id <= 0 || $reviewed_id <= 0 || empty($text)) return_response(status::BAD_REQUEST, "Datos inválidos.");

try {
    $connection->beginTransaction();
    $stmt = $connection->prepare(
        "INSERT INTO reviews (user_id, reviewed_id, text) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $reviewed_id, $text]);
    $connection->commit();
    return_response(status::CREATED, "Reseña enviada con éxito.");
} catch (PDOException $e) {
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al crear la reseña.");
}
?>