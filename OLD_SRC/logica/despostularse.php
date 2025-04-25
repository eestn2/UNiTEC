<?php
// Set the default timezone to Buenos Aires, Argentina
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Include the database connection file
require "./connection.php"; 

// Retrieve the 'postulacion' and 'postulado' parameters from the GET request
$idpost = $_GET['postulacion'];
$idusu = $_GET['postulado'];

// Query to get the title of the postulation based on the given postulation ID
$postu = "SELECT postulaciones_titulo FROM `postulaciones` WHERE `postulaciones_id`=$idpost";
$eje2 = $connection->query($postu); // Execute the query

// Initialize a flag to check if the user is associated with the postulation
$flag = false;

// Query to get all users associated with the given postulation ID
$postulacion = "SELECT * FROM postulados WHERE postulacion_id=$idpost";
$eje1 = $connection->query($postulacion); // Execute the query

// Loop through the results to check if the given user ID is associated with the postulation
while ($row = mysqli_fetch_array($eje1)) {
    if ($row['usuario_id'] == $idusu) {
        $flag = true; // Set the flag to true if the user is found
    }
}

// Loop through the results of the postulation title query to retrieve the title
while ($row = mysqli_fetch_array($eje2)) {
    $titulo = $row['postulaciones_titulo']; // Store the title of the postulation
}

// If the user is associated with the postulation (flag is true)
if ($flag) {
    // Query to delete the user from the 'postulados' table for the given postulation ID
    $eliminar = "DELETE FROM `postulados` WHERE postulacion_id=$idpost AND usuario_id=$idusu";

    // Prepare the email details to notify about the un-postulation
    $asunto = "Postulacion"; // Subject of the email
    $desc = "Se ha despostulado exitosamente a: $titulo"; // Description/message of the email

    // Query to insert the email notification into the 'mails_enviados' table
    $mensaje = "INSERT INTO `mails_enviados`(`mail_id`, `mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) 
                VALUES (NULL, '$asunto', '$desc', 1, '$idusu', current_timestamp())";

    // Execute the deletion query
    $subir = $connection->query($eliminar);

    // Execute the email insertion query
    $subir = $connection->query($mensaje);   
}

// Redirect the user to the index page
header('Location:../index.php');

// Terminate the script
die();
exit();
?>