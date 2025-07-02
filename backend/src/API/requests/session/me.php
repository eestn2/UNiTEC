<?php
/**
 * @file me.php
 * @description Returns the current session user if logged in, or an error if not authenticated.
 * @author Migration Script
 * @date May 31, 2025
 */

session_start();
require_once __DIR__ . '/../cors-policy.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';

if (isset($_SESSION['user'])) {
    return_response("success", "Usuario autenticado.", ["user" => $_SESSION['user']]);
} else {
    return_response("failed", "No autenticado.", null);
}
