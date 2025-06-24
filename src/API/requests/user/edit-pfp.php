<?php
/**
 * @file edit-pfp.php
 * @description Recibe imagen en base64 por JSON, la guarda y actualiza la base de datos.
 * Acepta solo POST con JSON. Límite: 2 MB. Tipos válidos: jpg, jpeg, png.
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

include_once(__DIR__ . '/../../DotEnv.php');

// Load environment variables from .env file
(new DotEnv(__DIR__ . '/../../../../.env'))->load();

// Select configuration based on environment
$env = getenv('ENVIRONMENT');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    return_response("failed", "Método no permitido. Solo POST.", null);
}
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user']['id'])) {
    return_response("failed", "No autenticado.", null);
}
$id = intval($_SESSION['user']['id']);

// Leer y decodificar el JSON
$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->profile_picture) || !isset($data->filename) || !isset($data->type)
) {
    return_response("failed", "Datos inválidos.", null);
}

$base64_image = $data->profile_picture;
$filename = $data->filename;
$mime_type = $data->type;

// Validar tipo MIME y extensión
$allowed_types = ['image/jpeg', 'image/png'];
$allowed_exts = ['jpg', 'jpeg', 'png'];

$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if (!in_array($mime_type, $allowed_types) || !in_array($ext, $allowed_exts)) {
    return_response("failed", "Formato de imagen no permitido. Solo JPG o PNG.", null);
}

// Extraer solo los datos base64 si viene con encabezado
if (strpos($base64_image, 'base64,') !== false) {
    $base64_image = explode('base64,', $base64_image, 2)[1];
}

// Decodificar base64
$image_data = base64_decode($base64_image);
if ($image_data === false) {
    return_response("failed", "No se pudo decodificar la imagen.", null);
}

// Validar tamaño (2 MB)
$max_file_size = 2 * 1024 * 1024;
if (strlen($image_data) > $max_file_size) {
    return_response("failed", "La imagen es demasiado grande. Máximo 2 MB.", null);
}

// Crear carpeta si no existe
$upload_dir = __DIR__ . '/../../uploads/profile-pictures/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// BORRAR TODAS LAS FOTOS ANTERIORES DEL USUARIO EN /uploads/profile-pictures/
$files = glob($upload_dir . "profile_{$id}_*");
foreach ($files as $file) {
    if (is_file($file)) {
        unlink($file);
    }
}

// Generar nombre único y guardar archivo
$unique_filename = uniqid("profile_{$id}_") . '.' . $ext;
$target_path = $upload_dir . $unique_filename;
$API_base_url = $env === 'production' ? getenv('API_BASE_URL_PROD') : getenv('API_BASE_URL_DEV');
$picture_path = $API_base_url . "/uploads/profile-pictures/" . $unique_filename;

if (file_put_contents($target_path, $image_data) === false) {
    return_response("failed", "No se pudo guardar la imagen.", null);
}

// Actualizar base de datos
try {
    $stmt = $connection->prepare("UPDATE users SET profile_picture = ? WHERE id = ?");
    $stmt->execute([$picture_path, $id]);

    if ($stmt->rowCount() === 0) {
        return_response("failed", "Usuario no encontrado o sin cambios.", null);
    }

    return_response("success", "Foto de perfil actualizada correctamente.", [
        "path" => $picture_path,
    ]);
} catch (PDOException $e) {
    error_log("Error en DB: " . $e->getMessage());
    return_response("failed", "Error al actualizar la base de datos.", null);
}
?>