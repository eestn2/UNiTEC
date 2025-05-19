<?php

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    return_response("failed", "Metodo no permitido.", null);
}

// Retrieve and validate the user ID from the query parameters
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    return_response("failed", "Ocurrió un error, intente de nuevo.", null);
}

$id = intval($_GET['id']);

try {
    $stmt = $connection->prepare("SELECT * FROM applications WHERE id = ?");
    $stmt->execute([$id]);
    $offer = $stmt->fetch();

    if (!$offer) return_response("failed", "Oferta no encontrada.", null);
    return_response("success", "Datos de la oferta devueltos correctamente.", $offer);
} catch (PDOException $e) {
    error_log("Error retrieving user info: " . $e->getMessage());
    return_response("failed", "Error al recuperar la información del usuario.", null);
}
?>