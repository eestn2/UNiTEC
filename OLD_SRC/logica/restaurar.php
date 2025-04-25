<?php
/**
 * This script handles the password reset functionality for a user.
 * It updates the user's password in the database and redirects them to the login page.
 *
 *
 * Prerequisites:
 * - Requires a valid database connection through "connection.php".
 * - Assumes a session is already started and contains the user's email in `$_SESSION['email']`.
 * - Expects a new password to be passed as a GET parameter `x`.
 *
 * Workflow:
 * 1. Includes the database connection file.
 * 2. Starts the session to retrieve the user's email.
 * 3. Retrieves the new password from the GET parameter `x`.
 * 4. Constructs an SQL query to update the user's password in the `usuarios` table.
 * 5. Executes the query using the database connection.
 * 6. Closes the database connection.
 * 7. Redirects the user to the login page (`../index.php`).
 * 8. Terminates the script execution.
 *
 * Security Concerns:
 * - The password is directly embedded into the SQL query, making it vulnerable to SQL injection attacks.
 *   Use prepared statements with parameterized queries to mitigate this risk.
 * - The password is not hashed before being stored in the database, which is a critical security flaw.
 *   Always hash passwords using a secure algorithm like `password_hash()` before storing them.
 * - The script assumes the presence of `$_SESSION['email']` and `$_GET['x']` without validating them.
 *   Add proper validation and error handling to ensure robustness.
 *
 * Recommendations:
 * - Refactor the code to use prepared statements for database queries.
 * - Hash the password before storing it in the database.
 * - Validate and sanitize all user inputs, including session variables and GET parameters.
 * - Implement proper error handling to handle database errors or missing inputs gracefully.
 */
require "./connection.php"; 
session_start();
$email=$_SESSION['email'];
$pas=$_GET['x'];
$cambiarContra="UPDATE `usuarios` SET `usuario_clave`='$pas' WHERE `usuario_email`='$email'";
$connection->query($cambiarContra);
$connection->close();
header("Location:../index.php");
exit();
die();
?>