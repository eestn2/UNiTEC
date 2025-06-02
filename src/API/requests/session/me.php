<?php
/**
 * @file me.php
 * @description Returns the current session user if logged in, or an error if not authenticated.
 * @author Migration Script
 * @date May 31, 2025
 */

if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => $_SERVER['HTTP_HOST'],
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None'
    ]);
} else {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => $_SERVER['HTTP_HOST'],
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
}
session_start();
require_once __DIR__ . '/../cors-policy.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if (isset($_SESSION['user'])) {
    return_response("success", "Usuario autenticado.", [
        "user" => $_SESSION['user'],
        "debug" => [
            "session_id" => session_id(),
            "session_status" => session_status(),
            "session" => $_SESSION,
            "cookies" => $_COOKIE
        ]
    ]);
} else {
    return_response("failed", "No autenticado.", [
        "debug" => [
            "session_id" => session_id(),
            "session_status" => session_status(),
            "session" => $_SESSION,
            "cookies" => $_COOKIE
        ]
    ]);
}
