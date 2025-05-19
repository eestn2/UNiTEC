<?php

require_once __DIR__ . '/../requests/cors-policy.php';
require_once __DIR__ . '/../logic/connection.php';
require_once __DIR__ . '/../requests/function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    return_response("failed", "Metodo no permitido.", null);
    exit;
}

// Verificar que se haya enviado el archivo y el ID del usuario
if (!isset($_FILES['profile_picture']) || !isset($_POST['user_id'])) {
    return_response("failed", "Faltan datos requeridos.", null);
    exit;
}

$userID = intval($_POST['user_id']);
if ($userID <= 0) {
    return_response("failed", "ID de usuario inválido.", null);
    exit;
}

$file = $_FILES['profile_picture'];

// Validar errores en la carga
if ($file['error'] !== UPLOAD_ERR_OK) {
    return_response("failed", "Error al cargar el archivo.", null);
    exit;
}

// Validar extensión
$allowed_extensions = ['jpg', 'jpeg', 'png', 'gif'];
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, $allowed_extensions)) {
    return_response("failed", "Tipo de archivo no permitido.", null);
    exit;
}

// Validar MIME type
$mime_types = ['image/jpeg', 'image/png', 'image/gif'];
$mime = mime_content_type($file['tmp_name']);
if (!in_array($mime, $mime_types)) {
    return_response("failed", "El archivo no es una imagen válida.", null);
    exit;
}

// Limitar tamaño de archivo (ejemplo: 5MB)
$max_size = 5 * 1024 * 1024;
if ($file['size'] > $max_size) {
    return_response("failed", "El archivo excede el tamaño máximo permitido (2MB).", null);
    exit;
}

// Crear nombre único y mover imagen
$filename = uniqid("profile_") . "." . $extension;
$uploadDir = __DIR__ . '/../uploads/profile_pictures/';
$uploadPath = $uploadDir . $filename;

// Asegurar que el directorio exista
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}
if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
    return_response("failed", "Error al mover el archivo.", null);
    exit;
}

// Ruta relativa para guardar en base de datos
$relativePath = '/uploads/profile_pictures/' . $filename;

// Actualizar la base de datos
try {
    $stmt = $connection->prepare("UPDATE users SET profile_picture = :path WHERE id = :id");
    $stmt->execute([
        ':path' => $relativePath,
        ':id' => $userID
    ]);
    return_response("success", "Imagen de perfil actualizada con éxito.", null);
} catch (PDOException $e) {
    return_response("failed", "Error al actualizar la base de datos.", null);
    exit;
}
?>