<?php
//crea la clase metodos
class methods{
    //funcion mostrardatos
    public function mostrarDatos($sql){
        global $connection;
        require_once("connection.php");
        //utiliza la conexion
        $result= $connection->query($sql);
        //ejecuta la consulta recibida
        $datos= $result->fetch_all(MYSQLI_ASSOC);
        //hace fetch all a la consulta
        $result->free_result();
        //libera la consulta
        //retorna el fetch con los datos
        return $datos;
    }
    // FUNCION INSERCION DE DATOS
    public function insertarDatos($datos,$opcion){
        global $connection;
        require_once("connection.php");
        //utiliza la conexion
        // depende de la opcion en el switch la consulta sera diferente
        switch ($opcion){
            case 'Idioma':
                // si es = a idioma insertara datos[0] que es el nombre
                $sql="INSERT INTO idioma(`idioma_nombre`) VALUES ('$datos[0]')";     
                break;
            case 'Etiqueta':
                // si es = a etiqueta insertara datos[0] que es el nombre
                $sql="INSERT INTO etiquetas(`etiqueta_nombre`) VALUES ('$datos[0]')";
                break;
            case 'Tipos':
                // si es = a tipos insertara datos[0] que es el nombre
                $sql="INSERT INTO tipo_usuario(`tipoUsuario_nombre`) VALUES ('$datos[0]')";
                break;
            case 'Nivel':
                // si es = a nivel insertara datos[0] que es el nombre
                $sql="INSERT INTO niveles(`niveles_nombre`) VALUES ('$datos[0]')";
                break;
            case 'Resenia':
                // si es = a nivel insertara datos[0] que es el nombre
                $sql="INSERT INTO resenia VALUES ('','$datos[0]','$datos[1]')";
                break;        
            default:
                //opcion default por si llega a haber un error
                echo "No se encontro la opcion";
            break;
        }

        //devuelve la query ejecutada
        return $result=mysqli_query($connection,$sql);
    }
    // FUNCION ACTUALIZACION DATOS
    public function actualizarDatos($datos,$opcion){
        global $connection;
        require_once("connection.php");
        //utiliza la conexion
        //dependiendo del valor la consulta sera diferente
        switch ($opcion) {
            case 'Idioma':
                // cambia el nombre del idioma por el actual ingresado datos[0] hace comprobacion de id
                $sql="UPDATE idioma SET idioma_nombre='$datos[0]' WHERE idioma_id='$datos[1]'";       
                break;
            case 'Etiqueta':
                // cambia el nombre de la etiqueta por el actual ingresado datos[0] hace comprobacion de id
                $sql="UPDATE etiquetas SET etiqueta_nombre='$datos[0]' WHERE etiqueta_id='$datos[1]'";
                break;
            case 'Tipos':
                // cambia el nombre del tipo por el actual ingresado datos[0] hace comprobacion de id
                $sql="UPDATE tipo_usuario SET tipoUsuario_nombre='$datos[0]' WHERE tipoUsuario_id='$datos[1]'";
                break;
            case 'Nivel':
                // cambia el nombre del nivel por el actual ingresado datos[0] hace comprobacion de id
                $sql="UPDATE niveles SET niveles_nombre='$datos[0]' WHERE niveles_id='$datos[1]'";
                break;    
            default:
                // opcion default para los errores
                echo "No se encontro la opcion";
                break;
        }
        // devuelve la query ejecutada
        return $result=mysqli_query($connection,$sql);
    }
    //FUNCION ELIMINACION DATOS
    public function eliminarDatos($id,$opcion){
        global $connection;
        require_once("connection.php");
        //utiliza la conexion
        //segun la opcion la query sera distinta
        switch ($opcion) {
            case 'Idioma':
                //elimina en idioma segun el id recibido
                $sql="DELETE FROM idioma WHERE idioma_id=$id";       
                break;
            case 'Etiqueta':
                //elimina en etiqueta segun el id recibido
                $sql="DELETE FROM etiquetas WHERE etiqueta_id=$id";
                break;
            case 'Tipos':
                //elimina en tipos segun el id recibido
                $sql="DELETE FROM tipo_usuario  WHERE tipoUsuario_id=$id";
                break;
            case 'Nivel':
                //elimina en niveles segun el id recibido
                $sql="DELETE FROM niveles  WHERE niveles_id=$id";
                break;       
            default:
                //opcion defaulta para manejo de error
                echo "No se encontro la opcion";
                break;
        }
        //devuelve la query ejecutada
        return $result=mysqli_query($connection,$sql);
    }

}




?>