<?php
/**
 * @file is_admin.php
 * @description Utility function to check if a user is an administrator.
 * Queries the database for the user's type and returns true if the user is an admin (user_type_id = 4).
 * Used to restrict access to admin-only API endpoints and actions.
 * @author Francesco Sidotti
 * @date May 17, 2025
 *
 * Usage:
 *   Call this function with a user ID and a PDO connection to verify admin privileges.
 *
 * Example:
 *   if (is_admin($user_id, $connection)) { ... }
 *
 * @param int $userId The ID of the user to check.
 * @param PDO $connection The PDO database connection.
 * @return bool True if the user is an admin, false otherwise.
 */
function is_admin($userId, $connection) {
    $query = "SELECT user_type_id FROM users WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return ($result['user_type_id'] == 4);
}
?>