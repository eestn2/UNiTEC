<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/connection.php";
require_once __DIR__ . "/../function/return_response.php";
require_once __DIR__ . "/../function/get-user-from-request.php";

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    return_response("failed", "Method not allowed", null);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    return_response("failed", "No se recibieron datos", null);
    exit;
}

$user = get_user_from_request($data);
if (!$user || !isset($user['id'])) {
    return_response("failed", "Usuario no encontrado", null);
    exit;
}

$allowed_fields = ["name", "birth_date", "location", "email", "description", "profile_picture", "portfolio"];
$fields_to_update = [];
$params = [];

foreach ($allowed_fields as $field) {
    if (isset($data->$field)) {
        $value = $data->$field;
        $fields_to_update[] = "$field = :$field";
        $params[":$field"] = is_string($value) ? trim($value) : $value;
    }
}

if (empty($fields_to_update)) {
    return_response("failed", "No se recibieron datos para actualizar", null);
    exit;
}

$params[":id"] = $user['id'];
$sql = "UPDATE users SET " . implode(", ", $fields_to_update) . " WHERE id = :id";

try {
    $query = $connection->prepare($sql);
    $query->execute($params);

    if ($query->rowCount() > 0) {
        //Traer y devolver el usuario actualizado
        $updated = $connection->prepare("SELECT * FROM users WHERE id = ?");
        $updated->execute([$user['id']]);
        $updated_user = $updated->fetch(PDO::FETCH_ASSOC);

        return_response("success", "Usuario actualizado correctamente", $updated_user);
    } else {
        return_response("failed", "No se realizó ningún cambio.", null);
    }
} catch (PDOException $e) {
    // Log the error server-side if needed
    return_response("failed", "Error al actualizar el usuario.", null);
}
?>