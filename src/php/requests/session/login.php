<?php
require_once "../cors-policy.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->user) && isset($data->password)) {
        $username = $data->user;
        $password = $data->password;
    } else {
        echo json_encode(["status" => "Failed", "message" => "Invalid input data."]);
        exit;
    }

    $response = [
        "status" => "Success",
        "message" => "Login attempt with user: " . $username . " and password: " . $password
    ];
    echo json_encode($response);
} else { echo json_encode(["status" => "Failed", "message" => "Something went wrong."]); }
?>