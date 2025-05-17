<?php 
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/connection.php";
require_once __DIR__ . "/../function/return_response.php";
require_once __DIR__ . "/../function/get-user-from-request.php";
require_once __DIR__ . '/../../logic/security/is_admin.php';

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

// Rechazar al usuario destino
try {
    $stmt = $connection->prepare("UPDATE users SET enabled = 0 WHERE id = :id");
    $stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $stmt->execute();

if ($stmt->rowCount() > 0) {
    // Get the rejected user's email
    $email_stmt = $connection->prepare("SELECT email FROM users WHERE id = :id");
    $email_stmt->bindParam(':id', $target_user_id, PDO::PARAM_INT);
    $email_stmt->execute();
    $user = $email_stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && isset($user['email'])) {
        require_once __DIR__ . '/../../logic/send_email.php';
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
            exampleUNiTEC@example.com
            ";
        send_email($to, $subject, $body);
    }

    return_response("success", "Usuario rechazado con exito.", null);
} else {
    return_response("failed", "No se encontró al usuario o ya estaba rechazado.", null);
}
} catch(PDOException $e) {
    // Log error server-side if needed
    return_response("failed", "Error al aceptar el usuario.", null);
    exit;
}
?>