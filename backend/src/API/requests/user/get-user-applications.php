<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    return_response("failed", "Metodo no permitido.", null);
    exit;
}

$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : null;
if (!$user_id || $user_id <= 0) {
    return_response("failed", "Falta el ID del usuario.", null);
    exit;
}

try {
    // Verificar que el user_id es un postulante (user_type = 2)
    $stmt = $connection->prepare("SELECT user_type FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || !in_array(intval($user['user_type']), [2, 3])) {
        return_response("failed", "El usuario no tiene permisos para ver postulaciones.", null);
        exit;
    }

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

    if ($applications) {
        return_response("success", "Postulaciones encontradas.", $applications);
    } else {
        return_response("failed", "No se encontraron postulaciones.", null);
    }
} catch (PDOException $e) {
    return_response("failed", "Error en la consulta: " . $e->getMessage(), null);
}
?>
