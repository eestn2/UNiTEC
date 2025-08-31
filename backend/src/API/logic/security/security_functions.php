<?php
/**
 * @file security_functions.php
 * @description Contains security-related functions for password encryption and decryption.
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
function encryption(string $password): string{
	return password_hash($password, PASSWORD_BCRYPT,['cost'=>16]);;
}
?>