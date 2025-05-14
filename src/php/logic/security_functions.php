<?php
//nombre anterior: seguridad.php
//nombre anterior de la función: limpiarString
function cleanStrings($chain){
	$chain=trim($chain);
	$chain=stripslashes($chain);
	$chain=str_ireplace("'", "",$chain);
	$chain=str_ireplace("<script>", "", $chain);
	$chain=str_ireplace("</script>", "", $chain);
	$chain=str_ireplace("<script src>", "", $chain);
	$chain=str_ireplace("<script type=>", "", $chain);
	$chain=str_ireplace("SELECT * FROM", "", $chain);
	$chain=str_ireplace("DELETE FROM", "", $chain);
	$chain=str_ireplace("DROP TABLE", "", $chain);
	$chain=str_ireplace("DROP DATABASE", "", $chain);
	$chain=str_ireplace("TRUNCATE TABLE", "", $chain);
	$chain=str_ireplace("SHOW TABLES", "", $chain);
	$chain=str_ireplace("SHOW DATABASES", "", $chain);
	$chain=str_ireplace("<?php", "", $chain);
	$chain=str_ireplace("?>", "", $chain);
	$chain=str_ireplace("--", "", $chain);
	$chain=str_ireplace("^", "", $chain);
	$chain=str_ireplace("<", "", $chain);
	$chain=str_ireplace("[", "", $chain);
	$chain=str_ireplace("]", "", $chain);
	$chain=str_ireplace("==", "", $chain);
	$chain=str_ireplace(";", "", $chain);
	$chain=str_ireplace("::", "", $chain);
	$chain=str_ireplace("UNION", "", $chain);
	$chain=str_ireplace("-", "", $chain);
	$chain=trim($chain);
	$chain=stripslashes($chain); 
	return $chain;
}

//Nombre anterior de la función: encriptar
function encryption($password){
	$Definitive_password=password_hash($password, PASSWORD_BCRYPT,['cost'=>10]);
	return $Definitive_password;
}
?>