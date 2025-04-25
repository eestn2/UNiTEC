
<?php
/**
                         * This PHP file is part of a user profile editing page that allows users to manage their languages, 
                         * skill levels, and change their password. Below is a detailed explanation of the code:
                         * 
                         * - The HTML structure includes a form for managing languages and skill levels, and another form for changing passwords.
                         * - The PHP code dynamically generates JavaScript arrays (`text_languages`, `text_languages_l`, `array_languages`, `array_languages_l`) 
                         *   based on the user's current language and skill level data retrieved from the database.
                         * - JavaScript is used to handle dynamic interactions, such as enabling/disabling buttons, updating arrays, and ensuring data consistency.
                         * 
                         * Key Sections:
                         * 
                         * 1. **Language and Skill Level Management**:
                         *    - A set of checkboxes (`cboxI`) allows users to select their skill level for a language (Basic, Intermediate, Advanced).
                         *    - A button is provided to delete a selected language.
                         *    - PHP loops through database results (`$exe_language_in` and `$exe_level`) to populate JavaScript arrays with the user's current languages and skill levels.
                         *    - JavaScript dynamically updates these arrays and ensures only one checkbox is selected at a time for each language.
                         * 
                         * 2. **Password Change Form**:
                         *    - A form is provided for users to change their password.
                         *    - Hidden inputs include encrypted user ID (`usuario_id`), an action identifier (`action`), and a redirect URL (`url`).
                         *    - JavaScript ensures the "Change Password" button is only enabled when the new password and its confirmation match, and both are at least 8 characters long.
                         * 
                         * 3. **JavaScript Logic**:
                         *    - `setInterval` checks every second if the password inputs meet the criteria to enable the "Change Password" button.
                         *    - Event listeners on checkboxes (`cboxE` and `cboxI`) handle user interactions for selecting skill levels and updating the corresponding arrays.
                         *    - Functions like `showLabels()` and `showLanguages()` (not included in the provided code) are likely used to update the UI with the current state of the arrays.
                         * 
                         * Variables and Elements:
                         * 
                         * - `div_labels`, `div_languages`: DOM elements for displaying labels and languages.
                         * - `cboxE`, `cboxI`: Arrays of checkboxes for labels and languages, respectively.
                         * - `s_labels`, `s_languages`: Select elements for choosing labels and languages.
                         * - `i_pass`, `i_pass_r`: Input fields for the new password and its confirmation.
                         * - `text_labels`, `text_labels_l`, `array_labels`, `array_labels_l`: Arrays for managing label names and levels.
                         * - `text_languages`, `text_languages_l`, `array_languages`, `array_languages_l`: Arrays for managing language names and levels.
                         * 
                         * Notes:
                         * - The code uses `mysqli_data_seek` to reset the pointer of the `$exe_level` result set, allowing it to be reused in nested loops.
                         * - The `openssl_encrypt` function is used to encrypt the user ID for security purposes.
                         * - The JavaScript logic assumes that the `showLabels()` and `showLanguages()` functions are defined elsewhere to update the UI.
                         * - The code could benefit from refactoring to improve readability and maintainability, such as separating concerns and reducing redundancy.
                         */
// Include the database connection and encryption logic
require('../logica/connection.php');
require('../logica/cifrado.php');

// Set the default timezone
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Start the session to access session variables
session_start();

// Retrieve the email of the logged-in user from the session
$email = $_SESSION['email'];

// Query to fetch user details based on the email
$con_user = "SELECT * FROM `usuarios` WHERE `usuario_email` = '$email'";
$exe_user = $connection->query($con_user);
$array_user = mysqli_fetch_assoc($exe_user); // Fetch user data as an associative array
$id_user = $array_user['usuario_id']; // Extract the user ID

// Query to fetch the user's associated labels
$con_label_in = "SELECT * FROM `usu_etiquetas` WHERE `usuario_id` = '$id_user'";
$exe_label_in = $connection->query($con_label_in); 

// Query to fetch the user's associated languages
$con_language_in = "SELECT * FROM `usu_idiomas` WHERE `usuario_id` = '$id_user'";
$exe_language_in = $connection->query($con_language_in); 

// Query to fetch all user types
$con_type = "SELECT * FROM `tipo_usuario`";
$exe_type = $connection->query($con_type);

// Query to fetch all states
$con_state = "SELECT * FROM `estados`";
$exe_state = $connection->query($con_state);

// Query to fetch all available languages
$con_language = "SELECT * FROM `idioma`";
$exe_language = $connection->query($con_language);

// Query to fetch all available labels
$con_label = "SELECT * FROM `etiquetas`";
$exe_label = $connection->query($con_label);

// Query to fetch all levels (e.g., Basic, Intermediate, Advanced)
$con_level = "SELECT * FROM `niveles`";
$exe_level = $connection->query($con_level);

// Function to calculate the age of the user based on their date of birth
function calcularEdad($fechaDeNacimiento){
    $fechaDeNacimiento = new DateTime($fechaDeNacimiento); // Convert the date string to a DateTime object
    $fechaActual = new DateTime(); // Get the current date
    $diferencia = $fechaActual->diff($fechaDeNacimiento); // Calculate the difference
    $edad = $diferencia->y; // Extract the year difference as the age

    return $edad; // Return the calculated age
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/edit-perfil.css"> <!-- Link to the CSS for profile editing -->
    <link rel="stylesheet" href="../estilos/navbar.css"> <!-- Link to the CSS for the navigation bar -->
    <title>Editar Perfil</title> <!-- Page title -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Include SweetAlert2 for alerts -->
</head>
<body>
    <header class="header">
      <nav class="navbar">
        <div class="menu-toggle">
          <label for="toggle" class="label">
            <span>
                <div class="dropdown">
                    <!-- Dropdown for user options -->
                    <button class="dropbtn"><img style="width:27px; height:27px;"
                            src="../imgs/user_icon.png" alt="user Icon"></button>
                    <div class="dropdown-content">
                        <a href="./edit-perfil-u.php">Editar Perfil</a> <!-- Link to edit profile -->
                        <a href="../logica/cerrarsesion.php">Cerrar Sesion</a> <!-- Link to log out -->
                    </div>
                </div>
            </span>
            <span>
                <div class="dropdown">
                    <!-- Dropdown for navigation options -->
                    <button class="dropbtn"><img style="width:24px; height:24px;"
                            src="../imgs/54206.png" alt="menu Icon"></button>
                    <div class="dropdown-content">
                        <a href="../index.php">Inicio</a> <!-- Link to the home page -->
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
                <!-- Display user profile picture -->
                <center><img class="image" id="img" src="<img class="image" src=""/></center>
                <!-- Display user name -->
                <center><h3 class="username text-center"><?php echo $array_user['usuario_nombre']; ?></h3></center>
                <!-- Display user age -->
                <center><h3 class="username text-center"><?php echo calcularEdad($array_user['usuario_edad']) . " años"?></h3></center>
                <!-- Form to upload a new profile picture -->
                <form action="../logica/user.php" method="post" enctype="multipart/form-data">
                    <input type="file" name="image" class="btn btn-primary btn-block" required>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="8"> <!-- Action for updating the profile picture -->
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <button class="btn btn-primary btn-block" type="submit">Editar foto</button>
                </form>
                <!-- Form to deactivate the account -->
                <form action="../logica/user.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <input type="hidden" name="action" value="7"> <!-- Action for deactivating the account -->
                    <button class="btn btn-primary btn-block">Desactivar cuenta</button>
                </form>
                <br>
            </div>
            <script>
                // Arrays to store IDs and text for labels and languages
                let array_labels = []; // IDs of labels
                let array_languages = []; // IDs of languages

                let array_labels_l = []; // IDs of label levels
                let array_languages_l = []; // IDs of language levels

                let text_labels = []; // Text of labels
                let text_languages = []; // Text of languages

                let text_labels_l = []; // Text of label levels
                let text_languages_l = []; // Text of language levels
            </script>
            <div class="right tab-content">
                <!-- Form for editing user details -->
                <form class="form-horizontal" method="POST" action="../logica/user.php" onSubmit="SendArrays();">
                    <!-- Hidden inputs to send arrays to the server -->
                    <input type="hidden" name="arrayPHPLabels" id="arrayPHPLabels">
                    <input type="hidden" name="arrayPHPLevelsLabels" id="arrayPHPLevelsLabels"> 
                    <input type="hidden" name="arrayPHPLanguages" id="arrayPHPLanguages">
                    <input type="hidden" name="arrayPHPLevelsLanguages" id="arrayPHPLevelsLanguages"> 
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-u.php">
                    <input type="hidden" name="action" value="4"> <!-- Action for saving changes -->
                    <input type="hidden" name="fecha" value="<?php echo date('Y-m-d'); ?>"> <!-- Current date -->

                    <div>
                        <!-- Input fields for user details -->
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
                        <!-- Dropdown for user type -->
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
                        <!-- Dropdown for user state -->
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
                        <!-- Dropdown for job-related labels -->
                        <label for="text">Etiquetas laborales</label>
                        <select name="etiquetas" id="etiquetas" class="form-control">
                            <?php
                                while($array_label = mysqli_fetch_array($exe_label)){ ?>
                                    <option value="<?php echo $array_label['etiqueta_id'] ?>"><?php echo $array_label['etiqueta_nombre']; ?></option>
                            <?php
                                    $labels[] = $array_label; 
                            } ?>
                        </select>
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