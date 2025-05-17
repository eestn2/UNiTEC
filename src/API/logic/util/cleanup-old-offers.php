<?php
/**
 * @file cleanup-old-offers.php
 * @description Utility script for removing old and inactive job offers from the database.
 * Deletes job offers with status = 0 (inactive) that are older than a specified number of days (default: 7).
 * Intended for use by administrators or as a scheduled maintenance task.
 * Returns a standardized JSON response indicating the number of deleted offers or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Run this script as an admin or via a scheduled task (e.g., cron).
 *   No input parameters required.
 *
 * Example:
 *   php cleanup-old-offers.php
 *   Response: { "status": "success", "message": "Ofertas viejas eliminadas con éxito.", "data": { "deleted_count": 5 } }
 */

require_once __DIR__ . '/../database/connection.php';
require_once __DIR__ . '/../communications/return_response.php';
require_once __DIR__ . '/../security/is_admin.php';

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
    return_response("failed", "Error al eliminar ofertas inactivas.", null);
}
?>