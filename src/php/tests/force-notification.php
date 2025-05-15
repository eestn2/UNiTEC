<?php
require_once __DIR__ . '/../logic/connection.php';
require_once __DIR__ . '/../logic/notifications/send_notification.php';

// User ID to test notifications
$user_id = 12;

// Type 1: System notification - pending approval
send_notification($connection, 1, $user_id);

// Type 2: System notification - account approved
send_notification($connection, 2, $user_id);

// Type 3: Postulación recibida (requires offer_id, use a valid offer_id from your DB)
send_notification($connection, 3, $user_id, ['offer_id' => 1]);

// Type 4: Postulación aceptada (requires offer_id)
send_notification($connection, 4, $user_id, ['offer_id' => 1]);

// Type 5: Postulación rechazada (requires offer_id)
send_notification($connection, 5, $user_id, ['offer_id' => 1]);

echo "Notifications forced for user_id $user_id.\n";
?>