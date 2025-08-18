<?php
/**
 * @file edit-user.php
 * @description API endpoint for editing user profile information.
 * Handles PUT requests, validates input, and updates allowed user fields in the database.
 * Only updates fields that are present in the request and allowed for editing.
 * Returns a standardized JSON response indicating success or failure, and returns the updated user data on success.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */

require_once __DIR__ . "/../cors-policy.php";
require_once __DIR__ . "/../../logic/database/connection.php";
require_once __DIR__ . "/../../logic/communications/return_response.php";

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    return_response("failed", "Method not allowed", null);
}

$data = json_decode(file_get_contents("php://input"));
if (!$data) {
    return_response("failed", "No se recibieron datos", null);
}
session_start();
if (!isset($_SESSION['user']['id'])) {
    return_response("failed", "No se ha iniciado sesión", null);
}
$userId = $_SESSION['user']['id'];

$allowed_fields = ["name", "birth_date", "user_type", "status", "location", "email", "description", "profile_picture", "portfolio"];
$fields_to_update = [];
$params = [];

foreach ($allowed_fields as $field) {
    if (isset($data->$field)) {
        $value = $data->$field;
        $fields_to_update[] = "$field = :$field";
        $params[":$field"] = is_string($value) ? trim($value) : $value;
    }
}

if (empty($fields_to_update)) {
    // Check if we're only updating languages or tags
    if (!isset($data->languages) && !isset($data->tags)) {
        return_response("failed", "No se recibieron datos para actualizar", null);
        exit;
    }
}

try {
    $connection->beginTransaction();

    // Update user fields if there are any to update
    if (!empty($fields_to_update)) {
        $params[":id"] = $userId;
        $sql = "UPDATE users SET " . implode(", ", $fields_to_update) . " WHERE id = :id";
        $query = $connection->prepare($sql);
        $query->execute($params);
    }

    // === LANGUAGES ===
    if (isset($data->languages) && isset($data->languages_levels)) {
        $languages = $data->languages;
        $languages_levels = $data->languages_levels;

        if (count($languages) > 0 && count($languages) === count($languages_levels)) {
            // Delete removed languages
            $placeholders = implode(',', array_fill(0, count($languages), '?'));
            $sqlDelete = "DELETE FROM user_languages WHERE user_id = ? AND language_id NOT IN ($placeholders)";
            $stmt = $connection->prepare($sqlDelete);
            $stmt->execute(array_merge([$userId], $languages));

            // Insert new or update only if changed
            foreach ($languages as $i => $langId) {
                $level = $languages_levels[$i];

                $check = $connection->prepare("SELECT level FROM user_languages WHERE user_id = ? AND language_id = ?");
                $check->execute([$userId, $langId]);
                $existing = $check->fetch(PDO::FETCH_ASSOC);

                if (!$existing) {
                    $insert = $connection->prepare("INSERT INTO user_languages (user_id, language_id, level) VALUES (?, ?, ?)");
                    $insert->execute([$userId, $langId, $level]);
                } elseif ($existing['level'] != $level) {
                    $update = $connection->prepare("UPDATE user_languages SET level = ? WHERE user_id = ? AND language_id = ?");
                    $update->execute([$level, $userId, $langId]);
                }
            }
        }
    }

    // === TAGS ===
    if (isset($data->tags) && isset($data->tags_levels)) {
        $tags = $data->tags;
        $tags_levels = $data->tags_levels;

        if (count($tags) > 0 && count($tags) === count($tags_levels)) {
            // Delete removed tags
            $placeholders = implode(',', array_fill(0, count($tags), '?'));
            $sqlDelete = "DELETE FROM user_tags WHERE user_id = ? AND tag_id NOT IN ($placeholders)";
            $stmt = $connection->prepare($sqlDelete);
            $stmt->execute(array_merge([$userId], $tags));

            // Insert new or update only if changed
            foreach ($tags as $i => $tagId) {
                $level = $tags_levels[$i];

                $check = $connection->prepare("SELECT level FROM user_tags WHERE user_id = ? AND tag_id = ?");
                $check->execute([$userId, $tagId]);
                $existing = $check->fetch(PDO::FETCH_ASSOC);

                if (!$existing) {
                    $insert = $connection->prepare("INSERT INTO user_tags (user_id, tag_id, level) VALUES (?, ?, ?)");
                    $insert->execute([$userId, $tagId, $level]);
                } elseif ($existing['level'] != $level) {
                    $update = $connection->prepare("UPDATE user_tags SET level = ? WHERE user_id = ? AND tag_id = ?");
                    $update->execute([$level, $userId, $tagId]);
                }
            }
        }
    }

    $connection->commit();

    // Get and return the updated user
    $updated = $connection->prepare("SELECT * FROM users WHERE id = ?");
    $updated->execute([$userId]);
    $updated_user = $updated->fetch(PDO::FETCH_ASSOC);

    return_response("success", "Usuario actualizado correctamente", $updated_user);
} catch (PDOException $e) {
    $connection->rollBack();
    return_response("failed", "Error al actualizar el usuario: " . $e->getMessage(), null);
}
?>