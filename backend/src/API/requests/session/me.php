<?php
/**
 * @file me.php
 * @description Returns the current session user if logged in, or an error if not authenticated.
 */

session_start();
require_once __DIR__ . '/../cors-policy.php';
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if (!isset($_SESSION['user'])) {
    return_response("failed", "No autenticado.", null);
    exit;
}

$user_id = $_SESSION['user']['id'];

$stmt = $connection->prepare("SELECT delete_requested_at FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user_db = $stmt->fetch(PDO::FETCH_ASSOC);

$response = [
    "user" => $_SESSION['user']
];

if ($user_db && $user_db['delete_requested_at']) {
    $delete_date = new DateTime($user_db['delete_requested_at']);
    $now = new DateTime();
    $interval = $delete_date->diff($now);
    $days_left = max(0, 15 - $interval->days);

    $response["deletion_status"] = [
        "in_progress" => true,
        "requested_at" => $delete_date->format('Y-m-d H:i:s'),
        "days_left" => $days_left
    ];
} else {
    $response["deletion_status"] = [
        "in_progress" => false
    ];
}

return_response("success", "Usuario autenticado.", $response);

