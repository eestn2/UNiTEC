<?php 

function isAdmin($userId, $connection) {
    $query = "SELECT user_type_id FROM users WHERE id = :id";
    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return ($result['user_type_id'] == 4);
}
?>