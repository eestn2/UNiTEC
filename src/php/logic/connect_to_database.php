<?php 
include_once(__DIR__ . '/../DotEnv.php'); // Use __DIR__ for an absolute path

(new DotEnv(__DIR__ . '/../../../.env'))->load();

$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$password = getenv('DB_PASS');
$db = getenv('DB_NAME');

$connection = new mysqli($host, $user, $password, $db);

if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}else{
    echo "Conexión exitosa a la base de datos.";
    mysqli_set_charset($connection, "utf8mb4"); // Establecer el conjunto de caracteres a utf8mb4
}

?>
