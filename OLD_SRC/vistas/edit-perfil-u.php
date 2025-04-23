<?php

require('../logica/connection.php');
require('../logica/cifrado.php');

date_default_timezone_set('America/Argentina/Buenos_Aires');

session_start();

$email = $_SESSION['email'];

$con_user = "SELECT * FROM `usuarios` WHERE `usuario_email` = '$email'";
$exe_user = $connection->query($con_user);
$array_user = mysqli_fetch_assoc($exe_user);
$id_user = $array_user['usuario_id'];

$con_label_in = "SELECT * FROM `usu_etiquetas` WHERE `usuario_id` = '$id_user'";
$exe_label_in = $connection->query($con_label_in); 

$con_language_in = "SELECT * FROM `usu_idiomas` WHERE `usuario_id` = '$id_user'";
$exe_language_in = $connection->query($con_language_in); 

$con_type = "SELECT * FROM `tipo_usuario`";
$exe_type = $connection->query($con_type);

$con_state = "SELECT * FROM `estados`";
$exe_state = $connection->query($con_state);

$con_language = "SELECT * FROM `idioma`";
$exe_language = $connection->query($con_language);

$con_label = "SELECT * FROM `etiquetas`";
$exe_label = $connection->query($con_label);

$con_level = "SELECT * FROM `niveles`";
$exe_level = $connection->query($con_level);

function calcularEdad($fechaDeNacimiento){
    $fechaDeNacimiento = new DateTime($fechaDeNacimiento);
    $fechaActual = new DateTime();
    $diferencia = $fechaActual->diff($fechaDeNacimiento);
    $edad = $diferencia->y;

    return $edad;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/edit-perfil.css">
    <link rel="stylesheet" href="../estilos/navbar.css">
    <title>Editar Perfil</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <header class="header">
      <nav class="navbar">
        <div class="menu-toggle">
          <label for="toggle" class="label">
            <span>
                <div class="dropdown">
                    <button class="dropbtn"><img style="width:27px; height:27px;"
                            src="../imgs/user_icon.png" alt="user Icon"></button>
                    <div class="dropdown-content">
                        <a href="./edit-perfil-u.php">Editar Perfil</a>
                        <a href="../logica/cerrarsesion.php">Cerrar Sesion</a>
                    </div>
                </div>
            </span>
            <span>
                <div class="dropdown">
                    <button class="dropbtn"><img style="width:24px; height:24px;"
                            src="../imgs/54206.png" alt="menu Icon"></button>
                    <div class="dropdown-content">
                        <a href="../index.php">Inicio</a>
                    </div>
                </div>
            </span>
          </label>
        </div>
      </nav>
    </header>
    <div class="contenedor">
    <main>
        <div class="container">
            <div class="left box-primary">
                <center><img class="image" id="img" src="<img class="image" src=""/></center>
                <center><h3 class="username text-center"><?php echo $array_user['usuario_nombre']; ?></h3></center>
                <center><h3 class="username text-center"><?php echo calcularEdad($array_user['usuario_edad']) . " años"?></h3></center>
                <form action="../logica/user.php" method="post" enctype="multipart/form-data">
                    <input type="file" name="image" class="btn btn-primary btn-block" required>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="8">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <button class="btn btn-primary btn-block" type="submit">Editar foto</button>
                </form>
                <form action="../logica/user.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <input type="hidden" name="action" value="7">
                    <button class="btn btn-primary btn-block">Desactivar cuenta</button>
                </form>
                <br>
            </div>
            <script>
                //Arrays que guardan los ids de las etiquetas e idiomas
                let array_labels = [];
                let array_languages = [];

                //Arrays que guardan los ids de los niveles de las etiquetas e idiomas
                let array_labels_l = [];
                let array_languages_l = [];

                //Arrays que guardan los textos de los idiomas y etiquetas
                let text_labels = [];
                let text_languages = [];

                //Arrays que guardan los textos de los niveles de los idiomas y etiquetas
                let text_labels_l = [];
                let text_languages_l = [];
            </script>
            <div class="right tab-content">
                <form class="form-horizontal" method="POST" action="../logica/user.php" onSubmit="SendArrays();">
                    <input type="hidden" name="arrayPHPLabels" id="arrayPHPLabels">
                    <input type="hidden" name="arrayPHPLevelsLabels" id="arrayPHPLevelsLabels"> 
                    <input type="hidden" name="arrayPHPLanguages" id="arrayPHPLanguages">
                    <input type="hidden" name="arrayPHPLevelsLanguages" id="arrayPHPLevelsLanguages"> 
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <input type="hidden" name="action" value="4">
                    <input type="hidden" name="fecha" value="<?php echo date('Y-m-d'); ?>">

                    <div>
                        <label for="nombre">Nombre y Apellido</label>
                        <input type="text" name="nombre" value="<?php echo $array_user['usuario_nombre']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="Email">Email</label>
                        <input type="email" name="correo" value="<?php echo $array_user['usuario_email']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="location">Localidad</label>
                        <input type="location" name="localidad" value="<?php echo $array_user['usuario_localidad']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="text">Link de portafolio</label>
                        <input type="text" name="portfolio" value="<?php echo $array_user['usuario_portfolio']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="text">Descripción</label>
                        <input type="text" name="descripcion" value="<?php echo $array_user['usuario_descripcion']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="text">Tipo de usuario</label>
                        <select name="tipo_de_usuario" class="form-control">
                            <?php
                                while($array_type = mysqli_fetch_array($exe_type)){
                                    if($array_user['usuario_tipo'] == $array_type['tipoUsuario_id']){ ?>
                                        <option value="<?php echo $array_type['tipoUsuario_id']; ?>" selected><?php echo $array_type['tipoUsuario_nombre']; ?></option>
                                    <?php
                                        if($array_user['usuario_tipo'] == '2'){ ?>
                                            <option value="3">Egresado</option>
                                    <?php } else { ?>
                                            <option value="2">Alumno</option>
                                    <?php }
                                    } 
                            } ?>
                        </select>
                    </div>
                    <div>
                        <label for="text">Estado</label>
                        <select name="estado" id="estado" class="form-control">
                            <?php
                                while($array_state = mysqli_fetch_array($exe_state)){
                                    if($array_user['usuario_estado'] == $array_state['estado_id']){ ?>
                                        <option value="<?php echo $array_state['estado_id']; ?>" selected><?php echo $array_state['estado_nombre']; ?></option>
                                    <?php } else { ?>
                                        <option value="<?php echo $array_state['estado_id']; ?>"><?php echo $array_state['estado_nombre']; ?></option>
                            <?php } } ?>
                        </select>
                    </div>
                    <div>
                        <label for="text">Etiquetas laborales</label>
                        <select name="etiquetas" id="etiquetas" class="form-control">
                            <?php
                                while($array_label = mysqli_fetch_array($exe_label)){ ?>
                                    <option value="<?php echo $array_label['etiqueta_id'] ?>"><?php echo $array_label['etiqueta_nombre']; ?></option>
                            <?php
                                    $labels[] = $array_label; 
                            } ?>
                        </select>
                        <center>
                            <input type="checkbox" class="cboxE" value="1">
                            <label for="">Básico</label>
                            <input type="checkbox" class="cboxE" value="2">
                            <label for="">Intermedio</label>
                            <input type="checkbox" class="cboxE" value="3">
                            <label for="">Avanzado</label>

                            <button type="submit" onclick="deleteLabel();">
                                Eliminar etiqueta seleccionada
                            </button>
                        </center>
                        <p>Tus etiquetas</p>
                        <div class="etiquetas" id="div-etiquetas">
                            <?php
                                mysqli_data_seek($exe_level, 0);
                                while($array_label_in = mysqli_fetch_array($exe_label_in)){
                                    foreach($labels as $label){
                                        if($array_label_in['in_etiqueta'] == $label['etiqueta_id']){ 
                                            while($array_level = mysqli_fetch_array($exe_level)){ 
                                                if($array_label_in['nivel'] == $array_level['niveles_id']){?>
                                                    <script>
                                                        text_labels.push('<?php echo $label['etiqueta_nombre']; ?>');
                                                        text_labels_l.push('<?php echo $array_level['niveles_nombre']; ?>');
                                                        array_labels.push('<?php echo $array_label_in['in_etiqueta']; ?>');
                                                        array_labels_l.push('<?php echo $array_label_in['nivel']; ?>');
                                                    </script>
                            <?php } } mysqli_data_seek($exe_level, 0); } } } ?>
                        </div>
                    </div>
                    <div>
                        <label for="text">Idiomas</label>
                        <select name="idiomas" id="idiomas" class="form-control">
                            <?php
                                while($array_language = mysqli_fetch_array($exe_language)){ ?>
                                    <option value="<?php echo $array_language['idioma_id']; ?>"><?php echo $array_language['idioma_nombre']; ?></option>
                            <?php
                                    $languages[] = $array_language; 
                            } ?>
                        </select>
                        <center>
                            <input type="checkbox" class="cboxI" value="1">
                            <label for="">Básico</label>
                            <input type="checkbox" class="cboxI" value="2">
                            <label for="">Intermedio</label>
                            <input type="checkbox" class="cboxI" value="3">
                            <label for="">Avanzado</label>

                            <button type="submit" onclick="deleteLanguage();">
                                Eliminar idioma seleccionado
                            </button>
                        </center>
                        <p>Tus idiomas</p>
                        <div class="idiomas" id="div-idiomas">
                            <?php
                                mysqli_data_seek($exe_level, 0);
                                while($array_language_in = mysqli_fetch_array($exe_language_in)){
                                    foreach($languages as $language){
                                        if($array_language_in['in_idioma'] == $language['idioma_id']){ 
                                            while($array_level = mysqli_fetch_array($exe_level)){ 
                                                if($array_language_in['nivel'] == $array_level['niveles_id']){?>
                                                    <script>
                                                        text_languages.push('<?php echo $language['idioma_nombre']; ?>');
                                                        text_languages_l.push('<?php echo $array_level['niveles_nombre']?>');
                                                        array_languages.push('<?php echo $array_language_in['in_idioma']; ?>');
                                                        array_languages_l.push('<?php echo $array_language_in['nivel']; ?>');
                                                    </script>
                            <?php } } mysqli_data_seek($exe_level, 0); } } } ?>
                        </div>
                        <div>
                            <center><button type="submit">Guardar cambios</button></center>
                        </div>
                    </div>
                </form>
                <br><br>
                <form action="../logica/user.php" method="POST" class="cuadrado">
                    <p>Cambio de contraseña</p>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="6">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">

                    <label for="password">Contraseña actual</label>
                    <input type="password" name="password" autocomplete="off" required>
                    <br><br>
                    <label for="new-password">Nueva contraseña</label>
                    <input type="password" id="input-password" name="new-password" autocomplete="off" required>
                    <br><br>
                    <label for="new-password">Repetir nueva contraseña</label>
                    <input type="password" id="input-password-r" autocomplete="off" required>

                    <br><br>
                    <button id="btn-pass" type="submit" disabled>Cambiar contraseña</button>
                </form>
            </div>
        </div>
    </main>
    <script>
        let div_labels = document.getElementById('div-etiquetas');
        let div_languages = document.getElementById('div-idiomas');

        let cboxE = [...document.querySelectorAll('.cboxE')];
        let cboxI = [...document.querySelectorAll('.cboxI')];

        let s_labels = document.getElementById('etiquetas');
        let s_languages = document.getElementById('idiomas');

        let i_pass = document.getElementById('input-password');
        let i_pass_r = document.getElementById('input-password-r');

        setInterval(() => {
            if(i_pass.value.trim() != '' && i_pass_r.value.trim() != ''){
                if(i_pass.value == i_pass_r.value && i_pass.value.length >= 8 && i_pass_r.value.length >= 8){
                    document.getElementById('btn-pass').disabled = false;
                }
            }
        }, 1000);

        cboxE.forEach(e => {
            e.addEventListener('change', () => {
                if(text_labels.includes(s_labels.options[s_labels.selectedIndex].text)){
                    for(let i = 0; i < text_labels.length; i++){
                        if(text_labels[i] == s_labels.options[s_labels.selectedIndex].text){
                            switch(e.value){
                                case '1':
                                    text_labels_l[i] = 'Básico';
                                    array_labels_l[i] = '1';
                                    break;
                                case '2':
                                    text_labels_l[i] = 'Intermedio';
                                    array_labels_l[i] = '2';
                                    break;
                                case '3':
                                    text_labels_l[i] = 'Avanzado';
                                    array_labels_l[i] = '3';
                                    break;
                            }

                            showLabels();
                        }
                    }

                    if(e.checked) {
                        cboxE.forEach(otherCheckbox => {
                            if (otherCheckbox !== e) {
                                otherCheckbox.checked = false;
                            }
                        });
                    }
                } else {
                    array_labels.push(s_labels.value);
                    array_labels_l.push(e.value);
                    text_labels.push(s_labels.options[s_labels.selectedIndex].text);

                    switch(e.value){
                        case '1':
                            text_labels_l.push('Básico');
                            break;
                        case '2':
                            text_labels_l.push('Intermedio');
                            break;
                        case '3':
                            text_labels_l.push('Avanzado');
                            break;
                    }

                    showLabels();
                }
            });
        });

        cboxI.forEach(e => {
            e.addEventListener('change', () => {
                if(text_languages.includes(s_languages.options[s_languages.selectedIndex].text)){
                    for(let i = 0; i < text_languages.length; i++){
                        if(text_languages[i] == s_languages.options[s_languages.selectedIndex].text){
                            switch(e.value){
                                case '1':
                                    text_languages_l[i] = 'Básico';
                                    array_languages_l[i] = '1';
                                    break;
                                case '2':
                                    text_languages_l[i] = 'Intermedio';
                                    array_languages_l[i] = '2';
                                    break;
                                case '3':
                                    text_languages_l[i] = 'Avanzado';
                                    array_languages_l[i] = '3';
                                    break;
                            }

                            showLanguages();
                        }
                    }

                    if(e.checked) {
                        cboxI.forEach(otherCheckbox => {
                            if (otherCheckbox !== e) {
                                otherCheckbox.checked = false;
                            }
                        });
                    }
                } else {
                    array_languages.push(s_languages.value);
                    array_languages_l.push(e.value);
                    text_languages.push(s_languages.options[s_languages.selectedIndex].text);

                    switch(e.value){
                        case '1':
                            text_languages_l.push('Básico');
                            break;
                        case '2':
                            text_languages_l.push('Intermedio');
                            break;
                        case '3':
                            text_languages_l.push('Avanzado');
                            break;
                    }

                    showLanguages();
                }
            });
        });

        window.addEventListener('DOMContentLoaded', () => {
            cboxE.forEach(otherCheckbox => {
                otherCheckbox.checked = false;
            });

            cboxI.forEach(otherCheckbox => {
                otherCheckbox.checked = false;
            });

            cboxE.forEach(e => {
                if(text_labels.includes(s_labels.options[s_labels.selectedIndex].text)){
                    for(let i = 0; i < array_labels_l.length; i++){
                        if(text_labels[i] == s_labels.options[s_labels.selectedIndex].text){
                            if(array_labels_l[i] == e.value){
                                e.checked = true;
                            }
                        }
                    }
                } else {
                    e.checked = false;
                }
            });

            cboxI.forEach(e => {
                if(text_languages.includes(s_languages.options[s_languages.selectedIndex].text)){
                    for(let i = 0; i < array_languages_l.length; i++){
                        if(text_languages[i] == s_languages.options[s_languages.selectedIndex].text){
                            if(array_languages_l[i] == e.value){
                                e.checked = true;
                            }
                        }
                    }
                } else {
                    e.checked = false;
                }
            });
        });

        s_labels.addEventListener('change', () => {
            cboxE.forEach(otherCheckbox => {
                otherCheckbox.checked = false;
            });

            cboxE.forEach(e => {
                if(text_labels.includes(s_labels.options[s_labels.selectedIndex].text)){
                    for(let i = 0; i < array_labels_l.length; i++){
                        if(text_labels[i] == s_labels.options[s_labels.selectedIndex].text){
                            if(array_labels_l[i] == e.value){
                                e.checked = true;
                            }
                        }
                    }
                } else {
                    e.checked = false;
                }
            });
        });

        s_languages.addEventListener('change', () => {
            cboxI.forEach(otherCheckbox => {
                otherCheckbox.checked = false;
            });

            cboxI.forEach(e => {
                if(text_languages.includes(s_languages.options[s_languages.selectedIndex].text)){
                    for(let i = 0; i < array_languages_l.length; i++){
                        if(text_languages[i] == s_languages.options[s_languages.selectedIndex].text){
                            if(array_languages_l[i] == e.value){
                                e.checked = true;
                            }
                        }
                    }
                } else {
                    e.checked = false;
                }
            });
        });

        function deleteLabel(){
            event.preventDefault();

            if(text_labels.length == 1){
                Swal.fire({
                    title: 'Tiene que tener al menos una etiqueta guardada.', 
                    icon: 'warning',
                    confirmButtonColor: '#A70019',
                    confirmButtonText: 'Aceptar',
                });
            } else {
                for(let i = 0; i < text_labels.length; i++){
                    if(text_labels[i] == s_labels.options[s_labels.selectedIndex].text){
                        text_labels_l.splice(i,1);
                        array_labels_l.splice(i,1);
                        text_labels.splice(i,1);
                        array_labels.splice(i,1);
                    }
                }

                cboxE.forEach(otherCheckbox => {
                    otherCheckbox.checked = false;
                });

                showLabels();
            }
        }

        function showLabels(){
            div_labels.innerHTML = '';

            for(let i = 0; i < text_labels.length; i++){
                const span = document.createElement('span');
                span.textContent = text_labels[i] + ' - ' + text_labels_l[i] + '\n';
                div_labels.appendChild(span);
            }
        }

        function deleteLanguage(){
            event.preventDefault();

            if(text_languages.length == 1){
                Swal.fire({
                    title: 'Tiene que tener al menos un idioma guardado.', 
                    icon: 'warning',
                    confirmButtonColor: '#A70019',
                    confirmButtonText: 'Aceptar',
                });
            } else {
                for(let i = 0; i < text_languages.length; i++){
                    if(text_languages[i] == s_languages.options[s_languages.selectedIndex].text){
                        text_languages_l.splice(i,1);
                        array_languages_l.splice(i,1);
                        text_languages.splice(i,1);
                        array_languages.splice(i,1);
                    }
                }

                cboxI.forEach(otherCheckbox => {
                    otherCheckbox.checked = false;
                });

                showLanguages();
            }
        }

        function showLanguages(){
            div_languages.innerHTML = '';

            for(let i = 0; i < text_languages.length; i++){
                const span = document.createElement('span');
                span.textContent = text_languages[i] + ' - ' + text_languages_l[i] + '\n';
                div_languages.appendChild(span);
            }
        }

        for(let i = 0; i < text_labels.length; i++){
            const span = document.createElement('span');
            span.textContent = text_labels[i] + ' - ' + text_labels_l[i] + '\n';
            div_labels.appendChild(span);
        }

        for(let i = 0; i < text_languages.length; i++){
            const span = document.createElement('span');
            span.textContent = text_languages[i] + ' - ' + text_languages_l[i] + '\n';
            div_languages.appendChild(span);
        }

        function SendArrays(){
            document.getElementById('arrayPHPLabels').value = array_labels.toString();
            document.getElementById('arrayPHPLevelsLabels').value = array_labels_l.toString();
            document.getElementById('arrayPHPLanguages').value = array_languages.toString();
            document.getElementById('arrayPHPLevelsLanguages').value = array_languages_l.toString();
        }

        function removeUrlParams() {
        
            const url = new URL(window.location.href);

            url.searchParams.delete('msg');

            window.history.replaceState({}, document.title, url.toString());
        }
    </script>

    <?php
        if(isset($_GET['msg'])){ ?>
            <script>
                Swal.fire({
                    title: '<?php echo $_GET['msg']; ?>',
                    icon: 'success',
                    confirmButtonColor: '#A70019',
                    confirmButtonText: 'Aceptar',
                });

                removeUrlParams();
            </script>
        <?php } 

        if(empty($array_user['usuario_fotoPerfil'])){ ?>
            <script>
                document.getElementById('img').src = '../imgs/img_u/user.jpg';
            </script>
        <?php } else { ?>
            <script>
                document.getElementById('img').src = './' + '<?php echo $array_user['usuario_fotoPerfil']; ?>';
            </script>
        <?php } ?>
</body>