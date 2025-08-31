<?php

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

try {
    $stmt = $connection->query("SELECT * FROM tags");
    $tags = $stmt->fetchAll();
    return_response(status::OK, "Etiquetas recuperadas con éxito.", ["tags" => $tags]);
} catch (PDOException $e) {
    error_log("Error retrieving job tags: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar las etiquetas.");
}
?>