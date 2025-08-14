<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../logic/database/connection.php';

try {
	$stmt = $connection->query('SELECT * FROM notifications ORDER BY id DESC');
	$notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode([
		'status' => 'success',
		'count' => count($notifications),
		'notifications' => $notifications
	]);
} catch (PDOException $e) {
	echo json_encode([
		'status' => 'error',
		'message' => $e->getMessage()
	]);
}
?>