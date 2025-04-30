<?php
session_start();

if(!isset($_SESSION['email'])) {
    header('Location:../Logic_Backend/logout.php');
    exit();
}

if (isset($_POST['pas'])){
    $pas=password_hash($_POST['pas'], PASSWORD_DEFAULT);
    header("Location:../Logic_Backend/restore_password.php?x=$pas");
}

$email=$_SESSION['email'];

?>
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
    <script type="module">
        import { restaurar } from "../scripts/restaurar.js";
        restaurar();
    </script>
    <main class="contenedor">
        <div class="contenido">
            <h1>Cambiar contraseña</h1>
            <h3>Debe remplazar su antigua contraseña por una nueva</h3>
        </div>
        <form class="contenido" method="POST" action="../Logic_Backend/restore_password.php" enctype="multipart/form-data">
            <div>
                <label for="pas1"> Nueva contraseña</label>
                <input type="password" id="pas1" name="pas1" autocomplete="off" />
            </div>
            <div>
                <label for="pas2">Confirmar contraseña</label>
                <input type="password" id="pas2" name="pas2" autocomplete="off" />
                <input type="text" hidden="true" value="<?php echo $email ?>">
            </div>
            <div>
                <button type="submit">Enviar</button>
            </div>
        </form>
    </main>
</body>

</html>