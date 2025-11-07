<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");
// Retrieve and validate the offer ID from the query parameters
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) return_response(status::BAD_REQUEST, "ID de oferta inválido.");

$id = intval($_GET['id']);

try {
    $stmt = $connection->prepare("SELECT * FROM offers WHERE id = ?");
    $stmt->execute([$id]);
    $offer = $stmt->fetch();

    if (!$offer) return_response(status::NOT_FOUND, "Oferta no encontrada.");
    return_response(status::OK, "Datos de la oferta devueltos correctamente.", $offer);
} catch (PDOException $e) {
    error_log("Error retrieving job offer info: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar la información de la oferta.");
}
?>