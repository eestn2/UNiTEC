# UNiTEC Backend Codebase Documentation

Welcome to the documentation for the UNiTEC backend!  
This guide provides an overview of the main API endpoints, logic utilities, database structure, and conventions, with references to PHPDoc annotations for clarity and maintainability.

---

## Table of Contents

- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Logic Utilities](#logic-utilities)
- [Database](#database)
- [Config & Constants](#config--constants)
- [Mailer](#mailer)
- [Conventions](#conventions)

---

## Project Structure

````
src/
  API/
    DotEnv.php
    config/
      constants.php
    database/
      database.sql
      connection.php
    logic/
      communications/
        return_response.php
      database/
      notifications/
      security/
        is_admin.php
      util/
        cleanup-old-offers.php
        get_user_from_request.php
    PHPMailer/
      ...
    requests/
      cors-policy.php
      admin/
        add_language.php
        add_tag.php
        edit_language.php
        edit_tag.php
      enterprise/
        accept-application.php
        delete-offer.php
        end-job-offer.php
        get-active-offers.php
        publish-offer.php
        reject-application.php
      feed/
        job-offers.php
      function/
        get-notification-data.php
      session/
        login.php
        user-register.php
      user/
        retrieve-notifications.php
        user-info.php
````

---

## API Endpoints

### [`requests/enterprise/accept-application.php`](../../src/API/requests/enterprise/accept-application.php)

```php
/**
 * @file accept-application.php
 * @description API endpoint for enterprises to accept a job application (postulante).
 * Handles PUT requests, verifies permissions, checks application ownership, and updates applicant status.
 * Ensures only enterprise users (user_type_id = 1) can accept applicants for their own job offers.
 * Rolls back on failure and returns a standardized JSON response.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Accepts a job applicant for a specific offer, with permission and ownership checks.
- **Usage:** PUT request with `creator_id`, `user_id`, `application_id`.

---

### [`requests/enterprise/reject-application.php`](../../src/API/requests/enterprise/reject-application.php)

```php
/**
 * @file reject-application.php
 * @description API endpoint for enterprises to reject a job application (postulante).
 * Handles PUT requests, verifies permissions, checks application ownership, and updates applicant status to rejected.
 * Ensures only enterprise users (user_type_id = 1) can reject applicants for their own job offers.
 * Rolls back on failure and returns a standardized JSON response.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Rejects a job applicant for a specific offer, with permission and ownership checks.
- **Usage:** PUT request with `creator_id`, `user_id`, `application_id`.

---

### [`requests/enterprise/delete-offer.php`](../../src/API/requests/enterprise/delete-offer.php)

```php
/**
 * @file delete-offer.php
 * @description API endpoint for deleting a job offer by its creator (enterprise) or an administrator.
 * Handles DELETE requests, verifies user permissions, checks offer ownership, and deletes the offer if authorized.
 * Only enterprise users (user_type_id = 1) and administrators (user_type_id = 4) can delete job offers.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Deletes a job offer if the requester is the creator or an admin.
- **Usage:** DELETE request with `creator_id`, `id`.

---

### [`requests/enterprise/end-job-offer.php`](../../src/API/requests/enterprise/end-job-offer.php)

```php
/**
 * @file end-job-offer.php
 * @description API endpoint for marking a job offer as closed by its creator (enterprise).
 * Handles PUT requests, verifies that the user is the creator of the offer, and updates the offer status to closed.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Marks a job offer as closed.
- **Usage:** PUT request with `application_id`, `creator_id`.

---

### [`requests/enterprise/get-active-offers.php`](../../src/API/requests/enterprise/get-active-offers.php)

```php
/**
 * @file get-active-offers.php
 * @description API endpoint to retrieve all active job offers created by a specific enterprise user.
 * Handles GET requests, validates the creator_id parameter, and returns all job offers with active status (status = 1) for the given creator.
 * Returns a standardized JSON response with the list of active offers or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Lists all active job offers for a given enterprise user.
- **Usage:** GET request with `creator_id` as query parameter.

---

### [`requests/enterprise/publish-offer.php`](../../src/API/requests/enterprise/publish-offer.php)

```php
/**
 * @file publish-offer.php
 * @description API endpoint for publishing a new job offer by an enterprise user.
 * Handles POST requests, verifies that the user is an enterprise, and inserts the new job offer into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Publishes a new job offer.
- **Usage:** POST request with `creator_id`, `title`, `description`.

---

### [`requests/feed/job-offers.php`](../../src/API/requests/feed/job-offers.php)

```php
/**
 * @file job-offers.php
 * @description API endpoint to retrieve all job offers from the database.
 * Handles GET requests, queries the database for job offers, and returns a JSON response.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */
```

- **Purpose:** Retrieves all job offers for the feed.
- **Usage:** GET request.

---

### [`requests/admin/add_language.php`](../../src/API/requests/admin/add_language.php)

```php
/**
 * @file add_language.php
 * @description API endpoint for adding a new language to the system. Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and inserts the new language into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Adds a new language (admin only).
- **Usage:** POST request with `user_id`, `name`.

---

### [`requests/admin/edit_language.php`](../../src/API/requests/admin/edit_language.php)

```php
/**
 * @file edit_language.php
 * @description API endpoint for editing the name of a language. Only administrators are authorized to perform this action.
 * Handles PUT requests, verifies admin permissions, and updates the language name in the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 17, 2025
 */
```

- **Purpose:** Edits a language name (admin only).
- **Usage:** PUT request with `user_id`, `id`, `name`.

---

### [`requests/admin/add_tag.php`](../../src/API/requests/admin/add_tag.php)

```php
/**
 * @file add_tag.php
 * @description API endpoint for adding a new tag to the system. Only administrators are authorized to perform this action.
 * Handles POST requests, verifies admin permissions, and inserts the new tag into the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 17, 2025
 */
```

- **Purpose:** Adds a new tag (admin only).
- **Usage:** POST request with `user_id`, `name`.

---

### [`requests/admin/edit_tag.php`](../../src/API/requests/admin/edit_tag.php)

```php
/**
 * @file edit_tag.php
 * @description API endpoint for editing the name of a tag. Only administrators are authorized to perform this action.
 * Handles PUT requests, verifies admin permissions, and updates the tag name in the database.
 * Returns a standardized JSON response indicating success or failure.
 * @author Francesco Sidotti
 * @date May 17, 2025
 */
```

- **Purpose:** Edits a tag name (admin only).
- **Usage:** PUT request with `user_id`, `id`, `name`.

---

### [`requests/admin/accept-new-users.php`](../../src/API/requests/admin/accept-new-users.php)

```php
/**
 * @file accept-new-users.php
 * @description API endpoint for administrators to accept (activate) new user accounts.
 * Handles PUT requests, verifies admin permissions, and updates the 'enabled' status of the target user.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing:
 *     - target_user_id: (int) ID of the user to accept (activate)
 *     - id: (int) ID of the authenticated admin user (for permission check)
 *
 * Example:
 *   PUT /src/API/requests/admin/accept-new-users.php
 *   Body: { "target_user_id": 8, "id": 1 }
 *   Response: { "status": "success", "message": "Usuario aceptado con exito.", "data": null }
 */
```

- **Purpose:** Allows an administrator to activate (accept) a new user account.
- **Usage:** PUT request with `target_user_id` and authenticated admin `id` in the body.

---

### [`requests/function/get-notification-data.php`](../../src/API/requests/function/get-notification-data.php)

```php
/**
 * @file get-notification-data.php
 * @description API endpoint to retrieve all data for a specific notification by its ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response with the notification data.
 * @author Haziel Magallanes
 * @date May 14, 2025
 */
```

- **Purpose:** Retrieves all data for a notification by its ID.
- **Usage:** GET request with `id` as query parameter.

---

### [`requests/session/login.php`](../../src/API/requests/session/login.php)

```php
/**
 * @file login.php
 * @description API endpoint for user login. Handles POST requests, validates credentials, and returns user data and status.
 * Returns a standardized JSON response with user info or error message.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */
```

- **Purpose:** Authenticates a user and returns user info.
- **Usage:** POST request with `email`, `password`.

---

### [`requests/session/user-register.php`](../../src/API/requests/session/user-register.php)

```php
/**
 * @file user-register.php
 * @description API endpoint for registering a new user (student). Handles POST requests, validates input, checks for duplicate emails, inserts user data and related languages/tags, sends a confirmation email, and logs the registration.
 * Uses transactions for data integrity and returns standardized JSON responses.
 * @author Federico Nicolás Martínez
 * @date May 11, 2025
 */
```

- **Purpose:** Registers a new user, including languages and tags, and sends a confirmation email.
- **Usage:** POST request with user registration data.

---

### [`requests/session/change-password.php`](../../src/API/requests/session/change-password.php)

```php
/**
 * @file change-password.php
 * @description API endpoint for changing a user's password.
 * Handles PATCH requests, validates the current password, checks new password requirements, and updates the password in the database.
 * Ensures the new password is not the same as the current one and meets minimum security requirements.
 * Returns a standardized JSON response indicating success or failure.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PATCH request with JSON body containing:
 *     - id: (int) ID of the user whose password is being changed
 *     - password: (string) Current password
 *     - new_password: (string) New password
 *
 * Example:
 *   PATCH /src/API/requests/session/change-password.php
 *   Body: { "id": 7, "password": "oldpass", "new_password": "newpass123" }
 *   Response: { "status": "success", "message": "Contraseña cambiada correctamente.", "data": null }
 */
```

- **Purpose:** Changes a user's password after validating the current password and new password requirements.
- **Usage:** PATCH request with `id`, `password`, and `new_password` in the body.

---

### [`requests/user/retrieve-notifications.php`](../../src/API/requests/user/retrieve-notifications.php)

```php
/**
 * @file retrieve-notifications.php
 * @description API endpoint to retrieve all notifications for a given user ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response with notifications.
 * @author Haziel Magallanes
 * @date May 14, 2025
 */
```

- **Purpose:** Retrieves all notifications for a user.
- **Usage:** GET request with `user_id` as query parameter.

---

### [`requests/user/user-info.php`](../../src/API/requests/user/user-info.php)

```php
/**
 * @file user-info.php
 * @description API endpoint to retrieve a user's name and profile picture by user ID.
 * Handles GET requests, validates input, queries the database, and returns a JSON response.
 * @author Haziel Magallanes, Federico Nicolas Martinez.
 * @date May 11, 2025
 */
```

- **Purpose:** Retrieves a user's name and profile picture by user ID.
- **Usage:** GET request with `id` as query parameter.

---

### [`requests/user/get-user-applications.php`](../../src/API/requests/user/get-user-applications.php)

```php
/**
 * @file get-user-applications.php
 * @description API endpoint to retrieve all active job applications (postulaciones) made by a specific user (postulante).
 * Handles GET requests, verifies that the user is a postulante (user_type_id = 2), and returns all their active applications.
 * Joins with applications and application_statuses tables to provide detailed information about each application.
 * Returns a standardized JSON response with the list of applications or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a GET request with the user_id as a query parameter:
 *     - user_id: (int) ID of the postulante whose applications are requested
 *
 * Example:
 *   GET /src/API/requests/user/get-user-applications.php?user_id=12
 *   Response: { "status": "success", "message": "Postulaciones activas encontradas.", "data": [ ... ] }
 */
```

- **Purpose:** Retrieves all active job applications made by a specific postulante.
- **Usage:** GET request with `user_id` as query parameter.

---

### [`requests/user/edit-user.php`](../../src/API/requests/user/edit-user.php)

```php
/**
 * @file edit-user.php
 * @description API endpoint for editing user profile information.
 * Handles PUT requests, validates input, and updates allowed user fields in the database.
 * Only updates fields that are present in the request and allowed for editing.
 * Returns a standardized JSON response indicating success or failure, and returns the updated user data on success.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 *
 * Usage:
 *   Send a PUT request with JSON body containing the user fields to update.
 *   Only the following fields can be updated: name, birth_date, location, email, description, profile_picture, portfolio.
 *
 * Example:
 *   PUT /src/API/requests/user/edit-user.php
 *   Body: { "id": 7, "name": "Nuevo Nombre", "location": "Ciudad" }
 *   Response: { "status": "success", "message": "Usuario actualizado correctamente", "data": { ...usuario actualizado... } }
 */
```

- **Purpose:** Updates user profile fields for a given user.
- **Usage:** PUT request with user fields to update (see allowed fields in usage).

---

## Logic Utilities

### [`logic/security/is_admin.php`](../../src/API/logic/security/is_admin.php)

```php
/**
 * @file is_admin.php
 * @description Utility function to check if a user is an administrator.
 * Queries the database for the user's type and returns true if the user is an admin (user_type_id = 4).
 * Used to restrict access to admin-only API endpoints and actions.
 * @author Francesco Sidotti
 * @date May 17, 2025
 */
```

- **Purpose:** Checks if a user is an admin (`user_type_id = 4`).
- **Usage:** `is_admin($user_id, $connection)`

---

### [`logic/security/security_functions.php`](../../src/API/logic/security/security_functions.php)

```php
/**
 * @file security_functions.php
 * @description Contains security-related functions for password encryption and decryption.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   Include this file in any PHP script that requires password encryption or decryption.
 *
 * Example:
 *   require_once __DIR__ . '/../logic/security_functions.php';
 *   $hashedPassword = encryption('my_password');
 *   $isValid = password_verify('my_password', $hashedPassword);
 */
```

- **Purpose:** Provides password encryption (hashing) and related security functions.
- **Usage:** Use `encryption($password)` to hash passwords before storing them.

---

### [`logic/util/cleanup-old-offers.php`](../../src/API/logic/util/cleanup-old-offers.php)

```php
/**
 * @file cleanup-old-offers.php
 * @description Utility script for removing old and inactive job offers from the database.
 * Deletes job offers with status = 0 (inactive) that are older than a specified number of days (default: 30).
 * Intended for use by administrators or as a scheduled maintenance task.
 * Returns a standardized JSON response indicating the number of deleted offers or an error message.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Cleans up old/inactive job offers (default: older than 30 days).
- **Usage:** Run as CLI script or scheduled task.

---

### [`logic/util/get_user_from_request.php`](../../src/API/logic/util/get_user_from_request.php)

```php
/**
 * @file get_user_from_request.php
 * @description Utility function to extract and sanitize user data from a request payload.
 * Converts and trims string fields, casts booleans and integers, and ensures all expected user fields are present.
 * Used to standardize user data input before database operations or further validation.
 * @author Federico Nicolás Martínez
 * @date May 17, 2025
 */
```

- **Purpose:** Sanitizes and extracts user fields from request data.
- **Usage:** `get_user_from_request($data)`

---

### [`logic/communications/return_response.php`](../../src/API/logic/communications/return_response.php)

```php
/**
 * @file return_response.php
 * @description Utility function to return standardized JSON responses for API endpoints.
 * Used throughout the backend to ensure consistent API responses.
 */
```

- **Purpose:** Sends JSON responses with `status`, `message`, and optional `data`.
- **Usage:** `return_response($status, $message, $data)`

---

### [`logic/communications/send_email.php`](../../src/API/logic/communications/send_email.php)

```php
/**
 * @file send_email.php
 * @description Secure and standardized function to send emails using PHPMailer. 
 *              Returns true on success, false on failure. Logs errors if sending fails.
 * @author Haziel Magallanes
 * @date May 12, 2025
 *
 * Usage:
 *   require_once __DIR__ . '/send_email.php';
 *   send_email($to, $subject, $body);
 */
```

- **Purpose:** Sends emails securely using PHPMailer and environment-based SMTP configuration.
- **Usage:** Call `send_email($to, $subject, $body)` to send an email. Returns `true` on success, `false` on failure.

---

### [`logic/notifications/send_notification.php`](../../src/API/logic/notifications/send_notification.php)

```php
/**
 * @file send_notification.php
 * @description Utility function to log notifications into the database. Supports different notification types and messages.
 * @author Haziel Magallanes
 * @date May 14, 2025
 *
 * Usage:
 *   require_once __DIR__ . '/send_notification.php';
 *   send_notification($connection, $type, $receiver_id, $extra = []);
 *
 * @param PDO $connection   PDO database connection.
 * @param int $type         Notification type (1-5).
 * @param int $receiver_id  User ID who will receive the notification.
 * @param array $extra      Extra data depending on type (e.g., 'offer_id').
 * @return bool             True on success, false on failure.
 */
```

- **Purpose:** Logs notifications in the database for various system and offer-related events.
- **Usage:** Call `send_notification($connection, $type, $receiver_id, $extra)` to create a notification. Returns `true` on success, `false` on failure.

---

## Database

### [`database/database.sql`](../../src/API/database/database.sql)

- **Purpose:** Contains the SQL schema for all tables, including users, applications, applicants, tags, languages, and more.
- **Usage:** Used to initialize and migrate the backend database.

---

### [`database/connection.php`](../../src/API/database/connection.php)

- **Purpose:** Establishes a PDO connection to the MySQL database.
- **Usage:** Required by all endpoints and logic scripts needing database access.

---

## Config & Constants

### [`config/constants.php`](../../src/API/config/constants.php)

- **Purpose:** Defines application-wide constants (e.g., status codes, user types).
- **Usage:** Included where global constants are needed.

---

## Mailer

### [`PHPMailer/`](../../src/API/PHPMailer/)

- **Purpose:** Third-party library for sending emails (see [PHPMailer documentation](https://github.com/PHPMailer/PHPMailer)).
- **Usage:** Used for email notifications, password resets, etc.

---

## Conventions

- **PHPDoc Tags Used:**  
  `@file`, `@description`, `@date`, `@author`,  
  `@param`, `@return`, `@example`, `@usage`

- **Authoring:**  
  All major files and endpoints are annotated with author and date for traceability.

- **Responses:**  
  All endpoints use a standardized JSON response format via `return_response.php`.

- **Security:**  
  Admin-only actions are protected by `is_admin.php` and user type checks.

---

## Example Usage

```php
// Example: Accepting a job application
$data = json_decode(file_get_contents("php://input"));
if (!isset($data->creator_id) || !isset($data->user_id) || !isset($data->application_id)) {
    return_response("failed", "Faltan datos obligatorios.", null);
}
// ... further logic ...
```

---

For further details, refer to the PHPDoc comments in each file or explore the codebase directly.

---
