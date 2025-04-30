<?php 
//Nombre anterior del archivos: eliminar.php
require "./connect_to_database.php";
require "./crud_methods.php";

$id=$_GET['id'];
//recibe el id
$opcion=$_GET['opcion'];
//recibe la opcion
$obj= new methods();
//instancia un objeto metodo
//si elimina los datos del id segun la opcion
if($obj->delete_Data($id,$opcion)){
    //redirecciona al index
    header("location: ../vistas/adminmenu.php");
}else{
    //error
    echo json_encode("Fallo al eliminar datos") ;
}


?>