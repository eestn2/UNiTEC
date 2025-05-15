<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connection.php';
require_once __DIR__ . '/../function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->creator_id) || !isset($data->title) || !isset($data->description)) return_response("failed", "Faltan datos.", null);

$creator_id = intval($data->creator_id);
$title = trim($data->title);
$description = trim($data->description);
$date = date('Y-m-d H:i:s');
$status = 1; // Default status

try {
    $connection->beginTransaction();
} catch (PDOException $e) {
    return_response("failed", "Error al iniciar la transacción: " . $e->getMessage(), null);
}

try{
    $query = "INSERT INTO applications (creator_id, title, date, description, status) VALUES (:creator_id, :title, :date, :description, :status)";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':creator_id', $creator_id, PDO::PARAM_INT);
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':status', $status, PDO::PARAM_INT);
    $stmt->execute();
    return_response("success", "Oferta de trabajo publicada con exito.", null);
    $connection->commit();
}catch (PDOException $e){
    return_response("failed", "Error al insertar la oferta de trabajo: " . $e->getMessage(), null);
}
?>
