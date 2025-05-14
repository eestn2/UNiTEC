<?php
//Nombre anterior: restaurar.php
require "./connect_to_database.php"; 
session_start();
$email=$_SESSION['email'];
$pas=$_GET['x'];
$change_password="UPDATE `users` SET `password`='$pas' WHERE `email`='$email'";
$connection->query($change_password);
$connection->close();
header("Location:../user_dashboard.php");
exit();
die();
?>