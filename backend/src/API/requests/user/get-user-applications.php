<?php
session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") return_response(status::OK, "Preflight OK.");
if ($_SERVER["REQUEST_METHOD"] !== "GET") return_response(status::METHOD_NOT_ALLOWED, "Método no permitido.");

if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No se ha iniciado sesión.");
$user_id = $_SESSION['user']['id'];

try {
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
