<?php
/**
 * This file enforces the creation of a test account.
 *
 * It is intended to ensure that a test account is always available for testing purposes.
 * No additional logic is included in this file.
 */
include_once('connection.php'); // Make sure this returns a PDO instance as $pdo
require_once('security_functions.php');

try {
    $pdo->beginTransaction();
    $hashedPassword = encryption('test');
    $enabled = 1;

    $stmt = $pdo->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES ('Haziel', '04-11-2006', 'Junín', 'tester@gmail.com', ?, '', '', '', '', ?, 2, 3)");
    $stmt->execute([$hashedPassword, $enabled]);

    $user_id = $pdo->lastInsertId();

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    // Handle exception as needed
    die("Error: " . $e->getMessage());
}finally {
    // Close the connection
    if (isset($pdo)) $pdo = null;
}
?>