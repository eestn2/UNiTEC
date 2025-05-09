<?php
require_once "../cors-policy.php";
require_once __DIR__ . '/../../logic/connect_to_database.php';
require_once __DIR__ . '/../function/return_response.php';
require_once __DIR__ . '/../../config/session-config.php';
require_once(__DIR__ . '/../../logic/security_functions.php');

if ($_SERVER["REQUEST_METHOD"] !== "POST") return_response("failed", "Metodo no permitido.", null);

$connection->begin_transaction();

$stmt = $connection->prepare("SELECT email FROM `users` WHERE `email` = ?");
$stmt->bind_param("s", $user_email);
$stmt->execute();
if ($user_email) return_response("failed", "El correo ya existe.", null);
$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email) || !isset($data->password)) return_response("failed", "Faltan datos.", null);

$email = $connection->real_escape_string($data->email);
$password = $data->password;


try{
    $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssii", $user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $user_rol, $user_status);
    $stmt->execute();

    $id_consult = $connection->query("SELECT MAX(id) AS id FROM users");

    if($row = mysqli_fetch_row($id_consult)) {
        $user_id = $row[0];
    }
    
    $stmt = $connection->prepare("INSERT INTO `user_languages`(`user_id`, `language_id`, `level_id`) VALUES (?, ?, ?)");
    for($i = 0; $i < count($user_languages); $i++){
        $stmt->bind_param("iii", $user_id, $user_languages[$i], $knownLanguagesWithLevels[$i]);
        $stmt->execute();
    }

    $stmt = $connection->prepare("INSERT INTO `user_tags`(`user_id`, `tag_id`, `level_id`) VALUES (?, ?, ?)");
    for($i = 0; $i < count($user_tags); $i++){
        $stmt->bind_param("iii", $user_id, $user_tags[$i], $tags_levels[$i]);
        $stmt->execute();
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
                subject: "Registro en espera.",
                $message: "¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.",
                $message: "<?php echo htmlspecialchars('¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', ENT_QUOTES, 'UTF-8'); ?>"
            };

            let serviceID = "service_ifcpjwj";
            let templateID = "template_ei8hmto";

            emailjs.send(serviceID, templateID, params)
            .then(function(response) {
                window.location.href = "<?php echo$redirect_url; ?>?msg=Su%20usuario%20se%20registro%20correctamente";
            });
        }

        SendMail();
    </script>

    <?php

    $currentDatetime = date('Y-m-d H:i:s');
    $stmt = $connection->prepare("INSERT INTO `sent_emails`(`subject`, `message`, `sender_id`, `receiver_id`, `sent_date`) VALUES (?, ?, ?, ?, ?)");
    $email_subject = 'Registro en espera';
    $email_message = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.';
    $email_receiver = '1';
    $stmt->bind_param("ssiis", $email_subject, $email_message, $email_receiver, $user_id, $currentDatetime);
    $stmt->execute();
    } catch (Exception $e) {
        $connection->rollback();
        header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
    } finally {
        if(isset($stmt)) $stmt->close();
        $connection->close();
    }
?>