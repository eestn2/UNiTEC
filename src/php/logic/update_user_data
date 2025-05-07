<?php 
//Nombre anterior del archivo: actualizar.php
//Descripción: Este archivo actualiza los data del usuario en la base de data y redirige a la página de administración.

require "./security_functions.php";
require "./connect_to_database.php";
require "./crud_methods.php";

$name=cleanStrings($_POST['name']);
//limpia el string recibido
$id=$_POST['id'];
//recibe id
$option=$_POST['option'];
//recibe option
//inserta los data a array
$data=array(
    $name,
    $id
);

//instancia el objeto methods
$obj= new methods();
// si actualiza los data segun la option
if($obj->update_Data($data,$option)){
    // redirecciona al index
    header("Location: ../vistas/adminmenu.php");
}else{
    //error
    echo "Fallo al actualizar data";
}

?>