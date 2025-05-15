<?php
/**
 * Forcibly registers two users (Miguel Laiun and Carlos Di Cicco)
 * and two job offers, one by each user.
 */

include_once(__DIR__ . '/../logic/connection.php');
require_once(__DIR__ . '/../logic/security_functions.php');

try {
    $connection->beginTransaction();

    // Insert Miguel Laiun
    $miguelEmail = 'miguel.laiun@gmail.com';
    $miguelName = 'Miguel Laiun';
    $miguelPassword = encryption('miguel123');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$miguelName, $miguelEmail, $miguelPassword, $enabled]);
    $miguelId = $connection->lastInsertId();

    // Insert Carlos Di Cicco
    $carlosEmail = 'carlos.dicicco@gmail.com';
    $carlosName = 'Carlos Di Cicco';
    $carlosPassword = encryption('carlos123');
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES (?, '1991-02-02', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$carlosName, $carlosEmail, $carlosPassword, $enabled]);
    $carlosId = $connection->lastInsertId();

    // Insert Job Offer by Miguel Laiun
    $title1 = "Se necesitan programadores con humito";
    $desc1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    $stmt = $connection->prepare("INSERT INTO `applications`(`creator_id`, `title`, `description`, `status`) VALUES (?, ?, ?, 1)");
    $stmt->execute([$miguelId, $title1, $desc1]);

    // Insert Job Offer by Carlos Di Cicco
    $title2 = "Se necesita ingeniero de Software";
    $desc2 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    $stmt = $connection->prepare("INSERT INTO `applications`(`creator_id`, `title`, `description`, `status`) VALUES (?, ?, ?, 1)");
    $stmt->execute([$carlosId, $title2, $desc2]);

    $connection->commit();
    echo "Test users and job offers created successfully.";
} catch (Exception $e) {
    $connection->rollBack();
    die("Error: " . $e->getMessage());
} finally {
    if (isset($connection)) $connection = null;
}
?>