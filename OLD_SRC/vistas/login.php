<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de sesion</title>
    <link rel="stylesheet" href="../estilos/logueo.css">
    <link rel="icon" href="../imgs/logo_blanco.ico">
</head>
<body class="logueo">
    <section class="container-form">
        <form action="../logica/user.php" method="POST" class="log">
            <div class="log">
                <div class="container-inputs">
                <img src="../imgs/escudo-removebg-preview.png" alt="logo de la escuela">
                <input class="cont" type="email" maxlength="40" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" placeholder="Ingrese su correo" name="email" required>
                <input class="cont" type="password" maxlength="40" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" placeholder="Ingrese su contraseña" name="clave" required> 
                </div>
                <div class="container">

                    
                <input class="boton" type="submit" name="iniciar sesion" value="Iniciar sesion" onclick="eliminarEspacios()">
                <a class="reg" href="./olvide-mi-contra.php">Restablecer contraseña</a>
                <p class="register-links">Registrarse como <a class="reg" href="./register_e.php">empresa</a> / <a class="reg" href="./register_u.php">usuario</a></p>
                <p class="msg">
                    <?php
                        if(isset($_GET['msg'])){
                            $message = $_GET['msg']; 
                            echo $message; ?>
                            <script>
                                function removeUrlParams() {

                                    const url = new URL(window.location.href);

                                    url.searchParams.delete('msg');

                                    window.history.replaceState({}, document.title, url.toString());
                                }

                                removeUrlParams();
                            </script>
                    <?php } ?>
                    </p>

                    <input type="hidden" name="action" value="5">
                    <input type="hidden" name="url" value="../vistas/login.php">
                </div>
            </div>
        </form>
    </section>
    <script>
        let inputs = document.querySelectorAll('input');
        
        function eliminarEspacios(){
            inputs.forEach(e => {
                e = e.value.trim();
            })
        }
    </script>
</body>
</html>