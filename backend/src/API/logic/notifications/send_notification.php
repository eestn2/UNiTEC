<?php
/**
 * @file send_notification.php
 * @description Utility function to log notifications into the database. Supports different notification types and messages.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   require_once __DIR__ . '/send_notification.php';
 *   send_notification($connection, $type, $receiver_id, $extra = []);
 *
 * @param PDO $connection   PDO database connection.
 * @param int $type         Notification type (1-5).
 * @param int $receiver_id  User ID who will receive the notification.
 * @param array $extra      Extra data depending on type (e.g., 'offer_id').
 * @return bool             True on success, false on failure.
 */

function send_notification(PDO $connection, int $type, int $receiver_id, array $extra = []): bool
{
    $sender_id = 0; // Default for system notifications
    $message = "";

    switch ($type) {
        case 1:
            // System: account pending approval
            $message = "Tu cuenta está en espera de ser aprobada.";
            break;
        case 2:
            // System: account approved
            $message = "Tu cuenta ha sido aprobada en el sistema.";
            break;
        case 3:
        case 4:
        case 5:
            // Types 3, 4, 5: related to job offers (requires offer_id)
            if (!isset($extra['offer_id'])) return false;

            // Get offer info
            $stmt = $connection->prepare("SELECT a.title, u.name AS author FROM applications a JOIN users u ON a.creator_id = u.id WHERE a.id = ?");
            $stmt->execute([$extra['offer_id']]);
            $offer = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$offer) return false;

            $sender_id = $extra['offer_id'];
            $offer_title = $offer['title'];
            $offer_author = $offer['author'];

            if ($type === 3) {
                $message = "Tu postulación a \"$offer_title\" de $offer_author ha sido recibida.";
            } elseif ($type === 4) {
                $message = "¡Felicidades! Has sido aceptado en \"$offer_title\" de $offer_author.";
            } elseif ($type === 5) {
                $message = "Lamentablemente, tu postulación a \"$offer_title\" de $offer_author ha sido rechazada.";
            }
            break;
        default:
            return false;
    }

    // Insert notification
    $stmt = $connection->prepare("INSERT INTO notifications (type, message, sender_id, receiver_id) VALUES (?, ?, ?, ?)");
    return $stmt->execute([$type, $message, $sender_id, $receiver_id]);
}
?>