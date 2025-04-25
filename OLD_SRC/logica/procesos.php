<?php 
// Include the seguridad.php file for security-related functions or checks
require "./seguridad.php";

// Include the connection.php file to establish a database connection
require "./connection.php";

// Include the metodoscrud.php file which likely contains CRUD (Create, Read, Update, Delete) methods
require "./metodoscrud.php";

// Retrieve the 'name' value from the POST request and sanitize it using the limpiarString function
$name = limpiarString($_POST['name']);

// Retrieve the 'opcion' value from the POST request, which determines the operation or table to use
$opcion = $_POST['opcion'];

// Check if the 'opcion' is 'Resenia' (likely a specific operation or table name)
if ($opcion == 'Resenia') {
    // If 'opcion' is 'Resenia', retrieve the 'id' value from the POST request
    $idcreador = $_POST['id'];

    // Create an array with the 'idcreador' and sanitized 'name' values
    $datos = array(
        $idcreador,
        $name,
    );
} else {
    // If 'opcion' is not 'Resenia', create an array with only the sanitized 'name' value
    $datos = array(
        $name,
    );
}

// Instantiate an object of the 'methods' class, which likely contains database-related methods
$obj = new methods();

// Call the insertarDatos method of the 'methods' class to insert the data into the database
// The method takes the 'datos' array and the 'opcion' as parameters
if ($obj->insertarDatos($datos, $opcion)) {
    // If the data insertion is successful, redirect the user to the admin menu page
    header("Location: ../vistas/adminmenu.php");
} else {
    // If the data insertion fails, display an error message
    echo "
    <div>
    Fallo al insertar datos
    </div>
    ";
}
?>