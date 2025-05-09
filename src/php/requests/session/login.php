<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '/../../config/session-config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST"){
    echo json_encode(["status" => "Failed", "message" => "Metodo no permitido"]);
    exit;
}
$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)){
    echo json_encode(["status" => "Failed", "message" => "Faltan datos"]);
    exit;
}

$username = $connection->real_escape_string($data->email);
$password = $data->password;

// Search for user email in database.
$stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $username);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user){
    echo json_encode(["status" => "Failed", "message" => "Dirección de correo electronico no registrada."]);
    exit;
}
if (!password_verify($password, $user["password"])){
    echo json_encode(["status" => "Failed", "message" => "Contraseña incorrecta."]);
    exit;
}
// Si la contraseña es correcta, se crea una sesión y se devuelve el usuario
session_start();
$_SESSION[SESSION_USER_ID] = $user["id"];
$_SESSION[SESSION_USER_NAME] = $user["name"];
$_SESSION[SESSION_USER_AGE] = $user["birth_date"];
$_SESSION[SESSION_USER_LOCATION] = $user["location"];
$_SESSION[SESSION_USER_EMAIL] = $user["email"];
$_SESSION[SESSION_USER_DESCRIPTION] = $user["description"];
$_SESSION[SESSION_LAST_ACTIVE_DATE] = $user["last_active_date"];
$_SESSION[SESSION_PROFILE_PICTURE] = $user["profile_picture"];
$_SESSION[SESSION_USER_PORTFOLIO] = $user["portfolio"];
$_SESSION[SESSION_USER_IS_ENABLED] = $user["enabled"];
$_SESSION[SESSION_USER_TYPE_ID] = $user["user_type_id"];
$_SESSION[SESSION_USER_STATUS] = $user["status_id"];
echo json_encode(["status" => "Success", "message" => "Inicio de sesión exitoso", "user" => [
    "id" => $user["id"],
    "name" => $user["name"],
    "age" => $user["birth_date"],
    "location" => $user["location"],
    "email" => $user["email"],
    "description" => $user["description"],
    "last_active_date" => $user["last_active_date"],
    "profile_picture" => $user["profile_picture"],
    "portfolio" => $user["portfolio"],
    "is_enabled" => $user["enabled"],
    "type_id" => $user["user_type_id"],
    "status" => $user["status_id"]
]]);
?>