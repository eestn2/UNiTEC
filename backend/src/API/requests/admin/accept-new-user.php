<?php
/**
 * @file accept-new-user.php
 * @description API endpoint for administrators to accept (activate) new user accounts and notify the user by email.
 * Handles PUT requests, verifies admin permissions using session authentication, updates the 'enabled' status of the target user to 1, and sends a notification email upon acceptance.
 * Returns a standardized JSON response indicating success or failure.
 *
 * Note: The authenticated admin user is retrieved from the session. No admin ID is required in the request body.
 * 
 * @author Francesco Sidotti
 * @date May 31, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - target_user_id: (int) ID of the user to accept (activate)
 *
 * Example:
 *   PUT /src/API/requests/admin/accept-new-user.php
 *   Body: { "target_user_id": 8 }
 *   Response: { "status": "success", "message": "Usuario aceptado con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";
require_once __DIR__ . '/../../logic/security/is_admin.php';
require_once __DIR__ . '/../../logic/notifications/send_notification.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') return_response("failed", "Method not allowed", null);

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->target_user_id)) return_response("failed", "Falta el ID del usuario a aceptar", null);

$target_user_id = intval($data->target_user_id);
if ($target_user_id <= 0) return_response("failed", "ID de usuario a aceptar inválido.", null);

// Obtener el usuario autenticado desde la sesión
if (!isset($_SESSION['user']['id'])) return_response("failed", "No autenticado.", null);
$auth_user_id = $_SESSION['user']['id'];

// Verificar si el usuario autenticado es admin
if (!is_admin($auth_user_id, $connection)) return_response("failed", "Solo los administradores pueden aceptar usuarios.", null);
// Aceptar al usuario destino
try {
    // 1. Get the user's email and name first
    $email_stmt = $connection->prepare("SELECT email, name FROM users WHERE id = :id");
    $email_stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $email_stmt->execute();
    $user = $email_stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        return_response("failed", "No se encontró al usuario.", null);
        exit;
    }

    // 2. Enable the user (set enabled = 1)
    $stmt = $connection->prepare("UPDATE users SET enabled = 1 WHERE id = :id");
    $stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $stmt->execute();

    // PostgreSQL & MySQL return 0 when the value is unchanged
    if ($stmt->rowCount() >= 0) {
        // 3. Send the email after successful enable
        if (isset($user['email'])) {
            require_once __DIR__ . '/../../logic/communications/send_email.php';
            $to = $user['email'];
            $name = isset($user['name']) ? $user['name'] : '';
            $subject = "¡Bienvenido a UNITEC!";
            $body = "Estimado/a $name:\n
                    Nos complace informarle que su cuenta ha sido aceptada y activada exitosamente en UNITEC.\n
                    Ya puede acceder a la plataforma y comenzar a disfrutar de todos nuestros servicios.\n
                    ¡Bienvenido/a a la comunidad!\n
                    \n
                    Atentamente,\n
                    Soporte de UNITEC\n
                    UNITEC\n
                    ";
            send_email($to, $subject, $body);
        }
        send_notification($connection, NotificationType::ACCOUNT_APPROVED, $target_user_id, []);
        return_response("success", "Usuario aceptado con exito.", null);
    } else {
        return_response("failed", "No se pudo aceptar al usuario.", null);
    }
} catch(PDOException $e) {
    return_response("failed", "Error al aceptar el usuario.", null);
}
?>