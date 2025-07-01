<?php
/**
 * @file get_user_from_request.php
 * @description Utility function to extract and sanitize user data from a request payload.
 * Converts and trims string fields, casts booleans and integers, and ensures all expected user fields are present.
 * Used to standardize user data input before database operations or further validation.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Call this function with a decoded JSON object from a request body to obtain a sanitized associative array of user fields.
 *
 * Example:
 *   $user = get_user_from_request($data);
 *   // $user['name'], $user['email'], etc.
 *
 * @param object $data The decoded JSON object containing user fields.
 * @return array Associative array with sanitized user fields.
 */
function get_user_from_request($data) {
    return [
        'id' => isset($data->id) ? intval($data->id) : null,
        'name' => isset($data->name) && is_string($data->name) ? trim($data->name) : null,
        'birth_date' => isset($data->birth_date) && is_string($data->birth_date) ? trim($data->birth_date) : null,
        'location' => isset($data->location) && is_string($data->location) ? trim($data->location) : null,
        'email' => isset($data->email) && is_string($data->email) ? trim($data->email) : null,
        'password' => isset($data->password) && is_string($data->password) ? trim($data->password) : null,
        'description' => isset($data->description) && is_string($data->description) ? trim($data->description) : null,
        'last_active_date' => isset($data->last_active_date) && is_string($data->last_active_date) ? trim($data->last_active_date) : null,
        'profile_picture' => isset($data->profile_picture) && is_string($data->profile_picture) ? trim($data->profile_picture) : null,
        'portfolio' => isset($data->portfolio) && is_string($data->portfolio) ? trim($data->portfolio) : null,
        'enabled' => isset($data->enabled) ? (bool)$data->enabled : null,
        'user_type_id' => isset($data->user_type_id) ? intval($data->user_type_id) : null,
        'status_id' => isset($data->status_id) ? intval($data->status_id) : null,
    ];
}
?>