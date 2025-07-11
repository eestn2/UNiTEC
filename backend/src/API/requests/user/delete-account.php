<?php
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

session_start();

$method = $_SERVER["REQUEST_METHOD"];

$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : null;
if (!$user_id || $user_id <= 0) {
    return_response("failed", "Falta el ID del usuario.", null);
    exit;
}

// Usuario confirma eliminación (método POST)
if ($method === 'POST') {
    $stmt = $pdo->prepare("UPDATE users SET delete_requested_at = NOW() WHERE id = ?");
    $stmt->execute([$user_id]);
    echo json_encode([
        'message' => 'El proceso de eliminación ha comenzado. Tienes 15 días para cancelar iniciando sesión.'
    ]);
    exit;
}

// Verificar estado o ejecutar eliminación (método GET)
if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT delete_requested_at FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['delete_requested_at']) {
        $deleteDate = new DateTime($user['delete_requested_at']);
        $now = new DateTime();
        $interval = $deleteDate->diff($now);

        if ($interval->days >= 15) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            session_destroy();
            echo json_encode(['message' => 'Cuenta eliminada permanentemente.']);
        } else {
            echo json_encode([
                'message' => 'La cuenta está en proceso de eliminación.',
                'days_left' => 15 - $interval->days
            ]);
        }
    } else {
        echo json_encode(['message' => 'La cuenta no está en proceso de eliminación.']);
    }
    exit;
}
