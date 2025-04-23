<?php
session_start();

if(isset($_POST['em'])&&isset($_POST['dir'])) {
    $_SESSION['email'] = $_POST['em'];
    $dir=$_POST['dir'];
    header("Location:$dir");
}

if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $direccion = "../index.php";
} elseif (isset($_POST['email'])) {
    $email = $_POST['email'];
    $direccion = "./olvide-contrasenia.php";
}

$direccionJSON = json_encode($direccion);
$emailJSON = json_encode($email);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/verificar.css">
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <title>Verificacion</title>
</head>
<body class="logueo">
    <script type="module">
        import { verificacion } from "../scripts/verificacion.js";
        verificacion(<?php echo $direccionJSON; ?>, <?php echo $emailJSON; ?>);
    </script>

    <form method="post" action="./verificar.php">
        <div class="log">
            <img src="../imgs/escudo-removebg-preview.png" alt="logo de la escuela">
            <input class="cont" placeholder="Ingrese su código de verificación" name="codigo" type="text">
            <a class="reg" href="./login.php">Volver</a>
            <input class="boton" value="Verificar" type="submit">
        </div>
    </form>
</body>
</html>
