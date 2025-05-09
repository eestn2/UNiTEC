<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '../function/return_response.php';
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);
?>