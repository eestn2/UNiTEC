<?php
/**
 * @file send_notification.php
 * @description Utility function to log notifications into the database. Supports different notification types and messages.
 * Provides an enum called NotificationType for notification types for better readability.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   require_once __DIR__ . '/send_notification.php';
 *   send_notification($connection, $type, $receiver_id, $extra = []);
 *
 * @param PDO $connection   PDO database connection.
 * @param NotificationType $type Notification type (enum).
 * @param int $receiver_id  User ID who will receive the notification.
 * @param array $extra      Extra data depending on type (e.g., 'offer_id').
 * @return bool             True on success, false on failure.
 */

enum NotificationType: int {
    case ACCOUNT_PENDING = 1;
    case ACCOUNT_APPROVED = 2;
    case APPLICATION_RECEIVED = 3;
    case APPLICATION_ACCEPTED = 4;
    case APPLICATION_REJECTED = 5;
    case ENTERPRISE_RECEIVED_APPLICATION = 6;
}

function send_notification(PDO $connection, NotificationType $type, int $receiver_id, array $extra = []): bool
{
    try {
        $sender_id = 0;
        $message = "";

        switch ($type) {
            case NotificationType::ACCOUNT_PENDING:
                $message = "Tu cuenta está en espera de ser aprobada.";
                break;

            case NotificationType::ACCOUNT_APPROVED:
                $message = "Tu cuenta ha sido aprobada en el sistema.";
                break;

            case NotificationType::APPLICATION_RECEIVED:
            case NotificationType::APPLICATION_ACCEPTED:
            case NotificationType::APPLICATION_REJECTED:
                if (!isset($extra['offer_id'])) return false;

                $stmt = $connection->prepare("
                    SELECT o.title, u.name AS author
                    FROM offers o
                    JOIN users u ON o.creator_id = u.id
                    WHERE o.id = ?
                ");
                $stmt->execute([$extra['offer_id']]);
                $offer = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$offer) return false;

                $sender_id = $extra['offer_id'];
                $offer_title = $offer['title'];
                $offer_author = $offer['author'];

                if ($type === NotificationType::APPLICATION_RECEIVED) {
                    $message = "Tu postulación a \"$offer_title\" de $offer_author ha sido recibida.";
                } elseif ($type === NotificationType::APPLICATION_ACCEPTED) {
                    $message = "¡Felicidades! Has sido aceptado en \"$offer_title\" de $offer_author.";
                } elseif ($type === NotificationType::APPLICATION_REJECTED) {
                    $message = "Lamentablemente, tu postulación a \"$offer_title\" de $offer_author ha sido rechazada.";
                }
                break;

            case NotificationType::ENTERPRISE_RECEIVED_APPLICATION:
                if (!isset($extra['offer_id']) || !isset($extra['applicant_id'])) return false;

                $stmt = $connection->prepare("
                    SELECT o.title, u.name AS applicant_name
                    FROM offers o
                    JOIN users u ON u.id = ?
                    WHERE o.id = ?
                ");
                $stmt->execute([$extra['applicant_id'], $extra['offer_id']]);
                $info = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!$info) return false;

                $sender_id = $extra['applicant_id'];
                $offer_title = $info['title'];
                $applicant_name = $info['applicant_name'];
                $message = "$applicant_name ha aplicado a tu oferta: \"$offer_title\".";
                break;
        }

        // Insert notification
        $stmt = $connection->prepare("INSERT INTO notifications (type, message, sender_id, receiver_id) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$type->value, $message, $sender_id, $receiver_id]);
    } catch (PDOException $e) {
        error_log("Database error in send_notification: " . $e->getMessage());
        return false;
    } catch (Throwable $e) {
        error_log("Unexpected error in send_notification: " . $e->getMessage());
        return false;
    }
}
?>