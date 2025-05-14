<?php

require_once __DIR__ . '/../requests/cors-policy.php';
require_once __DIR__ . '/../logic/connection.php';
require_once __DIR__ . '/../requests/function/return_response.php';


if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

// Verificar que se haya enviado el archivo y el ID del usuario
if (!isset($_FILES['profile_picture']) || !isset($_POST['user_id'])){
    return_response("failed", "Faltan datos requeridos.", null);
} 

$userID=$_POST['user_id'];
$file = $_FILES['profile_picture'];

// Validar errores en la carga
if ($file['error'] !== UPLOAD_ERR_OK) {
    return_response("failed", "Error al cargar el archivo.", null);
}
// Validar extensión
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// Crear nombre único y mover imagen
$filename = uniqid("profile_") . "." . $extension;
$uploadDir = __DIR__ . '/../../uploads/profile_pictures/';
$uploadPath = $uploadDir . $filename;

// Asegurar que el directorio exista
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}
if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
    return_response("failed", "Error al mover el archivo.", null);
}

// Ruta relativa para guardar en base de datos
$relativePath = '/uploads/profile_pictures/' . $filename;

// Actualizar la base de datos
$stmt = $connection->prepare("UPDATE users SET profile_picture = :path WHERE id = :id");
$stmt->execute([
    ':path' => $relativePath,
    ':id' => $userID
]);
return_response("success", "Imagen de perfil actualizada con éxito.", null);
?>