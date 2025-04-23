<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
require "./connection.php"; 
$idpost=$_GET['postulacion'];
$idusu=$_GET['postulado'];
$flag=true;
$postulacion="SELECT * FROM postulados WHERE postulacion_id=$idpost";
$eje1=$connection->query($postulacion);
while($row=mysqli_fetch_array($eje1)){
    if($row['usuario_id']==$idusu){
        $flag=false;
    }
}
if($flag){
    $postu="SELECT postulaciones_titulo FROM `postulaciones` WHERE `postulaciones_id`=$idpost";
    $eje2=$connection->query($postu);
    while($row=mysqli_fetch_array($eje2)){
        $titulo=$row['postulaciones_titulo'];
    }
    $agregar="INSERT INTO `postulados`(`postulado_id`, `usuario_id`, `postulacion_id`, `postulado_estado`) VALUES (NULL,'$idusu','$idpost',3)";
    $asunto="Postulacion";
    $desc="Se ha postulado exitosamente a: $titulo";
    $mensaje="INSERT INTO `mails_enviados`(`mail_id`, `mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`) VALUES (NULL,'$asunto','$desc',1,'$idusu')";
    $subir=$connection->query($agregar);
    $subir=$connection->query($mensaje);
}

header('Location:../index.php');
die();
exit();
?>