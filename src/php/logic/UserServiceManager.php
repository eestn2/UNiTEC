<?php
//Cambios del user_name: user.php

//Nombre original del archivo: user2.php

//user_name anterior de la clase: usuario
class user_create{
    private $user_id, $user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $role_name, $user_rank, $user_status;
    
    public function __construct($user_id, $user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $role_name, $user_status){
        $this->user_id = $user_id;
        $this->user_name = $user_name;
        $this->user_age = $user_age;
        $this->user_location = $user_location;
        $this->user_email = $user_email;
        $this->user_password = $user_password;
        $this->user_description = $user_description;
        $this->user_last_update_date = $user_last_update_date;
        $this->user_profile_picture = $user_profile_picture;
        $this->user_portfolio = $user_portfolio;
        $this->user_is_enabled = $user_is_enabled;
        $this->role_name = $role_name;
        $this->role_name = $role_name;
    }

    public function getId(){
        return $this->user_id;
    }
             
    public function setId($user_id){
       
        $this->user_id = $user_id;
    }

    //Nombre anterior: getNombre 

    public function getUser_name(){
        return $this->user_name;
    }
             
    public function setUser_name($user_name){
       
        $this->user_name = $user_name;
    }

    //Nombre anterior: getEdad

    public function getUser_age(){
        return $this->user_age;
    }
             
    public function setUser_age($user_age){
       
        $this->user_age = $user_age;
    }

    //Nombre anterior: getLocalidad

    public function getUser_location(){
        return $this->user_location;
    }
             
    public function setUser_location($user_location){
       
        $this->user_location = $user_location;
    }

    //Nombre anterior: getEmail

    public function getUser_email(){
        return $this->user_email;
    }
             
    public function setUser_email($user_email){
       
        $this->user_email = $user_email;
    }

    //Nombre anterior: getClave

    public function getUser_password(){
        return $this->user_password;
    }
             
    public function setUser_password($user_password){
       
        $this->user_password = $user_password;
    }

    //Nombre anterior: getDescripcion

    public function getUser_description(){
        return $this->user_description;
    }
             
    public function setUser_description($user_description){
       
        $this->user_description = $user_description;
    }

    //Nombre anterior: getDateAct

    public function getUser_last_update_date(){
        return $this->user_last_update_date;
    }
             
    public function setUser_last_update_date($user_last_update_date){
       
        $this->user_last_update_date = $user_last_update_date;
    }

    //Nombre anterior: getFotoPerfil

    public function getUser_profile_picture(){
        return $this->user_profile_picture;
    }
             
    public function setUser_profile_picture($user_profile_picture){
       
        $this->user_profile_picture = $user_profile_picture;
    }

    //Nombre anterior: getPortfolio

    public function getUser_portfolio(){
        return $this->user_portfolio;
    }
             
    public function setUser_portfolio($user_portfolio){
       
        $this->user_portfolio = $user_portfolio;
    }

    //Nombre anterior: getHabilitado

    public function getUser_is_enabled(){
        return $this->user_is_enabled;
    }
             
    public function setUser_is_enabled($user_is_enabled){
       
        $this->user_is_enabled = $user_is_enabled;
    }

    //Nombre anterior: getTipo

    public function getRole_name(){
        return $this->role_name;
    }
             
    public function setRole_name($role_name){
       
        $this->role_name = $role_name;
    }

    //Nombre anterior: getEstado

    public function getUser_status(){
        return $this->user_status;
    }
             
    public function setUser_status($user_status){
       
        $this->user_status = $user_status;
    }
        
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//Nombre original del archivo: user.php

date_default_timezone_set('America/Argentina/Buenos_Aires');

//Nombre de la clase anterior: User

class CreateUserWithAdminService{
    /*$user_email,
     $user_password, $user_description, $user_last_update_date, $user_profile_picture,
      $user_portfolio, $user_is_enabled, $role_name, $user_rank, $user_status;
    */
    private $user_id, $user_name, $user_age, $user_location, $user_languages, $user_email, $user_password, $user_description, $user_tags, $user_rank, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $user_rol;

    //Nombre de la clase anterior: RegistrarUsuario

    public function Register_users($user_name, $user_age, $user_location, $user_languages, $user_tags, $knownLanguagesWithLevels, $tags_levels, $user_email, $user_password, $user_description, $user_status, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_rol, $user_is_enabled, $redirect_url){
        require_once('connect_to_database.php');

        $connection->begin_transaction();

        $stmt = $connection->prepare("SELECT email FROM `users` WHERE `email` = ?");
        $stmt->bind_param("s", $user_email);
        $stmt->execute();

        $result = $stmt->get_result();
        $array = $result->fetch_assoc();

        /*if($array === null){    
            $comprobante = false; mamada asquerosa que hicieron los autistas de 7mo 2024
        } else {
            $comprobante = true;
        }*/

        try{
            if($array === null){
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

                //el "echo "espere unos segundos..." lo eliminé al ser innecesario.

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
            } else {
                header('Location: ' . $redirect_url  . '?msg=Este%20usuario%20ya%20existe');
            }
        } catch (Exception $e) {
            $connection->rollback();
            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    //Nombre anterior del método: RegistrarEmpresa

    public function Register_companies($user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_status, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_rol, $user_is_enabled, $redirect_url ){
        require_once('connect_to_database.php');

        $connection->begin_transaction();

        $stmt = $connection->prepare("SELECT email FROM `users` WHERE `email` = ?");
        $stmt->bind_param("s", $user_email);
        $stmt->execute();

        $result = $stmt->get_result();
        $array = $result->fetch_assoc();

        /*if($array === null){
            $comprobante = false;
        } else {
            $comprobante = true;
        }*/

        try{
            if($array === null){
                $stmt = $connection->prepare("INSERT INTO `users`(`name`, `birth_date`, `location`, `email`, `password`, `description`, `last_active_date`, `profile_picture`, `portfolio`, `enabled`, `user_type_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("ssssssssssii", $user_name, $user_age, $user_location, $user_email, $user_password, $user_description, $user_last_update_date, $user_profile_picture, $user_portfolio, $user_is_enabled, $user_rol, $user_status);
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
                            subject: "Registro en espera.",
                            $message: "¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.",
                            $message: "<?php echo htmlspecialchars('¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud para poder utilizar nuestro software. Ten paciencia.', ENT_QUOTES, 'UTF-8'); ?>"
                        };

                        let serviceID = "service_ifcpjwj";
                        let templateID = "template_ei8hmto";

                        emailjs.send(serviceID, templateID, params)
                        .then(function(response) {
                            window.location.href = "<?php echo $redirect_url  ; ?>?msg=Su%20usuario%20se%20registro%20correctamente";
                        });
                    }

                    SendMail();
                </script>

                <?php

                $currentDatetime = date('Y-m-d H:i:s');
                $stmt = $connection->prepare("INSERT INTO `sent_emails`(`subject`, `message`, `sender_id`, `receiver_id`, `sent_date`) VALUES (?, ?, ?, ?, ?)");
                $email_subject = 'Registro en espera';
                $email_message = '¡Hola!, tu registro se ha cargado con éxito, debe esperar a que un administrador acepte su solicitud y ya pueda utilizar nuestro software. Ten paciencia.';
                $email_receiver = '1';
                $stmt->bind_param("ssiis", $email_subject, $email_message, $email_receiver, $user_id, $currentDatetime);
                $stmt->execute();
            } else {
                header('Location: ' . $redirect_url  . '?msg=Este%20usuario%20ya%20existe');
            }
        } catch (Exception $e) {
            $connection->rollback();

            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    //Nombre anterior del método: EliminarUsuario

    public function Delete_users($user_id, $redirect_url ){
        require_once('connect_to_database.php');

        try{
            $user_is_enabled = 'false';

            $stmt = $connection->prepare("UPDATE `users` SET `enabled` = ? WHERE `id` = ?");
       
            $stmt->bind_param("si", $user_is_enabled, $user_id);
    
            $stmt->execute();
    
            header('Location:close_session.php');
        } catch(Exception $e) {
            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    //Nombre anterior del método: update_Users

    public function update_Users_data($user_id, $user_name, $user_location, $user_email, $user_description, $user_status, $user_last_update_date, $user_portfolio, $user_rol, $user_languages, $user_tags, $knownLanguagesWithLevels, $tags_levels, $redirect_url ){
        require_once('connect_to_database.php');

        $connection->begin_transaction();

        try{
            $stmt = $connection->prepare("UPDATE `users` SET `name` = ? ,`location` = ? ,`email` = ? ,`description` = ? ,`last_active_date`= ? ,`portfolio` = ? ,`enabled` = ? ,`status_id` = ? WHERE `id` = ?");
            $stmt->bind_param("ssssssiii", $user_name, $user_location, $user_email, $user_description, $user_last_update_date, $user_portfolio, $user_rol, $user_status, $user_id);
            $stmt->execute();

            $stmt = $connection->prepare("DELETE FROM `user_tags` WHERE `user_id` = ?");
            $stmt->bind_param("i", $user_id);
            $stmt->execute();

            $stmt = $connection->prepare("DELETE FROM `user_languages` WHERE `user_id` = ?");
            $stmt->bind_param("i", $user_id);
            $stmt->execute();

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

            header('Location: ' . $redirect_url  . '?msg=Se%20actualizaron%20los%20datos%20correctamente');
        } catch(Exception $e) {
            $connection->rollback();

            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }   

    //Nombre anterior del método: ActualizarEmpresa

    public function Update_company_data($user_id, $user_name, $user_location, $user_email, $user_description, $user_last_update_date, $user_portfolio, $redirect_url ){
        require_once('connect_to_database.php');

        $connection->begin_transaction();

        try{
            $stmt = $connection->prepare("UPDATE `users` SET `name` = ? ,`location` = ? ,`email` = ? ,`description` = ? ,`last_active_date`= ? ,`portfolio` = ? WHERE `id` = ?");
            $stmt->bind_param("ssssssi", $user_name, $user_location, $user_email, $user_description, $user_last_update_date, $user_portfolio, $user_id);
            $stmt->execute();

            $connection->commit();

            header('Location: ' . $redirect_url  . '?msg=Se%20actualizaron%20los%20datos%20correctamente');
        } catch(Exception $e) {
            $connection->rollback();

            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error' . ' ' . $e->getMessage());
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }   

    //Nombre anterior del método: ComprobarUsuario
    public function comprobate_User($user_email, $user_password, $redirect_url ){
        require_once('connect_to_database.php');

        try{
            $stmt = $connection->prepare("SELECT `email`, `password`, `enabled` FROM `users` WHERE `email` = ? AND `enabled` = 'true'");

            $stmt->bind_param("s", $user_email);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
    
            $array = $result->fetch_assoc();
    
            if($array !== null){
                if(password_verify($user_password, $array['password'])) {
                    header('Location: ../vistas/verificar.php?user_email=' . $user_email);
                    exit;
                } else {
                    header('Location: ' . $redirect_url  . '?msg=Datos%20de%20usuario%20incorrectos');
                    exit;
                }
            } else {
                header('Location: ' . $redirect_url  . '?msg=Datos%20de%20usuario%20incorrectos');
                exit;
            }
        } catch(Exception $e) {
            header('Location: ' . $redirect_url  . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }
    //Nombre anterior del método: CambiarContraseña
    public function changePassword($user_id, $claveActual, $claveNueva, $received_url){
        require_once('connect_to_database.php');

        try{
            $stmt = $connection->prepare("SELECT password FROM `users` WHERE `id` = ?");

            $stmt->bind_param("i", $user_id);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
    
            $array = $result->fetch_assoc();
    
            if(password_verify($claveActual, $array['password'])){
    
                $claveNuevaHasheada = password_hash($claveNueva, PASSWORD_DEFAULT);
    
                $stmt = $connection->prepare("UPDATE `users` SET `password` = ? WHERE `id` = ?");
                $stmt->bind_param("si", $claveNuevaHasheada, $user_id);
                $stmt->execute();
                $stmt->close();
    
                header('Location: ' . $received_url . '?msg=Contraseña%20actualizada%20correctamente');
                exit;
            } else {
                header('Location: ' . $received_url . '?msg=La%20contraseña%20actual%20no%20coincide');
                exit;
            }
        } catch(Exception $e) {
            header('Location: ' . $received_url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }

    //Nombre anterior del método: CambiarFotoDePerfil

    public function change_profile_photo($user_id, $image, $redirect_url ){
        require_once('connect_to_database.php');
        try{
            // Directorio donde se guardarán las imágenes subidas
            $targetDir = "../imgs/img_u/ ";

            // Verifica si el archivo ha sido subido sin errores
            if (isset($image) && $image['error'] == 0) {
                // Obtiene la extensión del archivo
                $fileType = pathinfo($image['name'], PATHINFO_EXTENSION);

                // Genera un nuevo user_name de archivo único
                $newFileName = $user_id . '.' . $fileType;

                // Ruta completa del archivo destino
                $targetFilePath = $targetDir . $newFileName;

                // Tipos de archivos permitidos
                $allowedTypes = array('jpg', 'jpeg', 'png', 'webp');
                
                // Verifica si la extensión del archivo es permitida
                if (in_array(strtolower($fileType), $allowedTypes)) {
                    // Mueve el archivo subido a la carpeta destino con el nuevo user_name
                    if (move_uploaded_file($image['tmp_name'], $targetFilePath)) {
                        $stmt = $connection->prepare("UPDATE `users` SET `profile_picture` = ? WHERE `id` = ?");
                        $stmt->bind_param("si", $targetFilePath, $user_id);
                        $stmt->execute();

                        header('Location: ' . $redirect_url  . '?msg=Se%20cambio%20la%20foto%20de%20perfil%20con%20exito');

                        echo json_encode("La received_picture ha sido subida con éxito como $newFileName.") ;
                    } else {
                        echo json_encode("Error al mover el archivo.") ;
                    }
                } else {
                    echo json_encode("Tipo de archivo no permitido. Solo se permiten archivos JPG, JPEG, PNG y WEBP.") ;
                }
            } else {
                echo json_encode("Error al subir el archivo. Código de error: " . $image['error']) ;
            }
        } catch(Exception $e) {
            header('Location: ' . $received_url . '?msg=Ocurrio%20un%20error');
        } finally {
            if(isset($stmt)){
                $stmt->close();
            }

            $connection->close();
        }
    }
}
$obj_user = new CreateUserWithAdminService();

?>