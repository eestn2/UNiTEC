<?php
// DEMO USERS (Postulantes)

include_once(__DIR__ . '/../logic/database/connection.php');
require_once(__DIR__ . '/../logic/security/security_functions.php');

try {
    $connection->beginTransaction();


    $stmt = $connection->prepare("INSERT INTO `applicants`(`user_id`, `offer_id`, `status`) VALUES (2, 1, 1), (2, 1, 1), (2, 1, 1)");
    $stmt->execute();
    $connection->commit();
    echo "Test users, reports, and reviews created successfully.";
} catch (Exception $e) {
    $connection->rollBack();
    die("Error: " . $e->getMessage());
} finally {
    if (isset($connection)) $connection = null;
}
?>

?>
