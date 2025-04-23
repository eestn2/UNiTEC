<?php 
require "./connection.php";
require "./metodoscrud.php";

$id=$_GET['id'];
//recibe el id
$opcion=$_GET['opcion'];
//recibe la opcion
$obj= new methods();
//instancia un objeto metodo
//si elimina los datos del id segun la opcion
if($obj->eliminarDatos($id,$opcion)){
    //redirecciona al index
    header("location: ../vistas/adminmenu.php");
}else{
    //error
    echo "Fallo al eliminar datos";
}


?>