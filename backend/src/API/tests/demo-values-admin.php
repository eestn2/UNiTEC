<?php
/**
 * Forced values for demo purpouses
 */

include_once(__DIR__ . '/../logic/database/connection.php');
require_once(__DIR__ . '/../logic/security/security_functions.php');

try {
    $connection->beginTransaction();

    // Insert admin account
    $adminEmail = 'admin@demo.com';
    $adminName = 'DemoAdmin';
    $adminPassword = encryption('demoadmin');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 4, 3)");
    $stmt->execute([$adminName, $adminEmail, $adminPassword, $enabled]);
    $adminId = $connection->lastInsertId();
    // Insert student account
    $studentEmail = 'student@demo.com';
    $studentName = 'DemoStudent';
    $studentPassword = encryption('demostudent');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 2, 3)");
    $stmt->execute([$studentName, $studentEmail, $studentPassword, $enabled]);
    $studentId = $connection->lastInsertId();
    // Insert graduate account
    $graduateEmail = 'graduate@demo.com';
    $graduateName = 'DemoGraduate';
    $graduatePassword = encryption('demograduate');
    $enabled = 1;
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1990-01-01', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 3, 3)");
    $stmt->execute([$graduateName, $graduateEmail, $graduatePassword, $enabled]);
    $graduateId = $connection->lastInsertId();
    // Insert enterprise 1
    $enterprise1Email = 'enterprise1@demo.com';
    $enterprise1Name = 'DemoCorp';
    $enterprise1Password = encryption('democorp');
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1991-02-02', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$enterprise1Name, $enterprise1Email, $enterprise1Password, $enabled]);
    $enterprise1Id = $connection->lastInsertId();
    // Insert enterprise 2
    $enterprise2Email = 'enterprise2@demo.com';
    $enterprise2Name = 'DemoSystems';
    $enterprise2Password = encryption('demosystems');
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type`, `status`) VALUES (?, '1991-02-02', 'Ciudad', ?, ?, '', CURDATE(), '', '', ?, 1, 3)");
    $stmt->execute([$enterprise2Name, $enterprise2Email, $enterprise2Password, $enabled]);
    $enterprise2Id = $connection->lastInsertId();

    // Insert demo reports
    $stmt = $connection->prepare("INSERT INTO `reports`(`reported_id`, `reporter_id`, `reason`) VALUES (?, ?, ?)");
    $stmt->execute([$studentId, $adminId, 1]); // Admin reports student
    $stmt->execute([$graduateId, $enterprise1Id, 2]); // DemoCorp reports graduate
    $stmt->execute([$enterprise2Id, $studentId, 3]); // Student reports DemoSystems

    // Insert demo reviews
    $stmt = $connection->prepare("INSERT INTO `reviews`(`user_id`, `reviewed_id`, `text`) VALUES (?, ?, ?)");
    $stmt->execute([$enterprise2Id, $studentId, 'Nah el estudiante este es crack, rendidor, laburante. Siempre lo vimos apoyarnos y colaborarnos en todo momento. Queda felicitar a los creadores de este sitio web por darnos esta posibilidad']);
    $stmt->execute([$enterprise1Id, $graduateId, 'Este pibe no nos termino complaciendo, lo citamos a la entrevista y llego tarde. Cuando finalmente llego, tuvo una actitud muy negativa respecto a los distintos temas que le planteamos, mintio en la mayoria de capacidades que informo en su perfil . ']);
    $stmt->execute([$studentId, $enterprise2Id, 'La mejor empresa de mi vida, GRACIAS UNITEC.']);

    $connection->commit();
    echo "Test users, reports, and reviews created successfully.";
    echo "<br>Admin ID: $adminId";
    echo "<br>Student ID: $studentId";
    echo "<br>Graduate ID: $graduateId";
    echo "<br>DemoCorp ID: $enterprise1Id";
    echo "<br>DemoSystems ID: $enterprise2Id";
} catch (Exception $e) {
    $connection->rollBack();
    die("Error: " . $e->getMessage());
} finally {
    if (isset($connection)) $connection = null;
}
?>