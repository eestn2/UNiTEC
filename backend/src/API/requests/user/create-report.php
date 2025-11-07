<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->reported_id) || !isset($data->reason)) return_response(status::BAD_REQUEST, "Faltan datos obligatorios.");
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "Usuario no autenticado.");

$reporter_id = $_SESSION['user']['id'];
$reported_id = intval($data->reported_id);
$reason = intval($data->reason);
if ($reporter_id <= 0 || $reported_id <= 0 || $reason <= 0) return_response(status::BAD_REQUEST, "Datos inválidos.");

try {
    $connection->beginTransaction();
    $stmt = $connection->prepare( 
        "INSERT INTO reports (reporter_id, reported_id, reason) VALUES (?, ?, ?)");
    $stmt->execute([$reporter_id, $reported_id, $reason]);
    $connection->commit();
    return_response(status::CREATED, "Reporte enviado con éxito.");
} catch (PDOException $e) {
    if ($connection->inTransaction()) $connection->rollBack();
    return_response(status::INTERNAL_SERVER_ERROR, "Error al reportar usuario.");
}
?>