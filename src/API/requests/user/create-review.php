<?php

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->reviewed_id) || !isset($data->text)) return_response("failed", "Faltan datos.", null);

$user_id = $_SESSION['user'] ['id'] ;
$reviewed_id = intval($data->reviewed_id);
$text = trim($data->text);
if ($user_id <= 0 || $reviewed_id <= 0 || empty($text)) {
    return_response("failed", "Datos invalidos.", null);
}
try{
    try {
        $connection->beginTransaction();

        $stmt = $connection -> prepare( 
            "INSERT INTO reports (user_id, reviewed_id, text) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $reviewed_id, $text]);

        $connection->commit();
        return_response("success", "Resenia enviado con exito.", null);
    } catch (PDOException $e) {
        if ($connection->inTransaction()) {
            $connection->rollBack();
        }
        return_response("failed", "Error al insertar la resenia: " . $e->getMessage(), null);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al reseniar usuario:" . $e->getMessage(), null);
}
?>