<?php

session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->offer_id)) return_response("failed", "Faltan datos.", null);

// Validate session and user authentication
if (!isset($_SESSION['user']) || !isset($_SESSION['user']['id'])) {
    return_response("failed", "Usuario no autenticado.", null);
}

$user_id = $_SESSION['user'] ['id'] ;
$offer_id = intval($data->offer_id);
if ($user_id <= 0 || $reviewed_id <= 0) {
    return_response("failed", "Datos invalidos.", null);
}
try{
    try {
        $connection->beginTransaction();

        $stmt = $connection -> prepare( 
            "INSERT INTO applicants (user_id, offer_id, `status`) VALUES (?, ?, 0)");
        $stmt->execute([$user_id, $offer_id]);

        $connection->commit();
        return_response("success", "Usuario postulado con exito.", null);
    } catch (PDOException $e) {
        if ($connection->inTransaction()) {
            $connection->rollBack();
        }
        return_response("failed", "Error al insertar la postulacion: " . $e->getMessage(), null);
    }
}catch (PDOException $e) {
    return_response("failed", "Error al postular usuario:" . $e->getMessage(), null);
}
?>