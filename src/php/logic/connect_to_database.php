<?php 

require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$db   = $_ENV['DB_NAME'];

$connection = new mysqli($host, $user, $password, $db);

if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}else{
    echo "Conexión exitosa a la base de datos.";
    mysqli_set_charset($connection, "utf8mb4"); // Establecer el conjunto de caracteres a utf8mb4
}

?>
