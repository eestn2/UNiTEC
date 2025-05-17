<?php
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
function encryption($password){
	$Definitive_password=password_hash($password, PASSWORD_BCRYPT,['cost'=>10]);
	return $Definitive_password;
}
?>