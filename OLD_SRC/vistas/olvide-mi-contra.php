<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/olvide-mi-contra.css">
    <link rel="icon" href="../imgs/logo_blanco.ico">
    <title>Olvide mi contraseña</title>
</head>

<body>
    <a style="position: absolute; top: 15px; left: 20px; z-index: 100; text-decoration: none; width: auto;" href="../vistas/login.php">Volver al inicio</a>
    <div class="blur-overlay">
        <main class="contenedor">
            <div class="contenido">
                <h1>Buscar tu contraseña</h1>
                <h3>Ingresa el correo que usaste en esta pagina</h3>
            </div>
            <form class="contenido" method="POST" action="./verificar.php" enctype="multipart/form-data">
                <div>
                    <label for="email">Email</label>
                    <input type="text" name="email" autocomplete="off" />
                </div>
                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </main>
    </div>
</body>

</html>