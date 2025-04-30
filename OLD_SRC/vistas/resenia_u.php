<?php
require "./user_dashboard.php";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insertar Reseñas</title>
</head>
<body>
    <script src="./ajax.js"></script>
    <form class="FormularioAjax" action="../Logic_Backend/insert_data_controller.php" method="POST" onsubmit="enviar_formulario_ajax(event)">
            <input type="text" name="name" placeholder="Inserte texto">
            <input type="text" hidden="true" name="opcion" value="Resenia">
            <input type="text" hidden="true" name="id" value="<?php echo $persona->getId(); ?>">
            <input type="submit">
    </form>
    <div id="form-rest"></div>
</body>
</html>