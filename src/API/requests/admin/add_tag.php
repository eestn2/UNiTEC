<?php
require_once __DIR__ . "../cors-policy.php";
require_once __DIR__ . '/../../logic/connection.php';
require_once __DIR__ . '/../../logic/isAdmin.php';
require_once __DIR__ . '/../function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (  !isset($data->user_id)|| !isset($data->name)) return_response("failed", "Faltan datos.", null);

if (!isAdmin($data->user_id, $connection)) {
 return_response("failed", "Solo los administradores pueden agregar tags.", null);
}
$name = $data->name;
try{
    $query = "INSERT INTO tags (name) VALUES (:name)";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "tag insertada con exito.", null);
}catch(PDOException $e) {
    return_response("failed","Error al insertar la tag". $e->getMessage(), null);
}
?>