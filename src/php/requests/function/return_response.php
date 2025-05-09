<?php
function return_response($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = [
        "status" => $status,
        "message" => $message
    ];
    if ($data !== null) { $response = array_merge($response, (array) $data); }
    echo json_encode($response);
    exit;
}

?>