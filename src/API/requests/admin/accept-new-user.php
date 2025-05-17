<?php
/**
 * @file accept-new-user.php
 * @description API endpoint for administrators to accept (activate) new user accounts and notify the user by email.
 * Handles PUT requests, verifies admin permissions, updates the 'enabled' status of the target user, and sends a notification email upon successful activation.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - target_user_id: (int) ID of the user to accept (activate)
 *     - id: (int) ID of the authenticated admin user (for permission check)
 *
 * Example:
 *   PUT /src/API/requests/admin/accept-new-user.php
 *   Body: { "target_user_id": 8, "id": 1 }
 *   Response: { "status": "success", "message": "Usuario aceptado con exito.", "data": null }
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";
require_once __DIR__ . "/../../logic/util/get_user_from_request.php";
require_once __DIR__ . '/../../logic/security/is_admin.php';
require_once __DIR__ . '/../../logic/send_email.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    return_response("failed", "Method not allowed", null);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->target_user_id)) {
    return_response("failed", "Falta el ID del usuario a aceptar", null);
    exit;
}

$target_user_id = intval($data->target_user_id);
if ($target_user_id <= 0) {
    return_response("failed", "ID de usuario a aceptar inválido.", null);
    exit;
}

// Obtener el usuario autenticado
$auth_user = get_user_from_request($data);
if (!$auth_user || !isset($auth_user['id'])) {
    return_response("failed", "Usuario no encontrado", null);
    exit;
}

// Verificar si el usuario autenticado es admin
if (!is_admin($auth_user['id'], $connection)) {
    return_response("failed", "Solo los administradores pueden aceptar usuarios.", null);
    exit;
}

// Activar al usuario destino
try {
    $stmt = $connection->prepare("UPDATE users SET enabled = 1 WHERE id = :id");
    $stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Fetch the accepted user's info
        $user_stmt = $connection->prepare("SELECT email, name FROM users WHERE id = :id");
        $user_stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
        $user_stmt->execute();
        $user = $user_stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && isset($user['email'])) {
            $to = $user['email'];
            $name = isset($user['name']) ? $user['name'] : '';
            $subject = "Notificación sobre el estado de su solicitud";
            $body = "Estimado/a $name:\n
                    Nos complace informarle que su solicitud para unirse a UNiTEC ha sido aprobada exitosamente.\n
                    A partir de este momento, ya puede acceder a su cuenta y comenzar a disfrutar de todos los beneficios y funcionalidades que nuestra plataforma ofrece. Para iniciar sesión, utilice las credenciales registradas durante su proceso de solicitud.\n
                    Si tiene alguna duda o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.\n
                    ¡Le damos la más cordial bienvenida y le deseamos una excelente experiencia con nosotros!\n
                    \n
                    Atentamente,\n
                    Soporte de UNITEC\n
                    UNITEC\n
                    ";
            send_email($to, $subject, $body);
        }
        return_response("success", "Usuario aceptado con exito.", null);
    } else {
        return_response("failed", "No se encontró al usuario o ya estaba aceptado.", null);
    }
} catch(PDOException $e) {
    return_response("failed", "Error al aceptar el usuario.", null);
    exit;
}
?>