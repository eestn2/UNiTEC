<?php
// Creada por Fausto Diaz Carmody
// funcion limpia y remplaza el string cuando tenga cualquiera de los siguientes valores
function limpiarString($cadena){
	$cadena=trim($cadena);
	$cadena=stripslashes($cadena);
	$cadena=str_ireplace("'", "",$cadena);
	$cadena=str_ireplace("<script>", "", $cadena);
	$cadena=str_ireplace("</script>", "", $cadena);
	$cadena=str_ireplace("<script src>", "", $cadena);
	$cadena=str_ireplace("<script type=>", "", $cadena);
	$cadena=str_ireplace("SELECT * FROM", "", $cadena);
	$cadena=str_ireplace("DELETE FROM", "", $cadena);
	$cadena=str_ireplace("DROP TABLE", "", $cadena);
	$cadena=str_ireplace("DROP DATABASE", "", $cadena);
	$cadena=str_ireplace("TRUNCATE TABLE", "", $cadena);
	$cadena=str_ireplace("SHOW TABLES", "", $cadena);
	$cadena=str_ireplace("SHOW DATABASES", "", $cadena);
	$cadena=str_ireplace("<?php", "", $cadena);
	$cadena=str_ireplace("?>", "", $cadena);
	$cadena=str_ireplace("--", "", $cadena);
	$cadena=str_ireplace("^", "", $cadena);
	$cadena=str_ireplace("<", "", $cadena);
	$cadena=str_ireplace("[", "", $cadena);
	$cadena=str_ireplace("]", "", $cadena);
	$cadena=str_ireplace("==", "", $cadena);
	$cadena=str_ireplace(";", "", $cadena);
	$cadena=str_ireplace("::", "", $cadena);
	$cadena=str_ireplace("UNION", "", $cadena);
	$cadena=str_ireplace("-", "", $cadena);
	$cadena=trim($cadena);
	$cadena=stripslashes($cadena); 
	return $cadena;
}
//Función para limpiar una cadena

//Función para encriptar contraseña
function encriptar($clave){
	$claveDefinitiva=password_hash($clave, PASSWORD_BCRYPT,['cost'=>10]);
	return $claveDefinitiva;
}
//Función para encriptar contraseña
?>