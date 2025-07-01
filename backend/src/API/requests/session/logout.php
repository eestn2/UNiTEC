<?php
/**
 * @file logout.php
 * @description API endpoint to log out the current user by destroying the PHP session.
 * @author Copilot
 * @date May 31, 2025
 */

session_start();
require_once __DIR__ . '/../cors-policy.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    return_response("failed", "Método no permitido.", null);
    exit;
}

// Unset all session variables
$_SESSION = array();

// Destroy the session cookie if it exists
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy the session
session_destroy();

return_response("success", "Sesión cerrada correctamente.", null);
