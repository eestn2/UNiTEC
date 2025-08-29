<?php
/**
 * @file return_response.php
 * @description Utility function for sending standardized JSON responses from API endpoints.
 * Sets the appropriate Content-Type header and outputs a JSON-encoded response with status, message, and optional data.
 * @author Haziel Magallanes
 * @date May 11, 2025
 *
 * @function return_response
 * @param status $status   The status of the response .
 * @param string $message  A descriptive message for the response.
 * @param mixed  $data     (Optional) Additional data to include in the response (as an associative array).
 *
 * @example ```php return_response("success", "Operation completed.", ["user" => $user]);
 */

enum status: int {
    case OK = 200;
    case CREATED = 201;
    case ACCEPTED = 202;
    case NO_CONTENT = 204;
    case BAD_REQUEST = 400;
    case UNAUTHORIZED = 401;
    case FORBIDDEN = 403;
    case NOT_FOUND = 404;
    case METHOD_NOT_ALLOWED = 405;
    case CONFLICT = 409;
    case INTERNAL_SERVER_ERROR = 500;
    case SERVICE_UNAVAILABLE = 503;
   
}

function return_response(status $status, string $message, $data = null) {
    header('Content-Type: application/json');
    http_response_code($status->value);
    $data = [
        'status' => $status->name,
        'message' => $message,
        'data' => $data
    ];
    echo json_encode($data);
    exit;
}
function return_response_outdated(string $status, string $message, $data = null) {
    header('Content-Type: application/json');
    http_response_code($status == 'success' ? 200 : 400);
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];
    echo json_encode($response);
    exit;
}

?>