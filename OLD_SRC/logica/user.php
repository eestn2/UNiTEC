<?php

// Set the default timezone to Argentina/Buenos Aires
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Define the User class
class User {
    // Private properties for the User class
    private $id, $nombre, $edad, $localidad, $idioma, $email, $clave, $descripcion, $etiqueta, $rango, $fecha_act, $img_p, $portfolio, $habilitado, $tipo;

    // Method to register a new user
    public function RegistrarUsuario($nombre, $edad, $localidad, $idiomas, $etiquetas, $niveles_idiomas, $niveles_etiquetas, $email, $clave, $descripcion, $estado, $fecha_act, $fotoPerfil, $portfolio, $tipo, $habilitado, $url, $escuela) {
        // Include the database connection
        require_once('connection.php');

        // Begin a database transaction
        $connection->begin_transaction();

        // Check if the email already exists in the database
        $stmt = $connection->prepare("SELECT usuario_email FROM `usuarios` WHERE `usuario_email` = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = $result->fetch_assoc();

        // If no result is found, set $comprobante to false, otherwise true
        $comprobante = ($array === null) ? false : true;

        try {
            if ($comprobante == false) {
                // Insert the new user into the `usuarios` table
                $stmt = $connection->prepare("INSERT INTO `usuarios`(`usuario_nombre`, `usuario_edad`, `usuario_localidad`, `usuario_email`, `usuario_clave`, `usuario_descripcion`, `usuario_dateAct`, `usuario_fotoPerfil`, `usuario_portfolio`, `usuario_habilitado`, `usuario_tipo`, `usuario_estado`, `usuario_escuela`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssssssiii", $nombre, $edad, $localidad, $email, $clave, $descripcion, $fecha_act, $fotoPerfil, $portfolio, $habilitado, $tipo, $estado, $escuela);
                $stmt->execute();

                // Retrieve the ID of the newly inserted user
                $id_consult = $connection->query("SELECT MAX(usuario_id) AS id FROM usuarios");
                if ($row = mysqli_fetch_row($id_consult)) {
                    $id = $row[0];
                }

                // Insert the user's languages into the `usu_idiomas` table
                $stmt = $connection->prepare("INSERT INTO `usu_idiomas`(`usuario_id`, `in_idioma`, `nivel`) VALUES (?, ?, ?)");
                for ($i = 0; $i < count($idiomas); $i++) {
                    $stmt->bind_param("iii", $id, $idiomas[$i], $niveles_idiomas[$i]);
                    $stmt->execute();
                }

                // Insert the user's tags into the `usu_etiquetas` table
                $stmt = $connection->prepare("INSERT INTO `usu_etiquetas`(`usuario_id`, `in_etiqueta`, `nivel`) VALUES (?, ?, ?)");
                for ($i = 0; $i < count($etiquetas); $i++) {
                    $stmt->bind_param("iii", $id, $etiquetas[$i], $niveles_etiquetas[$i]);
                    $stmt->execute();
                }

                // Commit the transaction
                $connection->commit();

                // Notify the user via email using EmailJS
                echo "Espere unos segundos...";
                ?>
                <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
                <script>
                    emailjs.init("ixWT1mJIQS1ksXzHB");

                    function SendMail() {
                        let params = {
                            sendername: "Bolsa de Trabajo - Tecnica 2",
                            to: "<?php echo $email; ?>",
                            subject: "Registro en espera.",
                            message: "¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia."
                        };

                        let serviceID = "service_ifcpjwj";
                        let templateID = "template_ei8hmto";

                        emailjs.send(serviceID, templateID, params)
                        .then(function(response) {
                            window.location.href = "<?php echo $url; ?>?msg=Su%20usuario%20se%20registro%20correctamente";
                        });
                    }

                    SendMail();
                </script>
                <?php

                // Log the email sent into the `mails_enviados` table
                $current_timestamp = date('Y-m-d H:i:s');
                $stmt = $connection->prepare("INSERT INTO `mails_enviados`(`mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (?, ?, ?, ?, ?)");
                $mail_asunto = 'Registro en espera';
                $mail_mensaje = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.';
                $mail_emisor = '1';
                $stmt->bind_param("ssiis", $mail_asunto, $mail_mensaje, $mail_emisor, $id, $current_timestamp);
                $stmt->execute();
            } else {
                // Redirect if the user already exists
                header('Location: ' . $url . '?msg=Este%20usuario%20ya%20existe');
            }
        } catch (Exception $e) {
            // Rollback the transaction in case of an error
            $connection->rollback();
            header('Location: ' . $url . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
        } finally {
            // Close the statement and connection
            if (isset($stmt)) {
                $stmt->close();
            }
            $connection->close();
        }
    }

    // Other methods follow a similar structure and logic...
    // Each method performs specific CRUD operations on the database
    // and handles exceptions, transactions, and user notifications.
}
?>
