<?php

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

if ( !isset($data->reported_id) || !isset($data->reason)) return_response("failed", "Faltan datos.", null);

$reporter_id = $_SESSION['user'] ['id'];
$reported_id = intval($data->reported_id);
$reason = intval($data->reason);
if ($reporter_id <= 0 || $reported_id <= 0 || $reason <= 0) {
    return_response("failed", "Datos invalidos.", null);
}
try{
    try {
        $connection->beginTransaction();

        $stmt = $connection -> prepare( 
            "INSERT INTO reports (reporter_id, reported_id, reason) VALUES (?, ?, ?)");
        $stmt->execute([$reporter_id, $reported_id, $reason]);

        $connection->commit();
        return_response("success", "Reporte enviado con exito.", null);
    } catch (PDOException $e) {
        if ($connection->inTransaction()) {
            $connection->rollBack();
        }
        return_response("failed", "Error al insertar el reporte: " . $e->getMessage(), null);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al reportar usuario:" . $e->getMessage(), null);
}
?>