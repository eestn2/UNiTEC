<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
require "./connection.php"; 
$idpost=$_GET['postulacion'];
$idusu=$_GET['postulado'];
$postu="SELECT postulaciones_titulo FROM `postulaciones` WHERE `postulaciones_id`=$idpost";
$eje2=$connection->query($postu);
$flag=false;
$postulacion="SELECT * FROM postulados WHERE postulacion_id=$idpost";
$eje1=$connection->query($postulacion);
while($row=mysqli_fetch_array($eje1)){
    if($row['usuario_id']==$idusu){
        $flag=true;
    }
}
while($row=mysqli_fetch_array($eje2)){
    $titulo=$row['postulaciones_titulo'];
}

if($flag){
    $eliminar="DELETE FROM `postulados` WHERE postulacion_id=$idpost AND usuario_id=$idusu";
    $asunto="Postulacion";
    $desc="Se ha despostulado exitosamente a: $titulo";
    $mensaje="INSERT INTO `mails_enviados`(`mail_id`, `mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (NULL,'$asunto','$desc',1,'$idusu',current_timestamp())";
    $subir=$connection->query($eliminar);
    $subir=$connection->query($mensaje);   
}

header('Location:../index.php');
die();
exit();
?>