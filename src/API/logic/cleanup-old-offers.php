<?php
require_once __DIR__ . '/../logic/connection.php';
require_once __DIR__ . '/../api/function/return_response.php';

try {
    $limit_days = 7; // Días para considerar una oferta como "vieja"

    // MySQL no permite parámetros en INTERVAL, así que interpolamos el valor de forma segura
    $limit_days = intval($limit_days);
    $query = "DELETE FROM applications WHERE status = 0 AND date < DATE_SUB(NOW(), INTERVAL $limit_days DAY)";
    $stmt = $connection->prepare($query);
    $stmt->execute();

    return_response(
        "success",
        "Ofertas viejas eliminadas con éxito.",
        ["deleted_count" => $stmt->rowCount()]
    );
} catch (PDOException $e) {
    // No exponer detalles del error al cliente
    return_response("failed", "Error al eliminar ofertas inactivas.", null);
}
?>