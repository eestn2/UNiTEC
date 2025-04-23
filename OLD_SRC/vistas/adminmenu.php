<?php
require('../logica/metodoscrud.php');
require('../logica/connection.php');
require('../logica/cifrado.php');

function calcularEdad($fechaDeNacimiento){
    $fechaDeNacimiento = new DateTime($fechaDeNacimiento);
    $fechaActual = new DateTime();
    $diferencia = $fechaActual->diff($fechaDeNacimiento);
    $edad = $diferencia->y;

    return $edad;
}

if (isset($_GET['action-name'])) {
    switch ($_GET['action-name']) {
        case 'IDIOMA':
            if (isset($_GET['id']) && isset($_GET['name'])) {
                $stmt = $connection->prepare("UPDATE `idioma` SET `idioma_nombre` = ? WHERE `idioma_id` = ?");
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
        case 'ETIQUETA':
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
        case 'NIVEL':
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
        case 'TIPO':
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
            echo 'ERROR';
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin menu</title>


    <!-- style -->
    <link rel="icon" href="../imgs/logo_blanco.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="../estilos/adminStyle.css">
</head>

<body>
    <script src="../scripts/ajax.js"></script>
    <script src="../scripts/toggleWindow.js" defer></script>
    <header>
        <nav>
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
        <h3 class="idiomas">Idiomas</h3>

        <div class="adminmenudiv">
            <?php
            $obj = new methods();
            // CONSULTAS
            $idiomas = "SELECT * FROM idioma";
            $etiquetas = "SELECT * FROM etiquetas";
            $tipos = "SELECT * FROM tipo_usuario";
            $niveles = "SELECT * FROM niveles";
            // Muestra los datos de esa consulta
            $datos = $obj->mostrarDatos($idiomas);

            foreach ($datos as $key) { ?>
                <div class="contenedor-idiomas idiomas" id="idiomas">
                    <div class="contenedor-p">
                        <form action="adminmenu.php" method="GET" class="form" id="form-idiomas-<?php echo $key['idioma_id']; ?>">
                            <input type="text" name="name" class="input-toggle inputs-idiomas" id="inputs-idiomas" value="<?php echo $key['idioma_nombre']; ?>" disabled>
                            <span onclick="enfocarInput(this)" class="material-symbols-outlined habilitar">edit_note</span>
                            <input type="hidden" name="id" value="<?php echo $key['idioma_id']; ?>">
                            <input type="hidden" name="action-name" value="IDIOMA">
                        </form>
                    </div>
                    <a class="btn-editar btn btn-primary" data-form-id="form-idiomas-<?php echo $key['idioma_id']; ?>">Actualizar</a>
                    <a class="btn-eliminar btn btn-danger"
                        href="eliminar.php?id=<?php echo $key['idioma_id']; ?>&opcion=Idioma">Eliminar</a>
                </div>
            <?php } ?>
        </div>

        <h3 class="etiquetas">Etiquetas</h3>
        <div class="adminmenudiv">
            <?php $datos = $obj->mostrarDatos($etiquetas);
            foreach ($datos as $key) { ?>
                <div class="contenedor-etiquetas etiquetas" id="etiquetas">
                    <div class="contenedor-p">
                        <form action="adminmenu.php" method="GET" class="form" id="form-etiquetas-<?php echo $key['etiqueta_id']; ?>">
                            <input type="text" name="name" class="input-toggle" id="inputs-etiquetas"value="<?php echo $key['etiqueta_nombre']; ?>" disabled>
                            <span onclick="enfocarInput(this)" class="material-symbols-outlined habilitar">edit_note</span>
                            <input type="hidden" name="id" value="<?php echo $key['etiqueta_id']; ?>">
                            <input type="hidden" name="action-name" value="ETIQUETA">
                        </form>
                    </div>
                    <a class="btn-editar btn btn-primary" data-form-id="form-etiquetas-<?php echo $key['etiqueta_id']; ?>"  >Actualizar</a>
                    <a class="btn-eliminar btn btn-danger"
                        href="eliminar.php?id=<?php echo $key['etiqueta_id']; ?>&opcion=Etiqueta">Eliminar</a>
                </div>
            <?php } ?>
        </div>

        <h3 class="niveles">Niveles</h3>
        <div class="adminmenudiv">
            <?php $datos = $obj->mostrarDatos($niveles);
            foreach ($datos as $key) { ?>
                <div class="contenedor-niveles niveles" id="niveles">
                    <div class="contenedor-p">
                        <form action="adminmenu.php" method="GET" class="form" id="form-niveles-<?php echo $key['niveles_id']; ?>">
                            <input type="text" name="name" class="input-toggle" id="inputs-niveles" value="<?php echo $key['niveles_nombre']; ?>" disabled>
                            <span onclick="enfocarInput(this)" class="material-symbols-outlined habilitar">edit_note</span>
                            <input type="hidden" name="id" value="<?php echo $key['niveles_id']; ?>">
                            <input type="hidden" name="action-name" value="NIVEL">
                        </form>
                    </div>
                    <a class="btn-editar btn btn-primary" data-form-id="form-niveles-<?php echo $key['niveles_id']; ?>">Actualizar</a>
                    <a class="btn-eliminar btn btn-danger"
                        href="eliminar.php?id=<?php echo $key['niveles_id']; ?>&opcion=Nivel">Eliminar</a>
                </div>
            <?php } ?>
        </div>

        <h3 class="tipos">Tipos</h3>
        <div class="adminmenudiv">
            <?php $datos = $obj->mostrarDatos($tipos);
            foreach ($datos as $key) { ?>
                <div class="contenedor-tipos tipos" id="tipos">
                    <div class="contenedor-p">
                        <form action="adminmenu.php" method="GET" class="form" id="form-tipos-<?php echo $key['tipoUsuario_id']; ?>">
                            <input type="text" name="name" class="input-toggle" id="inputs-tipos" value="<?php echo $key['tipoUsuario_nombre']; ?>" disabled>
                            <span onclick="enfocarInput(this)" class="material-symbols-outlined habilitar">edit_note</span>
                            <input type="hidden" name="id" value="<?php echo $key['tipoUsuario_id']; ?>">
                            <input type="hidden" name="action-name" value="TIPO">
                        </form>
                    </div>
                    <a class="btn-editar btn btn-primary" data-form-id="form-tipos-<?php echo $key['tipoUsuario_id']; ?>">Actualizar</a>
                    <a class="btn-eliminar btn btn-danger"
                        href="eliminar.php?id=<?php echo $key['tipoUsuario_id']; ?>&opcion=Tipos">Eliminar</a>
                </div>
            <?php } ?>
        </div>

        <!-- muestra los datos de esa consulta -->
        <br>
        <br>
        <!-- insercion de idiomas -->
        <div class="contenedor-insercion">
            <form class="FormularioAjax" action="procesos.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
                <label>Insertar idioma</label>
                <input type="text" name="name" placeholder="Inserte el nombre del Idioma" class="inputs-insert">
                <input type="text" hidden="true" name="opcion" value="Idioma">
                <input type="submit" class="inputs-submit" value="Enviar">
            </form>
            <!-- insercion de etiquetas -->
            <form class="FormularioAjax" action="procesos.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
                <label>Insertar etiqueta</label>
                <input type="text" name="name" placeholder="Inserte el nombre de la Etiqueta" class="inputs-insert">
                <input type="text" hidden="true" name="opcion" value="Etiqueta">
                <input type="submit" class="inputs-submit" value="Enviar">
            </form>
            <form class="FormularioAjax" action="procesos.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
                <label for="">Insertar nivel</label>
                <input type="text" name="name" placeholder="Inserte el nombre del Nivel" class="inputs-insert">
                <input type="text" hidden="true" name="opcion" value="Nivel">
                <input type="submit" inputs-submit class="inputs-submit" value="Enviar">
            </form>
            <!-- insercion de tipos -->
            <form class="FormularioAjax" action="procesos.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
                <label for="">Insertar tipo</label>
                <input type="text" name="name" placeholder="Inserte el nombre del Tipo" class="inputs-insert">
                <input type="text" hidden="true" name="opcion" value="Tipos">
                <input type="submit" class="inputs-submit" value="Enviar">
            </form>
        </div>
        <!-- tabla para aceptar alumnos -->
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
                $stmt = $connection->prepare("SELECT * FROM `usuarios` WHERE `usuario_habilitado` = 'false' AND `usuario_estado` != '11'");
                $stmt->execute();
                $results = $stmt->get_result();
                
                while($fila =  $results->fetch_assoc()): ?>
                    <tbody class="cuerpo-tabla">
                        <tr>
                            <td data-cell="Nombre"><?php echo htmlspecialchars($fila['usuario_nombre']); ?></td>
                            <td data-cell="Edad"><?php echo htmlspecialchars(calcularEdad($fila['usuario_edad'])) . ' años'; ?></td>
                            <td data-cell="Localidad"><?php echo htmlspecialchars($fila['usuario_localidad']); ?></td>
                            <td data-cell="Email"><?php echo htmlspecialchars($fila['usuario_email']); ?></td>
                            <td data-cell="Link Portafolio"><?php echo htmlspecialchars($fila['usuario_portfolio']); ?></td>
                            <td data-cell="Tipo">
                                <?php
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
                    if(isset($_POST['id']) && isset($_POST['email'])){ 
                        $connection->begin_transaction();
                        try{
                            $id = openssl_decrypt($_POST['id'], AES, KEY);
                            $current_timestamp = date('Y-m-d H:i:s');
                            $mail_emisor = '1';

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
                            
                            $stmt = $connection->prepare("INSERT INTO `mails_enviados`(`mail_asunto`, `mail_mensaje`, `mail_emisor`, `mail_receptor`, `mail_fechaEmision`) VALUES (?, ?, ?, ?, ?)");
                            $stmt->bind_param("ssiis", $mail_asunto, $mail_mensaje, $mail_emisor, $id, $current_timestamp);
                            $stmt->execute();
                            ?>
                            <script>
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
                            $connection->commit();
                            exit();
                        } catch(Exception $e) {
                            $connection->rollback();
                            echo 'ERROR: ' . $e->getMessage();
                        } finally {
                            if(isset($stmt)){
                                $stmt->close();
                            }

                            $connection->close();
                        }
                    }
                ?>
        </table>
        <br>
    </section>
    <div id="form-rest"></div>

    <!-- script bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
        </script>
</body>

</html>