<?php 
include_once(__DIR__ . '/../DotEnv.php'); // Use __DIR__ for an absolute path

(new DotEnv(__DIR__ . '/../../../.env'))->load();

$env = getenv('ENVIRONMENT');
if ($env == 'production') {
    $host = getenv('DB_HOST_PROD');
    $user = getenv('DB_USER_PROD');
    $password = getenv('DB_PASS_PROD');
    $db = getenv('DB_NAME_PROD');
    $port = getenv('DB_PORT_PROD');
} else {
    $host = getenv('DB_HOST_DEV');
    $user = getenv('DB_USER_DEV');
    $password = getenv('DB_PASS_DEV');
    $db = getenv('DB_NAME_DEV');
    $port = getenv('DB_PORT_DEV');
}

$connection = new mysqli($host, $user, $password, $db, $port);

if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}else{
    echo "Conexión exitosa a la base de datos.";
    mysqli_set_charset($connection, "utf8mb4"); // Establecer el conjunto de caracteres a utf8mb4
}

?>
