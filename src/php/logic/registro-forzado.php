<?php
include_once('connect_to_database.php');
require_once('security_functions.php');

$connection->begin_transaction();
$hashedPassword = encryption('test');
$stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES ('Haziel', '04-11-2006', 'Junín', 'tester@gmail.com', ?, '', '', '', '', ?, 2, 3)");
$enabled = true;
$stmt->bind_param("si", $hashedPassword, $enabled);
$stmt->execute();

$id_consult = $connection->query("SELECT MAX(id) AS id FROM users");

if($row = mysqli_fetch_row($id_consult)) {
    $user_id = $row[0];
}
$connection->commit();

?>

<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/user_email.min.js"></script>
<script>
    emailjs.init("ixWT1mJIQS1ksXzHB");

    function SendMail(){
        let params = {
            sendername: "Bolsa de Trabajo - Unitec",
            to: "<?php echo json_encode($user_email) ; ?>",
            subject: "Registro en espera."
        };

        let serviceID = "service_ifcpjwj";
        let templateID = "template_ei8hmto";

        emailjs.send(serviceID, templateID, params)
    }

    SendMail();
</script>

<?php
$currentDatetime = date('Y-m-d H:i:s');
$email_subject = 'Registro en espera';
$email_message = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.';
$email_receiver = '1';
$connection->close();
?>