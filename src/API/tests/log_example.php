<?php
require_once __DIR__ . '/../logic/connection.php';

$logFile = __DIR__ . '/users_log.txt';

try {
    $stmt = $connection->query("SELECT * FROM users");
    $users = $stmt->fetchAll();

    $lines = [];
    foreach ($users as $user) {
        $lines[] = json_encode($user, JSON_UNESCAPED_UNICODE);
    }

    file_put_contents($logFile, implode(PHP_EOL, $lines) . PHP_EOL);

    echo "Usuarios guardados en $logFile";
} catch (Exception $e) {
    error_log("Error al guardar usuarios en log: " . $e->getMessage());
    echo "Error al guardar usuarios en log.";
}
?>