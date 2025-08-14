<?php
/**
 * @file edit-user.php
 * @description API endpoint for editing user profile information.
 * Handles PUT requests, validates input, and updates allowed user fields in the database.
 * Only updates fields that are present in the request and allowed for editing.
 * Returns a standardized JSON response indicating success or failure, and returns the updated user data on success.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing the user fields to update.
 *   Only the following fields can be updated: name, birth_date, location, email, description, profile_picture, portfolio.
 *
 * Example:
 *   PUT /src/API/requests/session/edit-user.php
 *   Body: { "id": 7, "name": "Nuevo Nombre", "location": "Ciudad" }
 *   Response: { "status": "success", "message": "Usuario actualizado correctamente", "data": { ...usuario actualizado... } }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    return_response("failed", "Method not allowed", null);
}

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    return_response("failed", "No se recibieron datos", null);
}
session_start();
if (!isset($_SESSION['user']['id'])) {
    return_response("failed", "No se ha iniciado sesión", null);
}
$user = $_SESSION['user'];

$allowed_fields = ["name", "birth_date", "user_type", "status", "location", "email", "description", "profile_picture", "portfolio", "languages", "tags", "languages_levels", "tags_levels"];
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