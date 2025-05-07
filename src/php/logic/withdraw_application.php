<?php
//Nombre anterior del archivo: despostularse.php
date_default_timezone_set('America/Argentina/Buenos_Aires');
require "./connect_to_database.php"; 
$applicationId=$_GET['postulacion'];
$userId=$_GET['postulado'];
$getTitleQuery="SELECT title FROM `applications` WHERE `id`=$applicationId";
$titleResult=$connection->query($getTitleQuery);
$isUserApplied=false;
$checkApplicationQuery="SELECT * FROM applicants WHERE id=$applicationId";
$checkResult=$connection->query($checkApplicationQuery);
while($row=mysqli_fetch_array($checkResult)){
    if($row['user_id']==$userId){
        $isUserApplied=true;
    }
}
while($row=mysqli_fetch_array($titleResult)){
    $applicationTitle=$row['title'];
}

if($isUserApplied){
    $deleteQuery="DELETE FROM `applicants` WHERE id=$applicationId AND user_id=$userId";
    $emailSubject="Postulación";
    $emailMessage="Se ha despostulado exitosamente a: $applicationTitle";
    $insertEmailQuery="INSERT INTO `sent_mails`(`id`, `subject`, `message`, `sender_id`, `receiver_id`, `sent_date`) VALUES (NULL,'$emailSubject','$emailMessage',1,'$userId',current_timestamp())";
    $queryResult=$connection->query($deleteQuery);
    $queryResult=$connection->query($insertEmailQuery);   
}

header('Location:../user_dashboard.php');
die();
exit();
?>