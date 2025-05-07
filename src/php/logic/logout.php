<?php 
//Nombre anterior del archivo: cerrarsesion.php
//Descripción: Este archivo cierra la sesión del usuario y redirige a la página de inicio de sesión.
session_start();
session_unset();
session_destroy();
header("Location:../vistas/login.php");
?>