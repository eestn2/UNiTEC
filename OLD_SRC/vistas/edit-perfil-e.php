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
                        <a href="./edit-perfil-e.php">Editar Perfil</a>
                        <a href="../logica/cerrarsesion.php">Cerrar Sesion</a>
                    </div>
                </div>
            </span>
            <span>
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
            <div class="left box-primary">
                <center><img class="image" id="img" src="<img class="image" src=""/></center>
                <center><h3 class="username text-center"><?php echo $array_user['usuario_nombre']; ?></h3></center>
                <br>
                <form action="../logica/user.php" method="POST" enctype="multipart/form-data">
                    <input type="file" name="image" class="btn btn-primary btn-block" required>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="8">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">
                    <button class="btn btn-primary btn-block" type="submit">Editar foto</button>
                </form>
                <form action="../logica/user.php" method="POST">
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">
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
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">
                    <input type="hidden" name="action" value="9">
                    <input type="hidden" name="fecha" value="<?php echo date('Y-m-d'); ?>">

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
                <form action="../logica/user.php" method="POST" class="cuadrado">
                    <p>Cambio de contraseña</p>
                    <input type="hidden" name="id" value="<?php echo openssl_encrypt($array_user['usuario_id'], AES, KEY); ?>">
                    <input type="hidden" name="action" value="6">
                    <input type="hidden" name="url" value="../vistas/edit-perfil-e.php">

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
        let i_pass = document.getElementById('input-password');
        let i_pass_r = document.getElementById('input-password-r');

        setInterval(() => {
            if(i_pass.value.trim() != '' && i_pass_r.value.trim() != ''){
                if(i_pass.value == i_pass_r.value && i_pass.value.length >= 8 && i_pass_r.value.length >= 8){
                    document.getElementById('btn-pass').disabled = false;
                }
            }
        }, 1000);

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