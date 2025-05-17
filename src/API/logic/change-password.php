<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/connection.php";
require_once __DIR__ . "/../function/return_response.php";

if ($_SERVER["REQUEST_METHOD"] !== "PATCH") {
    return_response("failed", "Metodo no permitido.", null);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id) || !isset($data->password) || !isset($data->new_password)) {
    return_response("failed", "Faltan datos requeridos.", null);
    exit;
}

$user_id = intval($data->id);
if ($user_id <= 0) {
    return_response("failed", "ID de usuario inválido.", null);
    exit;
}

// Validar la nueva contraseña (longitud mínima, etc.)
if (strlen($data->new_password) < 8) {
    return_response("failed", "La nueva contraseña debe tener al menos 8 caracteres.", null);
    exit;
}

try {
    // Verificar la contraseña actual
    $query = $connection->prepare("SELECT password FROM users WHERE id = :id");
    $query->execute([':id' => $user_id]);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    if (!$result || !password_verify($data->password, $result['password'])) {
        return_response("failed", "La contraseña actual es incorrecta.", null);
        exit;
    }

    // Evitar cambiar a la misma contraseña
    if (password_verify($data->new_password, $result['password'])) {
        return_response("failed", "La nueva contraseña no puede ser igual a la actual.", null);
        exit;
    }

    // Hashear la nueva contraseña
    $hashed_new_password = password_hash($data->new_password, PASSWORD_DEFAULT);
    if ($hashed_new_password === false) {
        return_response("failed", "Error al hashear la nueva contraseña.", null);
        exit;
    }

    // Actualizar la contraseña en la base de datos
    $update_query = $connection->prepare("UPDATE users SET password = :new_password WHERE id = :id");
    $update_query->execute([
        ':new_password' => $hashed_new_password,
        ':id' => $user_id
    ]);
    if ($update_query->rowCount() > 0) {
        return_response("success", "Contraseña cambiada correctamente.", null);
    } else {
        return_response("failed", "No se pudo cambiar la contraseña.", null);
    }
} catch (PDOException $e) {
    // Log the error server-side if needed
    return_response("failed", "Error al cambiar la contraseña.", null);
    exit;
}
?>