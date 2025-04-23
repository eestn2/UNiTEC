<?php
require "../logica/connection.php";
// id del usuario de la card
$idrecep=2;//$_GET['id'];
//Id de la sesion
$idemi=1;
//selecciona el mail del usuario
$egresados="SELECT usuario_email FROM usuarios WHERE usuario_id=$idrecep ";
//ejecuta la consulta
$eje=mysqli_query($connection,$egresados);
// crea un array con los resultados
$array = mysqli_fetch_all($eje);
$mails= json_encode($array);
// Recibe los datos enviados por AJAX
if(isset($_POST['mensaje']) && isset($_POST['asunto'])) {
    $mensaje = $_POST['mensaje'];
    $asunto = $_POST['asunto'];
    // Manejo de datos
    $subirmail="INSERT INTO mails_enviados VALUES (NULL,'$asunto','$mensaje','$idemi','$idrecep',current_timestamp())";
    $ejesubirmail=mysqli_query($connection,$subirmail);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mensajes</title>
</head>
<body>
    <script>
        
        function enviarMail(){
            var jsondata= <?php echo $mails; ?>;
            // guarda el json array de php en js
            jsondata.forEach(element => {
                //envia mail por cada mail del array
                SendMail(element);
            });

            function sendData() {
                //selecciona los datos
            var mensaje = document.getElementById("mensaje").value;
            var asunto = document.getElementById("asunto").value;

            // Envía los datos al servidor mediante AJAX
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Muestra la respuesta del servidor
                    console.log(this.responseText);
                }
            };
            //METODO, ARCHIVO, TRUE
            xhttp.open("POST", "empresa_a_usuario.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // ENVIA LOS PARAMETROS Y SUS VALORES
            xhttp.send("mensaje=" + mensaje + "&asunto=" + asunto);
            }
            //ejecuta el envio
            sendData()
        }
        
    </script>
    <input id="asunto" type="text" placeholder="Ingrese su asunto">
    <input id="mensaje" type="text" placeholder="Ingrese su mensaje">
    <button onclick="enviarMail()">Enviar Email</button>    
    <script src="../scripts/email.js"></script>
</body>
</html>