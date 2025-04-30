<?php
//Nombre anterior del archivos: postularse.php
date_default_timezone_set('America/Argentina/Buenos_Aires');
require "./connect_to_database.php"; 
$applicationId=$_GET['alreadyAppliedQuery'];
$userId=$_GET['postulado'];
$isAlreadyApplied=true;
$alreadyAppliedQuery="SELECT * FROM applicants WHERE id=$applicationId";
$resultSetPostulation=$connection->query($alreadyAppliedQuery);
while($row=mysqli_fetch_array($resultSetPostulation)){
    if($row['usuario_id']==$userId){
        $isAlreadyApplied=false;
    }
}
if($isAlreadyApplied){
    $applicationTitleQuery="SELECT title FROM `applications` WHERE `id`=$applicationId";
    $resultSetApplicationTitle=$connection->query($applicationTitleQuery);
    while($row=mysqli_fetch_array($resultSetApplicationTitle)){
        $applicationTitle=$row['title'];
    }
    $insertApplicationQuery="INSERT INTO `applicants`(`id`, `user_id`, `application_id`, `status_id`) VALUES (NULL,'$userId','$applicationId',3)";
    $emailSubject="Postulación";
    $emailDescription="Se ha postulado exitósamente a: $applicationTitle";
    $insertEmailQuery="INSERT INTO `sent_mails`(`id`, `subject`, `message`, `sender_id`, `receiver_id`) VALUES (NULL,'$emailSubject','$emailDescription',1,'$userId')";
    $queryExecution=$connection->query($insertApplicationQuery);
    $queryExecution=$connection->query($insertEmailQuery);
}

header('Location:../user_dashboard.php');
die();
exit();
?>