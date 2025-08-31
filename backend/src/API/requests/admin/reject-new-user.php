<?php
/**
 * @file reject-new-user.php
 * @description API endpoint for administrators to reject (deactivate) new user accounts and notify the user by email.
 * Handles PUT requests, verifies admin permissions using session authentication, sets the 'enabled' status of the target user to 0, and sends a rejection email.
 * Returns a standardized JSON response indicating success or failure.
 * 
 * Note: The authenticated admin is retrieved from the session. No admin ID is required in the body.
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - target_user_id: (int) ID of the user to reject
 *
 * Example:
 *   PUT /src/API/requests/admin/reject-new-user.php
 *   Body: { "target_user_id": 8 }
 *   Response: { "message": "Usuario rechazado con éxito.", "data": null }
 */

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";
require_once __DIR__ . '/../../logic/security/is_admin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') return_response(status::METHOD_NOT_ALLOWED, "Method not allowed");

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->target_user_id) || !isset($data->target_user_type)) return_response(status::BAD_REQUEST, "Falta el ID del usuario a rechazar");

$target_user_id = intval($data->target_user_id);
$target_user_type = intval($data->target_user_type);
if ($target_user_id <= 0) return_response(status::BAD_REQUEST, "ID de usuario a rechazar inválido.");
// Obtener el usuario autenticado desde la sesión
if (!isset($_SESSION['user']['id'])) return_response(status::UNAUTHORIZED, "No autenticado.");

$auth_user_id = $_SESSION['user']['id'];

// Verificar si el usuario autenticado es admin
if (!is_admin($auth_user_id, $connection)) return_response(status::FORBIDDEN, "Solo los administradores pueden rechazar usuarios.");


// Rechazar al usuario destino
try {
    // 1. Get the user's email and name first
    $email_stmt = $connection->prepare("SELECT email, name FROM users WHERE id = :id");
    $email_stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $email_stmt->execute();
    $user = $email_stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) return_response(status::NOT_FOUND, "No se encontró al usuario.");

    if($target_user_type != 1){
        // 3. Delete user-specific data if not an admin
        $delLangs = $connection->prepare("DELETE FROM user_languages WHERE user_id = :id");
        $delLangs->bindValue(':id', $target_user_id, PDO::PARAM_INT);
        $delLangs->execute();
        $delTags = $connection->prepare("DELETE FROM user_tags WHERE user_id = :id");
        $delTags->bindValue(':id', $target_user_id, PDO::PARAM_INT);
        $delTags->execute();
    }
    // 2. Delete or disable the user
    $stmt = $connection->prepare("DELETE FROM users WHERE id = :id"); // or UPDATE users SET enabled = 0 WHERE id = :id
    $stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // 3. Send the email after successful delete/disable
        if (isset($user['email'])) {
            require_once __DIR__ . '/../../logic/communications/send_email.php';
            $to = $user['email'];
            $name = isset($user['name']) ? $user['name'] : '';
            $subject = "Notificación sobre el estado de su solicitud";
            $body = "Estimado/a $name:\n
                    Le agradecemos el interés mostrado en nuestra plataforma y el tiempo dedicado a completar su solicitud.\n
                    Tras una evaluación cuidadosa, lamentamos informarle que, en esta ocasión, no ha sido posible aprobar su incorporación a UNITEC. Esta decisión se ha tomado con base en nuestros criterios internos y políticas de admisión, los cuales aplicamos de manera uniforme para garantizar la mejor experiencia para todos nuestros usuarios.\n
                    Le invitamos a revisar nuestros requisitos y, si lo desea, volver a postular en el futuro.\n
                    Agradecemos nuevamente su interés y comprensión.\n
                    \n
                    Atentamente,\n
                    Soporte de UNITEC\n
                    UNITEC\n
                    ";
            send_email($to, $subject, $body);
        }
        return_response(status::OK, "Usuario rechazado con éxito.");
    }
    return_response(status::NOT_FOUND, "No se pudo rechazar al usuario.");
} catch(PDOException $e) {
    $connection->rollBack();
    error_log("Error rejecting user: " . $e->getMessage());
    return_response(status::INTERNAL_SERVER_ERROR, "Error al rechazar el usuario.");
}
?>