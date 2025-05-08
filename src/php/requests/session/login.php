<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $data = json_decode(file_get_contents("php://input"));
    if (!isset($data->user) || !isset($data->password)){
        echo json_encode(["status" => "Failed", "message" => "Faltan datos"]);
        exit;
    }

    $username = $connection->real_escape_string($data->user);
    $password = $data->password;

    // Busca el usuario por email usando MySQLi
    $stmt = $connection->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user){
        if (password_verify($password, $user["password"])){
            // Si la contraseña es correcta, se crea una sesión y se devuelve el ID de usuario
            session_start();
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["user_name"] = $user["name"];
            $_SESSION["user_age"] = $user["birth_date"];
            $_SESSION["user_location"] = $user["location"];
            $_SESSION["user_email"] = $user["email"];
            $_SESSION["user_password"] = $user["password"];
            $_SESSION["user_description"] = $user["description"];
            $_SESSION["last_active_date"] = $user["last_active_date"];
            $_SESSION["profile_picture"] = $user["profile_picture"];
            $_SESSION["user_portfolio"] = $user["portfolio"];
            $_SESSION["user_is_enabled"] = $user["enabled"];
            $_SESSION["user_type_id"] = $user["user_type_id"];
            $_SESSION["user_status"] = $user["status_id"];
            echo json_encode(["status" => "Success", "message" => "Inicio de sesión exitoso", "data" => ["id" => $user["id"], "name" => $user["name"], "user_age" => $user["birth_date"], "user_location" => $user["location"], "user_email" => $user["email"], "user_password" => $user["password"], "user_description" => $user["description"], "last_active_date" => $user["last_active_date"], "profile_picture" => $user["profile_picture"], "user_portfolio" => $user["portfolio"], "user_is_enabled" => $user["enabled"], "user_type_id" => $user["user_type_id"], "user_status" => $user["status_id"]]]);
        } else {
            echo json_encode(["status" => "Failed", "message" => "Contraseña incorrecta"]);
        } 
    } else {
        echo json_encode(["status" => "Failed", "message" => "Usuario no encontrado"]);
    }
} else {
    echo json_encode(["status" => "Failed", "message" => "Metodo no permitido"]);
}
?>