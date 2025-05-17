<?php
function get_user_from_request($data) {
    return [
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