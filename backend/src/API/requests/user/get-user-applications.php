<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : null;
if (!$user_id || $user_id <= 0) return_response(status::BAD_REQUEST, "Falta el ID del usuario o es inválido.");

try {
    // Verificar que el user_id es un postulante (user_type = 2)
    $stmt = $connection->prepare("SELECT user_type FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || !in_array(intval($user['user_type']), [2, 3])) return_response(status::FORBIDDEN, "El usuario no tiene permisos para ver postulaciones.");

    // Traer todas las postulaciones del usuario
    $query = $connection->prepare("
        SELECT
            applicants.id AS applicant_id,
            applicants.offer_id AS application_id,
            offers.title,
            offers.description,
            offers.date,
            applicants.status AS application_status
        FROM
            applicants
        JOIN 
            offers ON applicants.offer_id = offers.id
        WHERE
            applicants.user_id = ?
    ");

    $query->execute([$user_id]);
    $applications = $query->fetchAll(PDO::FETCH_ASSOC);

    if ($applications) return_response(status::OK, "Postulaciones encontradas.", $applications);
    return_response(status::NOT_FOUND, "No se encontraron postulaciones.");
} catch (PDOException $e) {
    return_response(status::INTERNAL_SERVER_ERROR, "Error al recuperar las postulaciones.");
}
?>
