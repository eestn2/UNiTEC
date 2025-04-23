<?php
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