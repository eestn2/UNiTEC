<?php 
//Nombre anterior: procesos.php
require "./security_functions.php";
require "./connect_to_database.php";
require "./crud_methods.php";

$name=cleanStrings($_POST['name']);
// limpia el string recibido
$option=$_POST['option'];
// recibe la option
if($option=='reviews'){
    $creator_id=$_POST['id'];
    $data=array(
        $creator_id,
        $name,
    );
}else{
    $data=array(
        $name,
    );
}
//ingresa el dato en el array

$instance_methods_crud= new methods();
//instancia un objeto metodo
//si sube los data dependiendo de la option es a que tabla los subira
if($instance_methods_crud->insert_Data($data, $option)){
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