<?php
/**
 * @file send_email.php
 * @description Secure and standardized function to send emails using PHPMailer. 
 *              Returns true on success, false on failure. Logs errors if sending fails.
 * @author Haziel Magallanes
 * @date May 12, 2025
 *
 * Usage:
 *   require_once __DIR__ . '/send_email.php';
 *   send_email($to, $subject, $body);
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Load Composer's autoloader if available
if (file_exists(__DIR__ . '/../../../../vendor/autoload.php')) {
    require_once __DIR__ . '/../../../../vendor/autoload.php';
} else {
    throw new Exception('Composer autoloader not found. Please run "composer install" in the project root.');
}

/**
 * Sends an email using PHPMailer with secure settings.
 *
 * @param string $to      Recipient email address.
 * @param string $subject Email subject.
 * @param string $body    Email body (HTML allowed).
 * @return bool           True if sent, false otherwise.
 */
function send_email($to, $subject, $body) {


    // Load environment variables from .env file if present
    $dotenv = Dotenv::createImmutable(__DIR__ . '/../../../../');
    $dotenv->safeLoad();
    // SMTP configuration
    $mail_host = getenv('EMAIL_HOST');
    $mail_username = getenv('EMAIL_USERNAME');
    $mail_password = getenv('EMAIL_PASSWORD');
    $mail_from = getenv('EMAIL_USERNAME');
    $mail_from_name = 'UNITEC';

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $mail_host;
        $mail->SMTPAuth   = true;
        $mail->Username   = $mail_username;
        $mail->Password   = $mail_password;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($mail_from, $mail_from_name);
        $mail->addAddress($to);

        // Content
        $mail->isHTML(true);
        $mail->Subject = htmlspecialchars($subject, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $mail->Body    = nl2br(htmlspecialchars($body, ENT_QUOTES | ENT_HTML5, 'UTF-8'));

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Email could not be sent to $to. PHPMailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
?>