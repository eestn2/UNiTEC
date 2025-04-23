<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Se incluye el archivo de conexión a la base de datos
require("./connection.php");

$pdo = $connection;

// Definición de la clase Post para manejar las operaciones relacionadas con las postulaciones
class Post {

    // Método para verificar si una postulación ya existe en la base de datos
    public function PostulacionExiste($pdo, $con, $empresa, $titulo) {
        // Consulta para contar las postulaciones que coinciden con los parámetros dados
        $sql = "SELECT COUNT(*) as count FROM postulaciones WHERE usuario_id = ? AND postulacion_creador = ? AND postulaciones_titulo = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "is", $empresa, $titulo);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_bind_result($stmt, $count);
            mysqli_stmt_fetch($stmt);
            mysqli_stmt_close($stmt);
            // Se devuelve true si se encuentra alguna postulación, false en caso contrario
            return $count > 0;
        } else {
            echo "Error al preparar la consulta: " . mysqli_error($con);
            return false;
        }
    }

    // Método para ingresar una nueva postulación en la base de datos
    public function IngresarPostulaciones($pdo, $con, $empresa, $titulo, $descripcion) {
        // Recupero los datos del formulario de subir.php
        if (isset($_POST['postulacion_creador'], $_POST['postulaciones_titulo'], $_POST['postulaciones_desc'])) {
            $empresa = $_POST['postulacion_creador'];
            $titulo = $_POST['postulaciones_titulo'];
            $descripcion = $_POST['postulaciones_desc'];
        } else {
            echo "Error: Uno o más campos no están definidos en el formulario.";
        }

        // Consulta para insertar una nueva postulación
        $sql = "INSERT INTO postulaciones (postulacion_creador, postulaciones_titulo, postulaciones_desc, postulaciones_estado) VALUES (?, ?, ?, 1)";
        $stmt = $con->prepare($sql);

        if ($stmt) {
            // Enlazar los parámetros a la consulta
            $stmt->bind_param("sss", $empresa, $titulo, $descripcion);
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Actualizar la sesión con las nuevas postulaciones
                header("Location: ../index-e.php"); // Redirecciona si se inserta correctamente
                exit();
            } else {
                echo "Error al ejecutar la consulta: " . $stmt->error;
            }
        
            $stmt->close();
        } else {
            echo "Error al preparar la consulta: " . $con->error;
        }
    }

    // Método para eliminar una postulación de la base de datos
    public function EliminarPostulacion($pdo, $con, $postulaciones_id) {
        $sql = "DELETE FROM postulaciones WHERE postulaciones_id = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "i", $postulaciones_id);
            if (mysqli_stmt_execute($stmt)) {
                echo "Postulación eliminada correctamente."; // Mensaje de éxito si se elimina correctamente
            } else {
                echo "Error al ejecutar la consulta: " . mysqli_stmt_error($stmt);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta: " . mysqli_error($con);
        }
    }

    // Método para actualizar una postulación en la base de datos
    public function ActualizarPropuesta($con, $postulaciones_id, $usuario_id, $empresa, $titulo, $descripcion, $estado) {
        // Consulta para actualizar una postulación por su ID
        $sql = "UPDATE postulaciones SET usuario_id = ?, postulacion_creador = ?, postulaciones_titulo = ?, postulaciones_desc = ?, postulaciones_estado = ? WHERE postulaciones_id = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "issssi", $usuario_id, $empresa, $titulo, $descripcion, $estado, $postulaciones_id);
            if (mysqli_stmt_execute($stmt)) {
                echo "Postulación actualizada correctamente."; // Mensaje de éxito si se actualiza correctamente
            } else {
                echo "Error al ejecutar la consulta: " . mysqli_stmt_error($stmt);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta: " . mysqli_error($con);
        }
    }

    // Método para verificar si hay alguna postulación en la base de datos
    public function ExistePostulacion($pdo, $con) {
        // Consulta para contar las postulaciones en la tabla
        $sql = "SELECT COUNT(*) as count FROM postulaciones";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_assoc($result);
        // Devuelve true si hay postulaciones, false si no hay
        return $row['count'] > 0;
    }

    // Método para actualizar la sesión con las nuevas postulaciones
    private function ActualizarSesionPostulaciones($pdo, $con, $usuario_id) {
        // Consultar y actualizar la sesión con las nuevas postulaciones
        $sql = "SELECT * FROM postulaciones WHERE usuario_id = ?";
        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "i", $usuario_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $_SESSION['postulaciones'] = $result->fetch_all(MYSQLI_ASSOC);
        mysqli_stmt_close($stmt);
    }
}

// Clase para manejar la validación de los campos del formulario
class CamposAValidar {
    public $campos;

    public function __construct() {
        // Definición de los campos a validar con sus expresiones regulares y mensajes de error
        $this->campos = array(
            'postulacion_creador' => array(
                'valor' => $_POST['postulacion_creador'] ?? '',
                'expresionRegular' => '/^[a-zA-Z0-9\s]+$/',
                'mensajeError' => "El nombre de la empresa contiene caracteres no permitidos."
            ),
            'postulaciones_titulo' => array(
                'valor' => $_POST['postulaciones_titulo'] ?? '',
                'expresionRegular' => '/^[a-zA-Z0-9\s]+$/',
                'mensajeError' => "El título contiene caracteres no permitidos."
            ),
            'postulaciones_desc' => array(
                'valor' => $_POST['postulaciones_desc'] ?? '',
                'expresionRegular' => '/^[a-zA-Z0-9\s]+$/',
                'mensajeError' => "La descripción contiene caracteres no permitidos."
            ),
        );
    }
}

// Clase para validar los campos del formulario
class Validar {
    // Método para validar los campos basándose en la configuración de CamposAValidar
    public function ValidarCampos($campos) {
        foreach ($campos as $campo => $configuracion) {
            $valor = $configuracion['valor'];
            $expresionRegular = $configuracion['expresionRegular'];
            $mensajeError = $configuracion['mensajeError'];

            if (!preg_match($expresionRegular, $valor)) {
                return $mensajeError;
            }
        }
        return true;
    }
}

// Aquí se procesa el formulario de postulación
if (isset($_POST['action'])) {
    $post = new Post();
    $action = $_POST['action'];

    // Se determina la acción a realizar según el valor del parámetro 'action'
    switch ($action) {
        case 'ingresar':
            // Se verifican los campos necesarios para ingresar una postulación
            if (isset($_POST['postulacion_creador'], $_POST['postulaciones_titulo'], $_POST['postulaciones_desc'])) {
                $empresa = $_POST['postulacion_creador'];
                $titulo = $_POST['postulaciones_titulo'];
                $descripcion = $_POST['postulaciones_desc'];

                $post->IngresarPostulaciones($pdo, $connection, $empresa, $titulo, $descripcion);
            }
            break;

        case 'eliminar':
            // Se verifica el campo necesario para eliminar una postulación
            if (isset($_POST['postulaciones_id'])) {
                $postulaciones_id = $_POST['postulaciones_id'];
                $post->EliminarPostulacion($pdo, $connection, $postulaciones_id);
                // Redirigir de vuelta a index.php con un mensaje de éxito
                header("Location: ../index-e.php");
                exit();
            }
            break;

        case 'actualizar':
            // Se verifican los campos necesarios para actualizar una postulación
            if (isset($_POST['usuario_id'], $_POST['postulaciones_id'], $_POST['postulacion_creador'], $_POST['postulaciones_titulo'], $_POST['postulaciones_desc'], $_POST['postulaciones_estado'])) {
                // Se validan los campos del formulario
                $camposValidar = new CamposAValidar();
                $validar = new Validar();
                $resultadoValidacion = $validar->ValidarCampos($camposValidar->campos);

                // Si la validación es correcta, se actualiza la postulación
                if ($resultadoValidacion === true) {
                    $post->ActualizarPropuesta(
                        $connection,
                        $_POST['postulaciones_id'],
                        $_POST['usuario_id'],
                        $_POST['postulacion_creador'],
                        $_POST['postulaciones_titulo'],
                        $_POST['postulaciones_desc'],
                        $_POST['postulaciones_estado']
                    );
                } else {
                    echo $resultadoValidacion;
                }
            } else {
                echo "Error: Uno o más campos no están definidos en el formulario.";
            }
            // Redirigir de vuelta a index.php con un mensaje de éxito
            header("Location: ../index-e.php");
            exit();
    }
}

// Consultar todas las postulaciones
$query = "SELECT * FROM postulaciones";
$result = mysqli_query($connection, $query);

if ($result) {
    $postulaciones = array();

    // Recorrer los resultados y almacenarlos en un array asociativo
    while ($row = mysqli_fetch_assoc($result)) {
        $postulacion = array(
            'postulaciones_id' => $row['postulaciones_id'],
            'postulaciones_titulo' => $row['postulaciones_titulo'],
            'postulaciones_desc' => $row['postulaciones_desc'],
            // Agrega más campos según sea necesario
        );

        // Agregar la postulación al array de postulaciones
        $postulaciones[] = $postulacion;
    }

    // Liberar el resultado de la consulta
    mysqli_free_result($result);

    // Pasar las postulaciones al archivo index.php
    $_SESSION['postulaciones'] = $postulaciones;
} else {
    // Manejar el caso de que no se puedan recuperar las postulaciones
    echo "Error al obtener las postulaciones de la base de datos: " . mysqli_error($connection);
}
?>
