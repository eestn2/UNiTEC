<?php

require('../Logic_Backend/connect_to_database.php');

date_default_timezone_set('America/Argentina/Buenos_Aires');

$show_users = "SELECT * FROM `user_types`";

$query_users = $connection->query($show_users);

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
        <form action="../Logic_Backend/UserServiceManager.php" method="POST" onSubmit="inputsEmpty();">
            <h1>Registro de la empresa</h1>
            <br>
            <div class="form-box">
            <input type="text" class="input-box" placeholder="Nombre de su empresa" name="user_name" required>
            <input type="email" class="input-box" placeholder="Correo electrónico" name="user_email" required>
            <input type="password" class="input-box" placeholder="Contraseña" name="user_password" required> 
            <input type="text" class="input-box" placeholder="Localidad" name="user_location" required>
            <input type="text" class="input-box" placeholder="Link de su página web (Opcional)" name="user_portfolio">
            <textarea name="user_description" class="input-box" cols="30" rows="3" placeholder="Descripción de su empresa..." required></textarea>
            </div>

            <input type="text" name="rango" value="2" hidden>
            <input type="text" name="user_status" value="10" hidden>
            <input type="hidden" name="user_age" value="<?php echo date('Y-m-d') ?>" hidden>
            <input type="hidden" name="redirect_url" value="../vistas/register_e.php">
            <input type="hidden" name="user_date" value="<?php echo date('Y-m-d'); ?>">
            <input type="hidden" name="user_is_enabled" value="false">
            <input type="hidden" name="action" value="2">

            <select name="user_type" required hidden>
                <?php
                    while($array = mysqli_fetch_assoc($query_users)){ 
                        if($array['name'] == "Empresa") {?>
                            <option value="<?php echo $array['id']; ?>"><?php echo $array['name']; ?></option>
                <?php } }?>
            </select>
            <div class="container-submit">
            <center>
                <input type="submit" id="btn-reg" class="btn" value="Registrarse" disabled>
                <p><a href="../vistas/register_u.php">Registrarse como usuario</a></p>
                <p>¿Ya tienes una cuenta? <a href="./login.php">Iniciar sesión</a></p>
            </center>
            </div>
            </div>
        </form>
    </section>

    <script>
        let inputs = document.querySelectorAll('input');

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