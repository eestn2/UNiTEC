<?php
// Include required files for database operations, connection, and encryption
require('../logica/metodoscrud.php');
require('../logica/connection.php');
require('../logica/cifrado.php');

// Function to calculate age based on a given date of birth
function calcularEdad($fechaDeNacimiento){
    $fechaDeNacimiento = new DateTime($fechaDeNacimiento); // Convert string to DateTime object
    $fechaActual = new DateTime(); // Get the current date
    $diferencia = $fechaActual->diff($fechaDeNacimiento); // Calculate the difference
    $edad = $diferencia->y; // Extract the years from the difference

    return $edad; // Return the calculated age
}

// Check if a specific action is requested via GET
if (isset($_GET['action-name'])) {
    switch ($_GET['action-name']) {
        case 'IDIOMA': // Update an "idioma" (language) record
            if (isset($_GET['id']) && isset($_GET['name'])) {
                $stmt = $connection->prepare("UPDATE `idioma` SET `idioma_nombre` = ? WHERE `idioma_id` = ?");
                $stmt->bind_param("si", $_GET['name'], $_GET['id']); // Bind parameters
                $stmt->execute(); // Execute the query
                ?>
                <script>
                    // Clear the URL parameters after the update
                    var url = new URL(window.location.href);
                    url.search = '';
                    history.replaceState({}, '', url.toString());
                </script>
            <?php }
            break;
        case 'ETIQUETA': // Update an "etiqueta" (tag) record
            if (isset($_GET['id']) && isset($_GET['name'])) {
                $stmt = $connection->prepare("UPDATE `etiquetas` SET `etiqueta_nombre` = ? WHERE `etiqueta_id` = ?");
                $stmt->bind_param("si", $_GET['name'], $_GET['id']);
                $stmt->execute();
                ?>
                <script>
                    var url = new URL(window.location.href);
                    url.search = '';
                    history.replaceState({}, '', url.toString());
                </script>
            <?php }
            break;
        case 'NIVEL': // Update a "nivel" (level) record
            if (isset($_GET['id']) && isset($_GET['name'])) {
                $stmt = $connection->prepare("UPDATE `niveles` SET `niveles_nombre` = ? WHERE `niveles_id` = ?");
                $stmt->bind_param("si", $_GET['name'], $_GET['id']);
                $stmt->execute();
                ?>
                <script>
                    var url = new URL(window.location.href);
                    url.search = '';
                    history.replaceState({}, '', url.toString());
                </script>
            <?php }
            break;
        case 'TIPO': // Update a "tipo_usuario" (user type) record
            if (isset($_GET['id']) && isset($_GET['name'])) {
                $stmt = $connection->prepare("UPDATE `tipo_usuario` SET `tipoUsuario_nombre` = ? WHERE `tipoUsuario_id` = ?");
                $stmt->bind_param("si", $_GET['name'], $_GET['id']);
                $stmt->execute();
                ?>
                <script>
                    var url = new URL(window.location.href);
                    url.search = '';
                    history.replaceState({}, '', url.toString());
                </script>
            <?php }
            break;
        default:
            echo 'ERROR'; // Handle invalid action names
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin menu</title>

    <!-- Include stylesheets and icons -->
    <link rel="icon" href="../imgs/logo_blanco.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="../estilos/adminStyle.css">
</head>

<body>
    <!-- Include JavaScript files -->
    <script src="../scripts/ajax.js"></script>
    <script src="../scripts/toggleWindow.js" defer></script>
    <header>
        <nav>
            <!-- Navigation bar with links and toggle buttons -->
            <a href="../index.php" class="container-img"><img src="../imgs/logo.png" alt="logo bolsa"></a>
            <span><a>Mostrar/Ocultar:</a></span>
            <li class="container-toggles markeroff">
                <a onclick="toggleDiv('.idiomas')">Idiomas</a>
                <a onclick="toggleDiv('.etiquetas')">Etiquetas</a>
                <a onclick="toggleDiv('.niveles')">Niveles</a>
                <a onclick="toggleDiv('.tipos')">Tipos</a>
                <a onclick="toggleDiv('.contenedor-insercion')">Inserciones</a>
            </li>
        </nav>
    </header>
    <section>
        <!-- Section for managing "idiomas" -->
        <h3 class="idiomas">Idiomas</h3>
        <div class="adminmenudiv">
            <?php
            $obj = new methods(); // Create an instance of the methods class
            // SQL queries for fetching data
            $idiomas = "SELECT * FROM idioma";
            $etiquetas = "SELECT * FROM etiquetas";
            $tipos = "SELECT * FROM tipo_usuario";
            $niveles = "SELECT * FROM niveles";
            // Fetch and display "idiomas" data
            $datos = $obj->mostrarDatos($idiomas);

            foreach ($datos as $key) { ?>
                <div class="contenedor-idiomas idiomas" id="idiomas">
                    <div class="contenedor-p">
                        <!-- Form for updating "idiomas" -->
                        <form action="adminmenu.php" method="GET" class="form" id="form-idiomas-<?php echo $key['idioma_id']; ?>">
                            <input type="text" name="name" class="input-toggle inputs-idiomas" id="inputs-idiomas" value="<?php echo $key['idioma_nombre']; ?>" disabled>
                            <span onclick="enfocarInput(this)" class="material-symbols-outlined habilitar">edit_note</span>
                            <input type="hidden" name="id" value="<?php echo $key['idioma_id']; ?>">
                            <input type="hidden" name="action-name" value="IDIOMA">
                        </form>
                    </div>
                    <!-- Buttons for updating and deleting "idiomas" -->
                    <a class="btn-editar btn btn-primary" data-form-id="form-idiomas-<?php echo $key['idioma_id']; ?>">Actualizar</a>
                    <a class="btn-eliminar btn btn-danger"
                        href="eliminar.php?id=<?php echo $key['idioma_id']; ?>&opcion=Idioma">Eliminar</a>
                </div>
            <?php } ?>
        </div>

        <!-- Repeat similar sections for "etiquetas", "niveles", and "tipos" -->
        <!-- Each section fetches data, displays it, and provides forms for updating and deleting records -->

        <!-- Section for inserting new records -->
        <div class="contenedor-insercion">
            <!-- Form for inserting a new "idioma" -->
            <form class="FormularioAjax" action="procesos.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
                <label>Insertar idioma</label>
                <input type="text" name="name" placeholder="Inserte el nombre del Idioma" class="inputs-insert">
                <input type="text" hidden="true" name="opcion" value="Idioma">
                <input type="submit" class="inputs-submit" value="Enviar">
            </form>
            <!-- Repeat similar forms for "etiquetas", "niveles", and "tipos" -->
        </div>

        <!-- Section for accepting or rejecting users -->
        <h3 class="descripcion-tabla">Aceptar usuarios</h3>
        <table class="tabla" id="myTable">
            <thead class="encabezado-tabla">
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Localidad</th>
                    <th>Email</th>
                    <th>Link Portafolio</th>
                    <th>Tipo</th>
                    <th>Aceptar</th>
                    <th>Rechazar</th>
                </tr>
            </thead>
            <?php
                // Fetch users who are not yet enabled
                $stmt = $connection->prepare("SELECT * FROM `usuarios` WHERE `usuario_habilitado` = 'false' AND `usuario_estado` != '11'");
                $stmt->execute();
                $results = $stmt->get_result();
                
                while($fila =  $results->fetch_assoc()): ?>
                    <tbody class="cuerpo-tabla">
                        <tr>
                            <!-- Display user details -->
                            <td data-cell="Nombre"><?php echo htmlspecialchars($fila['usuario_nombre']); ?></td>
                            <td data-cell="Edad"><?php echo htmlspecialchars(calcularEdad($fila['usuario_edad'])) . ' años'; ?></td>
                            <td data-cell="Localidad"><?php echo htmlspecialchars($fila['usuario_localidad']); ?></td>
                            <td data-cell="Email"><?php echo htmlspecialchars($fila['usuario_email']); ?></td>
                            <td data-cell="Link Portafolio"><?php echo htmlspecialchars($fila['usuario_portfolio']); ?></td>
                            <td data-cell="Tipo">
                                <?php
                                    // Display user type based on numeric value
                                    switch($fila['usuario_tipo']){
                                        case 1:
                                            echo 'Empresa';
                                            break;
                                        case 2:
                                            echo 'Alumno';
                                            break;
                                        case 3:
                                            echo 'Egresado';
                                            break; 
                                        case 4:
                                            echo 'Administrador';
                                            break;
                                    } 
                                ?>
                            </td>
                            <!-- Forms for accepting or rejecting users -->
                            <td data-cell="Aceptar">
                                <form action="./adminmenu.php" method="POST">
                                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($fila['usuario_id'], AES, KEY); ?>">
                                    <input type="hidden" name="email" value="<?php echo $fila['usuario_email']; ?>">
                                    <input type="hidden" name="action" value="aceptar">
                                    <button class="btn-opcion btn-aceptar">Aceptar</button>
                                </form>
                            </td>
                            <td data-cell="Rechazar">
                                <form action="./adminmenu.php" method="POST">
                                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($fila['usuario_id'], AES, KEY); ?>">
                                    <input type="hidden" name="email" value="<?php echo $fila['usuario_email']; ?>">
                                    <input type="hidden" name="action" value="rechazar">
                                    <button class="btn-opcion btn-rechazar">Rechazar</button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
               <?php endwhile;
                    // Handle form submissions for accepting or rejecting users
                    if(isset($_POST['id']) && isset($_POST['email'])){ 
                        $connection->begin_transaction();
                        try{
                            $id = openssl_decrypt($_POST['id'], AES, KEY); // Decrypt user ID
                            $current_timestamp = date('Y-m-d H:i:s'); // Get current timestamp
                            $mail_emisor = '1'; // Sender ID (hardcoded)

                            if(isset($_POST['action']) && $_POST['action'] == 'aceptar'){
                                $enabled = 'true';
                                $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_habilitado` = ? WHERE `usuario_id` = ?");
                                $stmt->bind_param('si', $enabled, $id);

                                $mail_asunto = '¡Cuenta habilitada!';
                                $mail_mensaje = 'Su cuenta ha sido revisada y hemos visto que cumple con nuestros requisitos, bienvenido a nuestro software. Tenga bonito día.';
                            } else if(isset($_POST['action']) && $_POST['action'] == 'rechazar'){
                                $state = 11;
                                $stmt = $connection->prepare("UPDATE `usuarios` SET `usuario_estado` = ? WHERE `usuario_id` = ?");
                                $stmt->bind_param('ii', $state, $id);

                                $mail_asunto = '¡Cuenta rechazada!';
                                $mail_mensaje = 'Su cuenta ha sido rechazada dedido a que no cumple con nuestros requisitos, lamentamos esto. Tenga bonito día.';
                            }

                            $stmt->execute();
                            
                            // Insert email notification into the database
                            $stmt = $connection->prepare("INSERT INTO `mails_enviados`(`mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (?, ?, ?, ?, ?)");
                            $stmt->bind_param("ssiis", $mail_asunto, $mail_mensaje, $mail_emisor, $id, $current_timestamp);
                            $stmt->execute();
                            ?>
                            <script>
                                // Send email notification using EmailJS
                                function SendMail(){
                                    (function(){
                                        emailjs.init("ixWT1mJIQS1ksXzHB");
                                    })();
    
                                    let params = {
                                        sendername: "Bolsa de Trabajo - Tecnica 2",
                                        to: "<?php echo $_POST['email']; ?>",
                                        subject: "<?php echo $mail_asunto; ?>",
                                        message: "<?php echo $mail_mensaje; ?>"
                                    };
    
                                    let serviceID = "service_ifcpjwj";
                                    let templateID = "template_ei8hmto";
    
                                    emailjs.send(serviceID, templateID, params).then(function(response){
                                        console.log('Correo enviado correctamente.', response);
                                        window.location.href = "./adminmenu.php";
                                    }, function(error){
                                        console.error('Error al enviar el correo.', error);
                                        window.location.href = "./adminmenu.php";
                                    });
                                }
    
                                SendMail();
                            </script>
                            <?php 
                            $connection->commit(); // Commit the transaction
                            exit();
                        } catch(Exception $e) {
                            $connection->rollback(); // Rollback the transaction on error
                            echo 'ERROR: ' . $e->getMessage();
                        } finally {
                            if(isset($stmt)){
                                $stmt->close(); // Close the statement
                            }

                            $connection->close(); // Close the connection
                        }
                    }
                ?>
        </table>
        <br>
    </section>
    <div id="form-rest"></div>

    <!-- Include Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
        </script>
</body>

</html>
