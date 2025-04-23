<?php 
require "./seguridad.php";
require "./connection.php";
require "./metodoscrud.php";

$name=limpiarString($_POST['name']);
// limpia el string recibido
$opcion=$_POST['opcion'];
// recibe la opcion
if($opcion=='Resenia'){
    $idcreador=$_POST['id'];
    $datos=array(
        $idcreador,
        $name,
    );
}else{
    $datos=array(
        $name,
    );
}
//ingresa el dato en el array

$obj= new methods();
//instancia un objeto metodo
//si sube los datos dependiendo de la opcion es a que tabla los subira
if($obj->insertarDatos($datos, $opcion)){
    //redirecciona al index.php
    header("Location: ../vistas/adminmenu.php");
}else{
    // error
    echo "
    <div>
    Fallo al insertar datos
    </div>
    ";
}

?>