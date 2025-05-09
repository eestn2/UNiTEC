<?php
// A partir de la ID de usuario, devolver nombre y foto de perfil
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '/../function/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response("failed", "Metodo no permitido.", null);
// Retrieve the user ID from the query parameters
if (!isset($_GET['id'])) return_response("failed", "Ocurrio un error, intente de nuevo.", null);

$id = intval($_GET['id']); // Ensure the ID is an integer
$stmt = $connection->prepare("SELECT name, profile_picture FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) return_response("failed", "Usuario no encontrado.", null);

return_response("success", "Datos del usuario devueltos correctamente.", [
    "user" => [
        "name" => $user["name"],
        "profile_picture" => $user["profile_picture"]
    ]
]);

$stmt->close();
?>