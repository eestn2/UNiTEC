<?php
/**
 * @file return_response.php
 * @description Utility function for sending standardized JSON responses from API endpoints.
 * Sets the appropriate Content-Type header and outputs a JSON-encoded response with status, message, and optional data.
 * @date May 11, 2025
 *
 * @function return_response
 * @param status $status   The status of the response .
 * @param string $message  A descriptive message for the response.
 * @param mixed  $data     (Optional) Additional data to include in the response (as an associative array).
 *
 * @example ```php return_response(status::OK, "Operation completed.", ["user" => $user]);
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
    case NOT_ACCEPTABLE = 406;
    case CONFLICT = 409;
    case GONE = 410;
    case UNPROCESSABLE_CONTENT = 422;
    case TOO_MANY_REQUESTS = 429;
    case INTERNAL_SERVER_ERROR = 500;
    case NOT_IMPLEMENTED = 501;
    case BAD_GATEWAY = 502;
    case SERVICE_UNAVAILABLE = 503;
    case GATEWAY_TIMEOUT = 504;
};

function return_response(status $status, string $message, $data = null): never {
    http_response_code($status->value);
    $data = [
        'message' => $message,
        'data' => $data
    ];
    echo json_encode($data);
    exit;
}
?>