<?php
    require "../logica/connection.php";
    
    $obj= new conecction();
    $conexion= $obj->conectar();
    //crea la conexion
    $id=$_GET['id'];
    //recibe el id
    $opcion=$_GET['opcion'];
    // recibe la opcion
    switch ($opcion) {
        case 'Idioma':
            //selecciona los datos de idioma segun el id
            $sql="SELECT * FROM idioma WHERE idioma_id=$id";
            break;
        case 'Etiqueta':
            //selecciona los datos de etiqueta segun el id
            $sql="SELECT * FROM etiquetas WHERE etiqueta_id=$id";
            break;
        case 'Tipos':
            //selecciona los datos de tipos segun el id
            $sql="SELECT * FROM tipo_usuario WHERE tipoUsuario_id=$id";
            break;
        case 'Nivel':
            //selecciona los datos de niveles segun el id
            $sql="SELECT * FROM niveles WHERE niveles_id=$id";
            break;        
    }
    //ejecuta la consulta
    $result=mysqli_query($conexion,$sql);
    // hace fetch row a la consulta
    $ver=mysqli_fetch_row($result);
    // libera la query
    mysqli_free_result($result);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar</title>
</head>
<body>
    <form action="../logica/actualizar.php" method="POST">
        <input type="text" name="name" value="<?php echo $ver[1]; ?>">
        <input type="text" hidden="" name="id" value="<?php echo $id; ?>">
        <input type="text" hidden="" name="opcion" value="<?php echo $opcion; ?>">
        <input type="submit">
    </form>
</body>
</html>