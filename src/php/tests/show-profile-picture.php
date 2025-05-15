<?php
require_once __DIR__ . '/../logic/connection.php';

$userID = 1; // en un caso real, esto vendría de sesión

$stmt = $connection->prepare("SELECT profile_picture FROM users WHERE id = :id");
$stmt->execute([':id' => $userID]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Si el usuario tiene imagen, usarla; si no, usar una imagen por defecto
$imagePath = $user && $user['profile_picture']
    ? $user['profile_picture']
    : '/assets/default-profile.png';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Imagen de Perfil</title>
</head>
<body>
    <h2>Imagen de perfil actual</h2>
    <img src="http://localhost/UNITEC<?= htmlspecialchars($imagePath) ?>" alt="Imagen de perfil" style="max-width: 200px; max-height: 200px;">
    <p>Esta es la imagen de perfil actual del usuario ID <?= $userID ?>.</p>
</body>
</html>