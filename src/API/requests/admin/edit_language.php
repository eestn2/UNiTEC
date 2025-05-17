<?php
require_once __DIR__ . "../cors-policy.php";
require_once __DIR__ . '/../../logic/connection.php';
require_once __DIR__ . '/../../logic/isAdmin.php';
require_once __DIR__ . '/../function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "PUT") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (  !isset($data->user_id)|| !isset($data->id) || !isset($data->name)) return_response("failed", "Faltan datos.", null);

if (!isAdmin($data->user_id, $connection)) {
 return_response("failed", "Solo los administradores pueden cambiar lenguajes.", null);
}
$data->id = intval($data->id);
$name = $data->name;
try{
    $query = "UPDATE languages SET name = :name WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
    $stmt->execute();
    $connection->beginTransaction();
    $connection->commit();
    return_response("success", "lenguaje editado con exito.", null);

}catch(PDOException $e) {
    return_response("failed","Error al editar el lenguaje". $e->getMessage(), null);
}
?>