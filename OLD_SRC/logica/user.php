<?php

date_default_timezone_set('America/Argentina/Buenos_Aires');

class User{
    private $id, $nombre, $edad, $localidad, $idioma, $email, $clave, $descripcion, $etiqueta, $rango, $fecha_act, $img_p, $portfolio, $habilitado, $tipo;

    public function RegistrarUsuario($nombre, $edad, $localidad, $idiomas, $etiquetas, $niveles_idiomas, $niveles_etiquetas, $email, $clave, $descripcion, $estado, $fecha_act, $fotoPerfil, $portfolio, $tipo, $habilitado, $url, $escuela){
        require_once('connection.php');

        $connection->begin_transaction();

        $stmt = $connection->prepare("SELECT usuario_email FROM `usuarios` WHERE `usuario_email` = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $result = $stmt->get_result();
        $array = $result->fetch_assoc();

        if($array === null){    
            $comprobante = false;
        } else {
            $comprobante = true;
        }

        try{
            if($comprobante == false){
                $stmt = $connection->prepare("INSERT INTO `usuarios`(`usuario_nombre`, `usuario_edad`, `usuario_localidad`, `usuario_email`, `usuario_clave`, `usuario_descripcion`, `usuario_dateAct`, `usuario_fotoPerfil`, `usuario_portfolio`, `usuario_habilitado`, `usuario_tipo`, `usuario_estado`, `usuario_escuela`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssssssiii", $nombre, $edad, $localidad, $email, $clave, $descripcion, $fecha_act, $fotoPerfil, $portfolio, $habilitado, $tipo, $estado, $escuela);

                $stmt->execute();

                $id_consult = $connection->query("SELECT MAX(usuario_id) AS id FROM usuarios");
    
                if($row = mysqli_fetch_row($id_consult)) {
                    $id = $row[0];
                }
                
                $stmt = $connection->prepare("INSERT INTO `usu_idiomas`(`usuario_id`, `in_idioma`, `nivel`) VALUES (?, ?, ?)");
                for($i = 0; $i < count($idiomas); $i++){
                    $stmt->bind_param("iii", $id, $idiomas[$i], $niveles_idiomas[$i]);
                    $stmt->execute();
                }
        
                $stmt = $connection->prepare("INSERT INTO `usu_etiquetas`(`usuario_id`, `in_etiqueta`, `nivel`) VALUES (?, ?, ?)");
                for($i = 0; $i < count($etiquetas); $i++){
                    $stmt->bind_param("iii", $id, $etiquetas[$i], $niveles_etiquetas[$i]);
                    $stmt->execute();
                }
    
                $connection->commit();

                echo "Espere unos segundos...";

                ?>

                <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
                <script>
                    emailjs.init("ixWT1mJIQS1ksXzHB");

                    function SendMail(){
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

                $current_timestamp = date('Y-m-d H:i:s');
                $stmt = $connection->prepare("INSERT INTO `mails_enviados`(`mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (?, ?, ?, ?, ?)");
                $mail_asunto = 'Registro en espera';
                $mail_mensaje = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.';
                $mail_emisor = '1';
                $stmt->bind_param("ssiis", $mail_asunto, $mail_mensaje, $mail_emisor, $id, $current_timestamp);
                $stmt->execute();
            } else {
                header('Location: ' . $url . '?msg=Este%20usuario%20ya%20existe');
            }
        } catch (Exception $e) {
            $connection->rollback();

            header('Location: ' . $url . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    public function RegistrarEmpresa($nombre, $edad, $localidad, $email, $clave, $descripcion, $estado, $fecha_act, $fotoPerfil, $portfolio, $tipo, $habilitado, $url){
        require_once('connection.php');

        $connection->begin_transaction();

        $stmt = $connection->prepare("SELECT usuario_email FROM `usuarios` WHERE `usuario_email` = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $result = $stmt->get_result();
        $array = $result->fetch_assoc();

        if($array === null){
            $comprobante = false;
        } else {
            $comprobante = true;
        }

        try{
            if($comprobante == false){
                
                $stmt = $connection->prepare("INSERT INTO `usuarios`(`usuario_nombre`, `usuario_edad`, `usuario_localidad`, `usuario_email`, `usuario_clave`, `usuario_descripcion`, `usuario_dateAct`, `usuario_fotoPerfil`, `usuario_portfolio`, `usuario_habilitado`, `usuario_tipo`, `usuario_estado`, `usuario_escuela`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
                $stmt->bind_param("ssssssssssii", $nombre, $edad, $localidad, $email, $clave, $descripcion, $fecha_act, $fotoPerfil, $portfolio, $habilitado, $tipo, $estado);
                $stmt->execute();

                $id_consult = $connection->query("SELECT MAX(usuario_id) AS id FROM usuarios");
    
                if($row = mysqli_fetch_row($id_consult)) {
                    $id = $row[0];
                }
    
                $connection->commit();

                echo "Espere unos segundos...";

                ?>

                <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
                <script>
                    emailjs.init("ixWT1mJIQS1ksXzHB");

                    function SendMail(){
                        let params = {
                            sendername: "Bolsa de Trabajo - Tecnica 2",
                            to: "<?php echo $email; ?>",
                            subject: "Registro en espera.",
                            message: "¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud y ya pueda utilizar nuestro software. Ten paciencia."
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

                $current_timestamp = date('Y-m-d H:i:s');
                $stmt = $connection->prepare("INSERT INTO `mails_enviados`(`mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (?, ?, ?, ?, ?)");
                $mail_asunto = 'Registro en espera';
                $mail_mensaje = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud y ya pueda utilizar nuestro software. Ten paciencia.';
                $mail_emisor = '1';
                $stmt->bind_param("ssiis", $mail_asunto, $mail_mensaje, $mail_emisor, $id, $current_timestamp);
                $stmt->execute();
            } else {
                header('Location: ' . $url . '?msg=Este%20usuario%20ya%20existe');
            }
        } catch (Exception $e) {
            $connection->rollback();
            echo "<h1>Error: " . $e->getMessage() . "</h1>";
            echo "<h1>Line: " . $e->getLine() . "</h1>";
            echo "<h1>File: " . $e->getFile() . "</h1>";
            echo "<h1>Code: " . $e->getCode() . "</h1>";
            echo "<h1>Trace: " . $e->getTraceAsString() . "</h1>";
            //header('Location: ' . $url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    public function EliminarUsuario($id, $url){
        require_once('connection.php');

        try{
            $habilitado = 'false';

            $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_habilitado` = ? WHERE `usuario_id` = ?");
       
            $stmt->bind_param("si", $habilitado, $id);
    
            $stmt->execute();
    
            header('Location:close_session.php');
        } catch(Exception $e) {
            header('Location: ' . $url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    public function ActualizarUsuario($id, $nombre, $localidad, $email, $descripcion, $estado, $fecha_act, $portfolio, $tipo, $idiomas, $etiquetas, $niveles_idiomas, $niveles_etiquetas, $url){
        require_once('connection.php');

        $connection->begin_transaction();

        try{
            $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_nombre` = ? ,`usuario_localidad` = ? ,`usuario_email` = ? ,`usuario_descripcion` = ? ,`usuario_dateAct`= ? ,`usuario_portfolio` = ? ,`usuario_tipo` = ? ,`usuario_estado` = ? WHERE `usuario_id` = ?");
            $stmt->bind_param("ssssssiii", $nombre, $localidad, $email, $descripcion, $fecha_act, $portfolio, $tipo, $estado, $id);
            $stmt->execute();

            $stmt = $connection->prepare("DELETE FROM `usu_etiquetas` WHERE `usuario_id` = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $stmt = $connection->prepare("DELETE FROM `usu_idiomas` WHERE `usuario_id` = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $stmt = $connection->prepare("INSERT INTO `usu_idiomas`(`usuario_id`, `in_idioma`, `nivel`) VALUES (?, ?, ?)");
            for($i = 0; $i < count($idiomas); $i++){
                $stmt->bind_param("iii", $id, $idiomas[$i], $niveles_idiomas[$i]);
                $stmt->execute();
            }
    
            $stmt = $connection->prepare("INSERT INTO `usu_etiquetas`(`usuario_id`, `in_etiqueta`, `nivel`) VALUES (?, ?, ?)");
            for($i = 0; $i < count($etiquetas); $i++){
                $stmt->bind_param("iii", $id, $etiquetas[$i], $niveles_etiquetas[$i]);
                $stmt->execute();
            }

            $connection->commit();

            header('Location: ' . $url . '?msg=Se%20actualizaron%20los%20datos%20correctamente');
        } catch(Exception $e) {
            $connection->rollback();

            header('Location: ' . $url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }   

    public function ActualizarEmpresa($id, $nombre, $localidad, $email, $descripcion, $fecha_act, $portfolio, $url){
        require_once('connection.php');

        $connection->begin_transaction();

        try{
            $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_nombre` = ? ,`usuario_localidad` = ? ,`usuario_email` = ? ,`usuario_descripcion` = ? ,`usuario_dateAct`= ? ,`usuario_portfolio` = ? WHERE `usuario_id` = ?");
            $stmt->bind_param("ssssssi", $nombre, $localidad, $email, $descripcion, $fecha_act, $portfolio, $id);
            $stmt->execute();

            $connection->commit();

            header('Location: ' . $url . '?msg=Se%20actualizaron%20los%20datos%20correctamente');
        } catch(Exception $e) {
            $connection->rollback();

            header('Location: ' . $url . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }   

    public function ComprobarUsuario($email, $clave, $url){
        require_once('connection.php');

        try{
            $stmt = $connection->prepare("SELECT usuario_email, usuario_clave, usuario_habilitado FROM `usuarios` WHERE `usuario_email` = ? AND `usuario_habilitado` = 'true'");

            $stmt->bind_param("s", $email);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
    
            $array = $result->fetch_assoc();
    
            if($array !== null){
                if(password_verify($clave, $array['usuario_clave'])) {
                    header('Location: ../vistas/verificar.php?email=' . $email);
                    exit;
                } else {
                    header('Location: ' . $url . '?msg=Datos%20de%20usuario%20incorrectos');
                    exit;
                }
            } else {
                header('Location: ' . $url . '?msg=Datos%20de%20usuario%20incorrectos');
                exit;
            }
        } catch(Exception $e) {
            header('Location: ' . $url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    public function CambiarContraseña($id, $claveActual, $claveNueva, $url_recibida){
        require_once('connection.php');

        try{
            $stmt = $connection->prepare("SELECT usuario_clave FROM `usuarios` WHERE `usuario_id` = ?");

            $stmt->bind_param("i", $id);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
    
            $array = $result->fetch_assoc();
    
            if(password_verify($claveActual, $array['usuario_clave'])){
    
                $claveNuevaHasheada = password_hash($claveNueva, PASSWORD_DEFAULT);
    
                $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_clave` = ? WHERE `usuario_id` = ?");
                $stmt->bind_param("si", $claveNuevaHasheada, $id);
                $stmt->execute();
                $stmt->close();
    
                header('Location: ' . $url_recibida . '?msg=Contraseña%20actualizada%20correctamente');
                exit;
            } else {
                header('Location: ' . $url_recibida . '?msg=La%20contraseña%20actual%20no%20coincide');
                exit;
            }
        } catch(Exception $e) {
            header('Location: ' . $url_recibida . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    public function CambiarFotoDePerfil($id, $image, $url){
        require_once('connection.php');
        try{
            // Directorio donde se guardarán las imágenes subidas
            $targetDir = "../imgs/img_u/ ";

            // Verifica si el archivo ha sido subido sin errores
            if (isset($image) && $image['error'] == 0) {
                // Obtiene la extensión del archivo
                $fileType = pathinfo($image['name'], PATHINFO_EXTENSION);

                // Genera un nuevo nombre de archivo único
                $newFileName = $id . '.' . $fileType;

                // Ruta completa del archivo destino
                $targetFilePath = $targetDir . $newFileName;

                // Tipos de archivos permitidos
                $allowedTypes = array('jpg', 'jpeg', 'png', 'webp');
                
                // Verifica si la extensión del archivo es permitida
                if (in_array(strtolower($fileType), $allowedTypes)) {
                    // Mueve el archivo subido a la carpeta destino con el nuevo nombre
                    if (move_uploaded_file($image['tmp_name'], $targetFilePath)) {
                        $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_fotoPerfil` = ? WHERE `usuario_id` = ?");
                        $stmt->bind_param("si", $targetFilePath, $id);
                        $stmt->execute();

                        header('Location: ' . $url . '?msg=Se%20cambio%20la%20foto%20de%20perfil%20con%20exito');

                        echo "La imagen ha sido subida con éxito como $newFileName.";
                    } else {
                        echo "Error al mover el archivo.";
                    }
                } else {
                    echo "Tipo de archivo no permitido. Solo se permiten archivos JPG, JPEG, PNG y WEBP.";
                }
            } else {
                echo "Error al subir el archivo. Código de error: " . $image['error'];
            }
        } catch(Exception $e) {
            header('Location: ' . $url_recibida . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }
}

$obj_user = new User();

if(isset($_POST['action']) && $_POST['action'] == '1'){

    $url_recibida = $_POST['url'];

    $name = $_POST['nombre'];
    $age = $_POST['edad'];
    $location = $_POST['localidad'];
    $mail = $_POST['correo'];
    $password = password_hash($_POST['contrasenia'], PASSWORD_DEFAULT);
    $description = $_POST['descripcion'];
    $date = $_POST['fecha'];
    $briefcase = $_POST['portfolio'];
    $enabled = $_POST['habilitado'];
    $state = $_POST['estado'];
    $escuela = $_POST['escuela'];
    $type_user = $_POST['tipo_de_usuario'];
    $post_languages = $_POST['arrayPHPLanguages'];
    $post_labels = $_POST['arrayPHPLabels'];
    $post_languages_levels = $_POST['arrayPHPLevelsLanguages'];
    $post_labels_levels = $_POST['arrayPHPLevelsLabels'];

    $array_languages = explode(',', $post_languages);   
    $array_labels = explode(',', $post_labels);
    $array_languages_levels = explode(',', $post_languages_levels);   
    $array_labels_levels = explode(',', $post_labels_levels);
    
    $picture = '';

    $obj_user->RegistrarUsuario($name, $age, $location, $array_languages, $array_labels, $array_languages_levels, $array_labels_levels, $mail, $password, $description, $state, $date, $picture, $briefcase, $type_user, $enabled, $url_recibida, $escuela);

} else if(isset($_POST['action']) && $_POST['action'] == '2'){

    $url_recibida = $_POST['url'];

    $name = $_POST['nombre'];
    $age = $_POST['edad'];
    $location = $_POST['localidad'];
    $mail = $_POST['correo'];
    $password = password_hash($_POST['contrasenia'], PASSWORD_DEFAULT);
    $description = $_POST['descripcion'];
    $date = $_POST['fecha'];
    $briefcase = $_POST['portfolio'];
    $enabled = $_POST['habilitado'];
    $state = $_POST['estado'];
    $type_user = $_POST['tipo_de_usuario'];
    
    $picture = '';

    $obj_user->RegistrarEmpresa($name, $age, $location, $mail, $password, $description, $state, $date, $picture, $briefcase, $type_user, $enabled, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '3') {

    $url_recibida = $_POST['url'];

    $id_recibido = $_POST['id'];

    $obj_user->EliminarUsuario($id_recibido, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '4') {

    require_once('cifrado.php');

    $url_recibida = $_POST['url'];

    $id_recibido = openssl_decrypt($_POST['id'], AES, KEY);

    $name = $_POST['nombre'];
    $location = $_POST['localidad'];
    $mail = $_POST['correo'];
    $description = $_POST['descripcion'];
    $date = $_POST['fecha'];
    $briefcase = $_POST['portfolio'];
    $state = $_POST['estado'];
    $type_user = $_POST['tipo_de_usuario'];
    $post_languages = $_POST['arrayPHPLanguages'];
    $post_labels = $_POST['arrayPHPLabels'];
    $post_languages_levels = $_POST['arrayPHPLevelsLanguages'];
    $post_labels_levels = $_POST['arrayPHPLevelsLabels'];

    $array_languages = explode(',', $post_languages);   
    $array_labels = explode(',', $post_labels);
    $array_languages_levels = explode(',', $post_languages_levels);   
    $array_labels_levels = explode(',', $post_labels_levels);

    $obj_user->ActualizarUsuario($id_recibido, $name, $location, $mail, $description, $state, $date, $briefcase, $type_user, $array_languages, $array_labels, $array_languages_levels, $array_labels_levels, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '5') {

    $url_recibida = $_POST['url'];

    $email_recibido = $_POST['email'];
    $clave_recibida = $_POST['clave'];

    $obj_user->ComprobarUsuario($email_recibido, $clave_recibida, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '6') {

    require_once('cifrado.php');

    $url_recibida = $_POST['url'];
    $id_recibido = openssl_decrypt($_POST['id'], AES, KEY);

    $new_password = $_POST['new-password'];
    $password = $_POST['password'];

    $obj_user->CambiarContraseña($id_recibido, $password, $new_password, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '7') {

    require_once('cifrado.php');
    
    $url_recibida = $_POST['url'];
    $id_recibido = openssl_decrypt($_POST['id'], AES, KEY);

    $obj_user->EliminarUsuario($id_recibido, $url_recibida);

} else if(isset($_POST['action']) && $_POST['action'] == '8') {
    
    require_once('cifrado.php');

    $id_recibido = openssl_decrypt($_POST['id'], AES, KEY);
    $url_recibida = $_POST['url'];
    $imagen = $_FILES['image'];

    $obj_user->CambiarFotoDePerfil($id_recibido, $imagen, $url_recibida);
 
} else if(isset($_POST['action']) && $_POST['action'] == '9') {

    require_once('cifrado.php');

    $url_recibida = $_POST['url'];

    $id_recibido = openssl_decrypt($_POST['id'], AES, KEY);

    $name = $_POST['nombre'];
    $location = $_POST['localidad'];
    $mail = $_POST['correo'];
    $description = $_POST['descripcion'];
    $date = $_POST['fecha'];
    $briefcase = $_POST['portfolio'];

    $obj_user->ActualizarEmpresa($id_recibido, $name, $location, $mail, $description, $date, $briefcase, $url_recibida);

}

?>