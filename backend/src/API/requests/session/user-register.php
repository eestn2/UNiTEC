<?php
/**
 * @file user-register.php
 * @description API endpoint for registering a new user (student). Handles POST requests, validates input, checks for duplicate emails, inserts user data and related languages/tags, sends a confirmation email, and logs the registration.
 * Uses transactions for data integrity and returns standardized JSON responses.
 * @author Federico Nicolás Martínez
 * @date May 11, 2025
 *
 * Usage:
 *   Send a POST request with JSON body containing user registration data.
 *
 * Example:
 *   POST /src/php/requests/session/user-register.php
 *   Body: { "email": "user@example.com", "password": "password123", ... }
 *   Response: { "status": "success", "message": "...", ... }
 */


session_start();
require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . '/../../logic/database/connection.php';
require_once __DIR__ . '/../../logic/communications/return_response.php';
require_once __DIR__ . '/../../logic/security/security_functions.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password) || $data -> user_type===0 )  return_response("failed", "Faltan datos.", null);

// Assign request body values to variables
$name = $data->name ?? null;
$user_age = $data->birth_date ?? date('Y-m-d H:i:s');
$user_location = "" . ($data->location ?? null);
$user_email = $data->email;
$user_password = password_hash($data->password, PASSWORD_DEFAULT);
$user_description = $data->description ?? null;
$user_last_update_date = date('Y-m-d H:i:s');
$user_profile_picture = '';
$user_portfolio = $data->portfolio ?? null;
$user_is_enabled = 0; // Default to disabled until approved
$user_rol = isset($data->user_type) ? intval($data->user_type) : 2; // Default to student
$user_status = isset($data->status_id) ? intval($data->status_id) : 1; // Default status

// Additional arrays for languages/tags if present
$user_languages = $data->languages ?? [];
$knownLanguagesWithLevels = $data->languages_levels ?? [];
$user_tags = $data->tags ?? [];
$tags_levels = $data->tags_levels ?? [];

error_log('Request received: ' . json_encode($data));
try {
    $connection->beginTransaction();
    error_log('Transaction started');

    // Check for duplicate email
    $stmt = $connection->prepare("SELECT email FROM users WHERE email = ?");
    $stmt->execute([$user_email]);
    if ($stmt->fetch()) {
        error_log('Duplicate email: ' . $user_email);
        return_response("failed", "El correo ya existe.", null);
    }

    // Insert user data
    $stmt = $connection->prepare(
        "INSERT INTO users (name, birth_date, location, email, password, description, last_active_date, profile_picture, portfolio, enabled, user_type, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->execute([
        $name, $user_age, $user_location, $user_email, $user_password, $user_description,
        $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $user_rol, $user_status
    ]);
    $user_id = $connection->lastInsertId();
    error_log('User inserted with ID: ' . $user_id);
    if ($user_rol !== 1) {
        // Insert user languages
        if (!empty($user_languages) && !empty($knownLanguagesWithLevels)) {
            $stmt = $connection->prepare("INSERT INTO user_languages (user_id, language_id, `level`) VALUES (?, ?, ?)");
            foreach ($user_languages as $i => $lang_id) {
                $level_id = $knownLanguagesWithLevels[$i] ?? null;
                if ($level_id !== null) {
                    $stmt->execute([$user_id, $lang_id, $level_id]);
                    error_log("Inserted user_language: user_id=$user_id, lang_id=$lang_id, level_id=$level_id");
                }
            }
        }

        // Insert user tags
        if (!empty($user_tags) && !empty($tags_levels)) {
            $stmt = $connection->prepare("INSERT INTO user_tags (user_id, tag_id, `level`) VALUES (?, ?, ?)");
            foreach ($user_tags as $i => $tag_id) {
                $level_id = $tags_levels[$i] ?? null;
                if ($level_id !== null) {
                    $stmt->execute([$user_id, $tag_id, $level_id]);
                    error_log("Inserted user_tag: user_id=$user_id, tag_id=$tag_id, level_id=$level_id");
                }
            }
        }
    
    }

    // Commit transaction
    $connection->commit();
    error_log('Transaction committed');

    // Send confirmation email (server-side, secure)
    require_once __DIR__ . '/../../logic/communications/send_email.php';
    $email_subject = 'Registro en espera';
    $email_message = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.<br><br>Gracias por registrarte en UNITEC.';
    $send_result = send_email($user_email, $email_subject, $email_message);
    error_log('Email sent: ' . ($send_result ? 'OK' : 'FAILED'));
    if (!$send_result) error_log("Failed to send registration email to $user_email");

    // Log the sent email in the database
    $currentDatetime = date('Y-m-d H:i:s');
    $stmt = $connection->prepare("INSERT INTO sent_emails (subject, message, sender_email, receiver_email, sent_date) VALUES (?, ?, ?, ?, ?)");
    $email_sender = "admin@admin.com"; // System/admin user ID
    $stmt->execute([$email_subject, $email_message, $email_sender, $user_email, $currentDatetime]);
    error_log('Sent email logged in DB');

    // Retrieve the newly created user for response
    $stmt = $connection->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();
    error_log('User fetched for session: ' . json_encode($user));

    return_response("success", "Usuario registrado correctamente. Debe esperar aprobación.", null);
} catch (Exception $e) {
    $connection->rollBack();
    error_log('Transaction rolled back');
    error_log('Exception: ' . $e->getMessage());
    return_response("failed", "Ocurrió un error: No se pudo registrar al usuario" );
}
?>