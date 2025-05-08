<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';

if ($_SERVER["REQUEST_METHOD"] === "GET"){
    
} else {
    echo json_encode(["status" => "Failed", "message" => "Metodo no permitido"]);
}
?>