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

require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '/../function/return_response.php';
require_once __DIR__ . '/../../config/session-config.php';
require_once(__DIR__ . '/../../logic/security_functions.php');

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)) return_response("failed", "Faltan datos.", null);

// Assign request body values to variables
$user_name = isset($data->name) ? $data->name : null;
$user_age = isset($data->birth_date) ? $data->birth_date : null;
$user_location = isset($data->location) ? $data->location : null;
$user_email = $connection->real_escape_string($data->email);
$user_password = password_hash($data->password, PASSWORD_DEFAULT);
$user_description = isset($data->description) ? $data->description : null;
$user_last_update_date = date('Y-m-d H:i:s');
$user_profile_picture = isset($data->profile_picture) ? $data->profile_picture : null;
$user_portfolio = isset($data->portfolio) ? $data->portfolio : null;
$user_is_enabled = 0; // Default to disabled until approved
$user_rol = isset($data->user_type_id) ? intval($data->user_type_id) : 2; // Default to student
$user_status = isset($data->status_id) ? intval($data->status_id) : 1; // Default status

// Additional arrays for languages/tags if present
$user_languages = isset($data->languages) ? $data->languages : [];
$knownLanguagesWithLevels = isset($data->languages_levels) ? $data->languages_levels : [];
$user_tags = isset($data->tags) ? $data->tags : [];
$tags_levels = isset($data->tags_levels) ? $data->tags_levels : [];

$connection->begin_transaction();

// Check for duplicate email
$stmt = $connection->prepare("SELECT email FROM `users` WHERE `email` = ?");
$stmt->bind_param("s", $user_email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) return_response("failed", "El correo ya existe.", null);
$stmt->close();

try {
    // Insert user data
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssii", $user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $user_rol, $user_status);
    $stmt->execute();

    // Get new user ID
    $id_consult = $connection->query("SELECT MAX(id) AS id FROM users");
    if($row = mysqli_fetch_row($id_consult)) {
        $user_id = $row[0];
    }

    // Insert user languages
    $stmt = $connection->prepare("INSERT INTO `user_languages`(`user_id`, `language_id`, `level_id`) VALUES (?, ?, ?)");
    for($i = 0; $i < count($user_languages); $i++){
        $stmt->bind_param("iii", $user_id, $user_languages[$i], $knownLanguagesWithLevels[$i]);
        $stmt->execute();
    }

    // Insert user tags
    $stmt = $connection->prepare("INSERT INTO `user_tags`(`user_id`, `tag_id`, `level_id`) VALUES (?, ?, ?)");
    for($i = 0; $i < count($user_tags); $i++){
        $stmt->bind_param("iii", $user_id, $user_tags[$i], $tags_levels[$i]);
        $stmt->execute();
    }

    $connection->commit();

    // Send confirmation email (server-side, secure)
    require_once __DIR__ . '/../../logic/send_email.php';

    $email_subject = 'Registro en espera';
    $email_message = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.';
    $email_message .= '<br><br>Gracias por registrarte en UNITEC.';
    $send_result = send_email($user_email, $email_subject, $email_message);

    if (!$send_result) error_log("Failed to send registration email to $user_email");

    // Log the sent email in the database
    $currentDatetime = date('Y-m-d H:i:s');
    $stmt = $connection->prepare("INSERT INTO `sent_emails`(`subject`, `message`, `sender_id`, `receiver_id`, `sent_date`) VALUES (?, ?, ?, ?, ?)");
    $email_sender = 1; // System/admin user ID
    $stmt->bind_param("ssiis", $email_subject, $email_message, $email_sender, $user_id, $currentDatetime);
    $stmt->execute();

    // Respond with success
    return_response("success", "Usuario registrado correctamente. Debe esperar aprobación.", ["user" => [
    "id" => $user["id"],
    "name" => $user["name"],
    "age" => $user["birth_date"],
    "location" => $user["location"],
    "email" => $user["email"],
    "description" => $user["description"],
    "last_active_date" => $user["last_active_date"],
    "profile_picture" => $user["profile_picture"],
    "portfolio" => $user["portfolio"],
    "is_enabled" => $user["enabled"],
    "type_id" => $user["user_type_id"],
    "status" => $user["status_id"]
    ]]);
} catch (Exception $e) {
    $connection->rollback();
    return_response("failed", "Ocurrió un error: " . $e->getMessage(), null);
} finally {
    if(isset($stmt)) $stmt->close();
    $connection->close();
}
?>
