<?php 
require "./seguridad.php";
require "./connection.php";
require "./metodoscrud.php";

$name=limpiarString($_POST['name']);
//limpia el string recibido
$id=$_POST['id'];
//recibe id
$opcion=$_POST['opcion'];
//recibe opcion
//inserta los datos a array
$datos=array(
    $name,
    $id
);

//instancia el objeto methods
$obj= new methods();
// si actualiza los datos segun la opcion
if($obj->actualizarDatos($datos,$opcion)){
    // redirecciona al index
    header("Location: ../vistas/adminmenu.php");
}else{
    //error
    echo "Fallo al actualizar datos";
}

?>