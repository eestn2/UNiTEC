<?php

// Include the database connection file
require('../logica/connection.php');

// Include the encryption utility file
require('../logica/cifrado.php');

// Set the default timezone
date_default_timezone_set('America/Argentina/Buenos_Aires');

// Start the session to access session variables
session_start();

// Retrieve the email of the logged-in user from the session
$email = $_SESSION['email'];

// Query to fetch user details based on the email
$con_user = "SELECT * FROM `usuarios` WHERE `usuario_email` = '$email'";
$exe_user = $connection->query($con_user); // Execute the query
$array_user = mysqli_fetch_assoc($exe_user); // Fetch the user data as an associative array
$id_user = $array_user['usuario_id']; // Extract the user ID

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link to the CSS file for profile editing styles -->
    <link rel="stylesheet" href="../estilos/edit-perfil.css">
    <!-- Link to the CSS file for the navigation bar -->
    <link rel="stylesheet" href="../estilos/navbar.css">
    <title>Editar Perfil</title>
    <!-- Include SweetAlert2 library for alerts -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <!-- Header section with navigation bar -->
    <header class="header">
      <nav class="navbar">
        <div class="menu-toggle">
          <label for="toggle" class="label">
            <span>
                <!-- Dropdown menu for user options -->
                <div class="dropdown">
                    <button class="dropbtn"><img style="width:27px; height:27px;"
                            src="../imgs/user_icon.png" alt="user Icon"></button>
                    <div class="dropdown-content">
                        <a href="./edit-perfil-e.php">Editar Perfil</a>
                        <a href="../logica/cerrarsesion.php">Cerrar Sesion</a>
                    </div>
                </div>
            </span>
            <span>
                <!-- Dropdown menu for navigation options -->
                <div class="dropdown">
                    <button class="dropbtn"><img style="width:24px; height:24px;"
                            src="../imgs/54206.png" alt="menu Icon"></button>
                    <div class="dropdown-content">
                        <a href="../index-e.php">Inicio</a>
                    </div>
                </div>
            </span>
          </label>
        </div>
      </nav>
    </header>
    <main>
        <div class="container">
            <!-- Left section for profile picture and account actions -->
            <div class="left box-primary">
                <!-- Display the user's profile picture -->
                <center><img class="image" id="img" src="<img class="image" src=""/></center>
                <!-- Display the user's name -->
                <center><h3 class="username text-center"><?php echo $array_user['usuario_nombre']; ?></h3></center>
                <br>
                <!-- Form to upload a new profile picture -->
                <form action="../logica/user.php" method="POST" enctype="multipart/form-data">
                    <input type="file" name="image" class="btn btn-primary btn-block" required>
                    <!-- Encrypt the user ID for security -->
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="8"> <!-- Action code for updating the profile picture -->
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php"> <!-- Redirect URL -->
                    <button class="btn btn-primary btn-block" type="submit">Editar foto</button>
                </form>
                <!-- Form to deactivate the account -->
                <form action="../logica/user.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">
                    <input type="hidden" name="action" value="7"> <!-- Action code for deactivating the account -->
                    <button class="btn btn-primary btn-block">Desactivar cuenta</button>
                </form>
                <br>
            </div>
            <script>
                // Arrays to store IDs and texts for labels and languages
                let array_labels = [];
                let array_languages = [];
                let array_labels_l = []; // Levels of labels
                let array_languages_l = []; // Levels of languages
                let text_labels = []; // Texts of labels
                let text_languages = []; // Texts of languages
                let text_labels_l = []; // Texts of label levels
                let text_languages_l = []; // Texts of language levels
            </script>
            <!-- Right section for editing user details -->
            <div class="right tab-content">
                <!-- Form to update user details -->
                <form class="form-horizontal" method="POST" action="../logica/user.php" onSubmit="SendArrays();">
                    <!-- Hidden inputs to send arrays and other data -->
                    <input type="hidden" name="arrayPHPLabels" id="arrayPHPLabels">
                    <input type="hidden" name="arrayPHPLevelsLabels" id="arrayPHPLevelsLabels"> 
                    <input type="hidden" name="arrayPHPLanguages" id="arrayPHPLanguages">
                    <input type="hidden" name="arrayPHPLevelsLanguages" id="arrayPHPLevelsLanguages"> 
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">
                    <input type="hidden" name="action" value="9"> <!-- Action code for updating user details -->
                    <input type="hidden" name="fecha" value="<?php echo date('Y-m-d'); ?>"> <!-- Current date -->

                    <!-- Input fields for user details -->
                    <div>
                        <label for="nombre">Nombre</label>
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
                        <label for="text">Página web</label>
                        <input type="text" name="portfolio" value="<?php echo $array_user['usuario_portfolio']; ?>" autocomplete="off">
                    </div>
                    <div>
                        <label for="text">Descripción</label>
                        <input type="text" name="descripcion" value="<?php echo $array_user['usuario_descripcion']; ?>" autocomplete="off">
                    </div>

                    <button type="submit">Enviar datos</button>
                </form>
                <br><br>
                <!-- Form to change the password -->
                <form action="../logica/user.php" method="POST" class="cuadrado">
                    <p>Cambio de contraseña</p>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="6"> <!-- Action code for changing the password -->
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">

                    <!-- Input fields for current and new passwords -->
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
        // JavaScript to enable the password change button only if the new passwords match and meet the length requirement
        let i_pass = document.getElementById('input-password');
        let i_pass_r = document.getElementById('input-password-r');

        setInterval(() => {
            if(i_pass.value.trim() != '' && i_pass_r.value.trim() != ''){
                if(i_pass.value == i_pass_r.value && i_pass.value.length >= 8 && i_pass_r.value.length >= 8){
                    document.getElementById('btn-pass').disabled = false;
                }
            }
        }, 1000);

        // Function to remove URL parameters (e.g., 'msg') after displaying a success message
        function removeUrlParams() {
            const url = new URL(window.location.href);
            url.searchParams.delete('msg');
            window.history.replaceState({}, document.title, url.toString());
        }
    </script>

    <?php
        // Display a success message if the 'msg' parameter is present in the URL
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

        // Set the default profile picture if none is available
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