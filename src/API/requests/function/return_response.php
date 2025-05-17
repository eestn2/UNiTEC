<?php
/**
 * @file return_response.php
 * @description Utility function for sending standardized JSON responses from API endpoints.
 * Sets the appropriate Content-Type header and outputs a JSON-encoded response with status, message, and optional data.
 * @author Haziel Magallanes
 * @date May 11, 2025
 *
 * @function return_response
 * @param string $status   The status of the response (e.g., "success", "failed").
 * @param string $message  A descriptive message for the response.
 * @param mixed  $data     (Optional) Additional data to include in the response (as an associative array).
 *
 * @example ```php return_response("success", "Operation completed.", ["user" => $user]);
 */
function return_response($status, $message, $data = null) {
    header('Content-Type: application/json');
    $response = [
        "status" => $status,
        "message" => $message,
        "data" => $data
    ];
    echo json_encode($response);
    exit;
}

?>