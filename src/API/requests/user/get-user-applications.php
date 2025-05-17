<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/connection.php";
require_once __DIR__ . "/../function/return_response.php";

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
    // Verificar que el user_id es un postulante
    $stmt = $connection->prepare("SELECT user_type_id FROM users WHERE id = :id");
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user || intval($user['user_type_id']) !== 2) {
        return_response("failed", "El usuario no tiene permisos para ver postulaciones.", null);
        exit;
    }

    // 3 = Pendiente
    $status_id = 3;

$query = $connection->prepare("
    SELECT
        applicants.id AS applicant_id,                           -- ID único de la postulación del usuario
        applicants.application_id,                                -- ID de la oferta de trabajo a la que se postuló
        applications.title,                                       -- Título de la oferta
        applications.description,                                 -- Descripción de la oferta
        applications.date,                                        -- Fecha de publicación de la oferta
        application_statuses.status AS application_status         -- Estado textual de la postulación (por ejemplo: pendiente, aceptada, rechazada)
    FROM
        applicants                                                 -- Tabla que guarda las postulaciones de usuarios a ofertas
    JOIN 
        applications ON applicants.application_id = applications.id
        -- Se une con la tabla de ofertas para obtener los detalles de la oferta correspondiente a cada postulación
    JOIN
        application_statuses ON applicants.status_id = application_statuses.id
        -- Se une con la tabla de estados para traducir el status_id de la postulación a un nombre más claro (texto)
    WHERE
        applicants.user_id = ?                                    -- Filtra solo las postulaciones del usuario que hace la consulta
        AND applicants.status_id = ?                              -- Filtra por un estado específico de la postulación (ej: pendiente)
        AND applications.status = 'disponible'                    -- Solo considera ofertas que aún están activas/disponibles
");


    $query->execute([$user_id, $status_id]);
    $applications = $query->fetchAll(PDO::FETCH_ASSOC);
    if ($applications) {
        return_response("success", "Postulaciones activas encontradas.", $applications);
    } else {
        return_response("failed", "No se encontraron postulaciones.", null);
    }
} catch (PDOException $e) {
    // Log error server-side if needed
    return_response("failed", "Error en la consulta.", null);
}
?>