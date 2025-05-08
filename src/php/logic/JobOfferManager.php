<?php
//Nombre anterior del archivo: Postulaciones.php

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Se incluye el archivo de conexión a la base de datos
require("./connect_to_database.php");

$dbConnection = $connection;

// Nombre anterior de la clase: Post
class ApplicationManager{

    // Método para verificar si una postulación ya existe en la base de datos
    //Nombre anterior del metodo: PostulacionExiste
    public function doesApplicationExist($dbConnection, $con, $company, $title) {
        // Consulta para contar las postulaciones que coinciden con los parámetros dados
        $sql = "SELECT COUNT(*) as count FROM applications WHERE id = ? AND creator_id = ? AND title = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "is", $company, $title);
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
    //Nombre anterior de el metodo: IngresarPostulaciones
    public function submitApplication($dbConnection, $con, $company, $title, $description) {
        // Recupero los datos del formulario de subir.php
        if (isset($_POST['creator_id'], $_POST['title'], $_POST['description'])) {
            $company = $_POST['creator_id'];
            $title = $_POST['title'];
            $description = $_POST['description'];
        } else {
            echo "Error: Uno o más fields no están definidos en el formulario.";
        }

        // Consulta para insertar una nueva postulación
        $sql = "INSERT INTO applications (creator_id, title, description, status) VALUES (?, ?, ?, 1)";
        $stmt = $con->prepare($sql);

        if ($stmt) {
            // Enlazar los parámetros a la consulta
            $stmt->bind_param("sss", $company, $title, $description);
            
            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Actualizar la sesión con las nuevas postulaciones
                header("Location: ../company_dashboard.php"); // Redirecciona si se inserta correctamente
                exit();
            } else {
                echo "Error al ejecutar la consulta: "  . $stmt->error;
            }
        
            $stmt->close();
        } else {
            echo "Error al preparar la consulta: "  . $con->error;
        }
    }

    // Método para eliminar una postulación de la base de datos
    //Nombre anterior: EliminarPostulacion
    public function removeApplication($dbConnection, $con, $application_id) {
        $sql = "DELETE FROM applications WHERE id = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "i", $application_id);
            if (mysqli_stmt_execute($stmt)) {
                echo "Postulación eliminada correctamente." ; // Mensaje de éxito si se elimina correctamente
            } else {
                echo "Error al ejecutar la consulta: "  . mysqli_stmt_error($stmt);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta: "  . mysqli_error($con);
        }
    }

    // Método para actualizar una postulación en la base de datos
    //Nombre anterior del metodo: ActualizarPropuesta
    public function updateProposal($con, $application_id, $id, $company, $title, $description, $status) {
        // Consulta para actualizar una postulación por su ID
        $sql = "UPDATE applications SET id = ?, creator_id = ?, title = ?, description = ?, status = ? WHERE id = ?";
        $stmt = mysqli_prepare($con, $sql);

        if ($stmt) {
            // Se enlazan los parámetros a la consulta y se ejecuta
            mysqli_stmt_bind_param($stmt, "issssi", $id, $company, $title, $description, $status, $application_id);
            if (mysqli_stmt_execute($stmt)) {
                echo "Postulación actualizada correctamente." ; // Mensaje de éxito si se actualiza correctamente
            } else {
                echo "Error al ejecutar la consulta: " . mysqli_stmt_error($stmt);
            }
            mysqli_stmt_close($stmt);
        } else {
            echo "Error al preparar la consulta: " . mysqli_error($con);
        }
    }

    // Método para verificar si hay alguna postulación en la base de datos
    //Nombre anterior del metodo: ExistePostulacion
    public function applicationExists($dbConnection, $con) {
        // Consulta para contar las postulaciones en la tabla
        $sql = "SELECT COUNT(*) as count FROM applications";
        $result = mysqli_query($con, $sql);
        $row = mysqli_fetch_assoc($result);
        // Devuelve true si hay postulaciones, false si no hay
        return $row['count'] > 0;
    }

    // Método para actualizar la sesión con las nuevas postulaciones
    //Nombre anterior: ActualizarSesionPostulaciones
    private function refreshApplicationsSession($dbConnection, $con, $id) {
        // Consultar y actualizar la sesión con las nuevas postulaciones
        $sql = "SELECT * FROM applications WHERE id = ?";
        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $_SESSION['applications'] = $result->fetch_all(MYSQLI_ASSOC);
        mysqli_stmt_close($stmt);
    }
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Clase para manejar la validación de los fields del formulario
//Nombre anterior de la clase: CamposAvalidate
class ValidationFields{
    public $fields;

    public function __construct() {
        // Definición de los fields a validate con sus expresiones regulares y mensajes de error
        $this->fields = array(
            'creator_id' => array(
                'value' => $_POST['creator_id'] ?? '',
                'regularExpression' => '/^[a-zA-Z0-9\s]+$/',
                'errorMessage' => "El nombre de la company contiene caracteres no permitidos."
            ),
            'title' => array(
                'value' => $_POST['title'] ?? '',
                'regularExpression' => '/^[a-zA-Z0-9\s]+$/',
                'errorMessage' => "El título contiene caracteres no permitidos."
            ),
            'description' => array(
                'value' => $_POST['description'] ?? '',
                'regularExpression' => '/^[a-zA-Z0-9\s]+$/',
                'errorMessage' => "La descripción contiene caracteres no permitidos."
            ),
        );
    }
}

// Clase para validate los fields del formulario
//Nombre anterior de la clase: validate
class InputValidator {
    // Método para validate los fields basándose en la configuración de CamposAvalidate
    //Nombre anterior: validateCampos
    public function validateInputFields($fields) {
        foreach ($fields as $campo => $configuracion) {
            $value = $configuracion['value'];
            $regularExpression = $configuracion['regularExpression'];
            $errorMessage = $configuracion['errorMessage'];

            if (!preg_match($regularExpression, $value)) {
                return $errorMessage;
            }
        }
        return true;
    }
}

// Aquí se procesa el formulario de postulación
if (isset($_POST['action'])) {
    $post = new ApplicationManager();
    $action = $_POST['action'];

    // Se determina la acción a realizar según el value del parámetro 'action'
    switch ($action) {
        case 'ingresar':
            // Se verifican los fields necesarios para ingresar una postulación
            if (isset($_POST['creator_id'], $_POST['title'], $_POST['description'])) {
                $company = $_POST['creator_id'];
                $title = $_POST['title'];
                $description = $_POST['description'];

                $post->submitApplication($dbConnection, $connection, $company, $title, $description);
            }
            break;

        case 'eliminar':
            // Se verifica el campo necesario para eliminar una postulación
            if (isset($_POST['id'])) {
                $application_id = $_POST['id'];
                $post->removeApplication($dbConnection, $connection, $application_id);
                // Redirigir de vuelta a index.php con un mensaje de éxito
                header("Location: ../company_dashboard.php");
                exit();
            }
            break;

        case 'actualizar':
            // Se verifican los fields necesarios para actualizar una postulación
            if (isset($_POST['id'], $_POST['creator_id'], $_POST['title'], $_POST['description'], $_POST['status'])) {
                // Se validan los fields del formulario
                $fieldsToValidate = new ValidationFields();
                $validate = new InputValidator();
                $validationResult = $validate->validateInputFields($fieldsToValidate->fields);

                // Si la validación es correcta, se actualiza la postulación
                //Visual tira error porque pide 7 argumentos, pero solo se le pasan 6, ya que son los únicos que hay
                if ($validationResult === true) {
                    $post->updateProposal(
                        $connection,
                        $_POST['id'],
                        $_POST['creator_id'],
                        $_POST['title'],
                        $_POST['description'],
                        $_POST['status']
                    );
                } else {
                    echo $validationResult ;
                }
            } else {
                echo "Error: Uno o más fields no están definidos en el formulario.";
            }
            // Redirigir de vuelta a index.php con un mensaje de éxito
            header("Location: ../company_dashboard.php");
            exit();
            break;
    }
}

// Consultar todas las postulaciones
$query = "SELECT * FROM applications";
$result = mysqli_query($connection, $query);

if ($result) {
    $postulaciones = array();

    // Recorrer los resultados y almacenarlos en un array asociativo
    while ($row = mysqli_fetch_assoc($result)) {
        $postulacion = array(
            'application_id' => $row['application_id'],
            'title' => $row['title'],
            'description' => $row['description'],
            // Agrega más fields según sea necesario
        );

        // Agregar la postulación al array de postulaciones
        $postulaciones[] = $postulacion;
    }

    // Liberar el resultado de la consulta
    mysqli_free_result($result);

    // Pasar las postulaciones al archivo index.php
    $_SESSION['applications'] = $postulaciones;
} else {
    // Manejar el caso de que no se puedan recuperar las postulaciones
    echo "Error al obtener las postulaciones de la base de datos: " . mysqli_error($connection);
}
?>
