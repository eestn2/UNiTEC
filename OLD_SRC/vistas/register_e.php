<?php

require('../logica/connection.php');

date_default_timezone_set('America/Argentina/Buenos_Aires');

$show_users = "SELECT * FROM `tipo_usuario`";
$show_location = "SELECT * FROM `localidades`";

$query_users = $connection->query($show_users);
$query_location = $connection->query($show_location);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse</title>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="icon" href="logo_blanco.ico">
    <link rel="stylesheet" type="text/css" href="../estilos/registro.css">
</head>
<body style="overflow: hidden;">
    <section class="container">
        <form action="../logica/user.php" method="POST" onSubmit="inputsEmpty();">
            <h1>Registro de la empresa</h1>
            <br>
            <div class="form-box">
            <input type="text" class="input-box" placeholder="Nombre de la empresa" name="nombre" required>
            <input type="email" class="input-box" placeholder="Correo electr&oacute;nico" name="correo" required>
            <input type="password" class="input-box" placeholder="Contrase&ntilde;a" name="contrasenia" required> 
            <select name="localidad" required>
                <option value="">Localidad</option>
                <?php
                    while($array = mysqli_fetch_assoc($query_location)){ ?>
                            <option value="<?php echo $array['Localidad_id']; ?>"><?php echo $array['Localidad_nombre']; ?></option>    
                <?php } ?>
            </select>

            <input type="text" class="input-box" placeholder="Ingrese el link de su página web (Opcional)" name="portfolio">
            <textarea name="descripcion" class="input-box" cols="30" rows="3" placeholder="Ingrese una descripcion de su empresa" required></textarea>
            </div>

            <input type="text" name="rango" value="2" hidden>
            <input type="text" name="estado" value="1" hidden>
            <input type="hidden" name="edad" value="<?php echo date('Y-m-d') ?>" hidden>
            <input type="hidden" name="url" value="../vistas/register_e.php">
            <input type="hidden" name="fecha" value="<?php echo date('Y-m-d'); ?>">
            <input type="hidden" name="habilitado" value="false">
            <input type="hidden" name="action" value="2">

            <select name="tipo_de_usuario" required hidden>
                <?php
                    while($array = mysqli_fetch_assoc($query_users)){ 
                        if($array['tipoUsuario_nombre'] == "Empresa") {?>
                            <option value="<?php echo $array['tipoUsuario_id']; ?>"><?php echo $array['tipoUsuario_nombre']; ?></option>
                <?php } }?>
            </select>
            <div class="container-submit">
            <center>
                <input type="submit" id="btn-reg" class="btn" value="Registrarse" disabled>
                <p><a href="../vistas/register_u.php">Registrarse como usuario</a></p>
                <p>¿Ya tienes una cuenta? <a href="./login.php">Iniciar sesi&oacute;n</a></p>
            </center>
            </div>
            </div>
        </form>
    </section>

    <script>
        let inputs = document.querySelectorAll('input:not([type="hidden"]):required');

        let btn_reg = document.getElementById('btn-reg');

        function removeUrlParams() {
            const url = new URL(window.location.href);

            url.searchParams.delete('msg');

            window.history.replaceState({}, document.title, url.toString());
        }

        check_btn = setInterval(btnDisabled, 1000);

        function btnDisabled(){
            let empty = false;

            inputs.forEach(e => {
                if(e.value.trim() == ''){
                    empty = true;
                }

                e.addEventListener('input', () => {
                    if (e.value.length > 80){
                        e.value = e.value.slice(0, 80); 
                    }
                });

            });

            if(empty == false){
                btn_reg.disabled = false;
            } else {
                btn_reg.disabled = true;
            }
        }

        function inputsEmpty(){
            inputs.forEach(e => {
                e = e.value.trim();
            })
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
    <?php } ?>
</body>
</html>