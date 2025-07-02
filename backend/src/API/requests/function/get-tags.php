<?php

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

try {
    $stmt = $connection->query("SELECT * FROM tags");
    $tags = $stmt->fetchAll();
    return_response("success", "tags retrieved successfully.", ["tags" => $tags]);
} catch (PDOException $e) {
    error_log("Error retrieving job tags: " . $e->getMessage());
    return_response("failed", "Error retrieving tags.", null);
}
?>