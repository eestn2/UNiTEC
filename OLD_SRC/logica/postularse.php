<?php
// Set the default timezone to Buenos Aires, Argentina
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Include the database connection file
require "./connection.php"; 

// Retrieve the 'postulacion' and 'postulado' parameters from the GET request
$idpost = $_GET['postulacion'];
$idusu = $_GET['postulado'];

// Initialize a flag variable to true
$flag = true;

// Query to check if the user has already applied for the given postulation
$postulacion = "SELECT * FROM postulados WHERE postulacion_id=$idpost";
$eje1 = $connection->query($postulacion);

// Loop through the results to check if the user is already in the 'postulados' table
while ($row = mysqli_fetch_array($eje1)) {
    if ($row['usuario_id'] == $idusu) {
        // If the user is found, set the flag to false
        $flag = false;
    }
}

// If the user has not applied (flag is true)
if ($flag) {
    // Query to get the title of the postulation
    $postu = "SELECT postulaciones_titulo FROM `postulaciones` WHERE `postulaciones_id`=$idpost";
    $eje2 = $connection->query($postu);

    // Retrieve the title of the postulation
    while ($row = mysqli_fetch_array($eje2)) {
        $titulo = $row['postulaciones_titulo'];
    }

    // Insert a new record into the 'postulados' table for the user and postulation
    $agregar = "INSERT INTO `postulados`(`postulado_id`, `usuario_id`, `postulacion_id`, `postulado_estado`) VALUES (NULL,'$idusu','$idpost',3)";

    // Prepare the email details
    $asunto = "Postulacion"; // Subject of the email
    $desc = "Se ha postulado exitosamente a: $titulo"; // Email message content

    // Insert a record into the 'mails_enviados' table to log the email
    $mensaje = "INSERT INTO `mails_enviados`(`mail_id`, `mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`) VALUES (NULL,'$asunto','$desc',1,'$idusu')";

    // Execute the queries to insert the new postulation and log the email
    $subir = $connection->query($agregar);
    $subir = $connection->query($mensaje);
}

// Redirect the user to the index page
header('Location:../index.php');

// Terminate the script
die();
exit();
?>