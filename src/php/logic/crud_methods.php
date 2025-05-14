<?php
//crea la clase metodos
//Nombre anterior del archivos: metodoscrud.php

//Nombre anterior de la clase: methods
class methods{
    //Nombre anterior de la función: mostrardata
    public function show_Data($sql){
        global $connection;
        require_once("connect_to_database.php");
        $result= $connection->query($sql);
        $data= $result->fetch_all(MYSQLI_ASSOC);
        $result->free_result();
        return $data;
    }
    
    //Nombre anterior de la función: insertardata
    public function insert_Data($data, $option){
        global $connection;
        require_once("connect_to_database.php");
        // depende de la option en el switch la consulta sera diferente
        switch ($option){
            case 'languages':
                // si es = a languages insertara data[0] que es el nombre
                $sql="INSERT INTO languages(`name`) VALUES ('$data[0]')";     
                break;
            case 'tags':
                // si es = a etiqueta insertara data[0] que es el nombre
                $sql="INSERT INTO tags(`name`) VALUES ('$data[0]')";
                break;
            case 'user_types':
                // si es = a tipos insertara data[0] que es el nombre
                $sql="INSERT INTO user_types(`name`) VALUES ('$data[0]')";
                break;
            case 'levels':
                // si es = a nivel insertara data[0] que es el nombre
                $sql="INSERT INTO levels(`name`) VALUES ('$data[0]')";
                break;
            case 'reviews':
                // si es = a nivel insertara data[0] que es el nombre
                $sql="INSERT INTO reviews VALUES ('','$data[0]','$data[1]')";
                break;        
            default:
                //option default por si llega a haber un error
                echo "No se encontro la option";
            break;
        }

        //devuelve la query ejecutada
        return $result=mysqli_query($connection, $sql);
    }
    // Nombre anterior de la función: ActualizarDatos
    public function update_Data($data, $option){
        global $connection;
        require_once("connect_to_database.php");
        //utiliza la conexion
        //dependiendo del valor la consulta sera diferente
        switch ($option) {
            case 'languages':
                // cambia el nombre del languages por el actual ingresado data[0] hace comprobacion de id
                $sql="UPDATE languages SET name='$data[0]' WHERE id='$data[1]'";       
                break;
            case 'tags':
                // cambia el nombre de la etiqueta por el actual ingresado data[0] hace comprobacion de id
                $sql="UPDATE tags SET name='$data[0]' WHERE id='$data[1]'";
                break;
            case 'user_types':
                // cambia el nombre del tipo por el actual ingresado data[0] hace comprobacion de id
                $sql="UPDATE user_types SET name='$data[0]' WHERE id='$data[1]'";
                break;
            case 'levels':
                // cambia el nombre del nivel por el actual ingresado data[0] hace comprobacion de id
                $sql="UPDATE levels SET name='$data[0]' WHERE id='$data[1]'";
                break;    
            default:
                // option default para los errores
                echo "No se encontro la option";
                break;
        }
        // devuelve la query ejecutada
        return $result=mysqli_query($connection,$sql);
    }
    //Nombre anterior de la función: eliminardatos
    public function delete_Data($id,$option){
        global $connection;
        require_once("connect_to_database.php");
        //utiliza la conexion
        //segun la option la query sera distinta
        switch ($option) {
            case 'languages':
                //elimina en languages segun el id recibido
                $sql="DELETE FROM languages WHERE id=$id";       
                break;
            case 'tags':
                //elimina en etiqueta segun el id recibido
                $sql="DELETE FROM tags WHERE id=$id";
                break;
            case 'user_types':
                //elimina en tipos segun el id recibido
                $sql="DELETE FROM user_types  WHERE id=$id";
                break;
            case 'levels':
                //elimina en levels segun el id recibido
                $sql="DELETE FROM levels  WHERE id=$id";
                break;       
            default:
                //option defaulta para manejo de error
                echo "No se encontro la option";
                break;
        }
        //devuelve la query ejecutada
        return $result=mysqli_query($connection,$sql);
    }

}

?>