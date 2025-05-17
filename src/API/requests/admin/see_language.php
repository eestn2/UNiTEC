<?php

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../../API/logic/database/connection.php';
require_once __DIR__ . '/../../../API/logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);

try {
    $stmt = $connection->query("SELECT * FROM languages");
    $languages = $stmt->fetchAll();
    return_response("success", "languages retrieved successfully.", ["languages" => $languages]);
} catch (PDOException $e) {
    error_log("Error retrieving job languages: " . $e->getMessage());
    return_response("failed", "Error retrieving languages.", null);
}
?>