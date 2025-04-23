<?php
session_start();
require_once("../logica/connection.php");
require_once("../logica/Postulaciones.php");
require_once("../logica/main.php");

$puede_postular = true;

if (isset($_SESSION['usuario_id'])) {
    $usuario_id = $_SESSION['usuario_id'];
    
    $query = "SELECT tipo_usuario FROM usuarios WHERE usuario_id = $usuario_id";
    $stmt = mysqli_prepare($con, $query);
    mysqli_stmt_bind_param($stmt, "i", $usuario_id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $tipo_usuario);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    if ($tipo_usuario == 'empresa' || $tipo_usuario == 'administrador') {
        $puede_postular = true;
    }
}

$mensaje = "";
if (isset($_GET['mensaje'])) {
    if ($_GET['mensaje'] == "postulacion_exito") {
        $mensaje = "La postulación se realizó con éxito.";
        $mostrar = true;
    } elseif ($_GET['mensaje'] == "postulacion_duplicada") {
        $mensaje = "La postulación ya existe.";
        $mostrar = false;
    }
}


// Verifica si el formulario se envió
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Asegúrate de que las claves existan antes de usarlas
    $postulaciones_titulo = isset($_POST['postulaciones_titulo']) ? $_POST['postulaciones_titulo'] : '';
    $postulaciones_desc = isset($_POST['postulaciones_desc']) ? $_POST['postulaciones_desc'] : '';

    // Procesa las acciones eliminar o actualizar según corresponda
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        if ($action == 'eliminar') {
            // Lógica para eliminar
        } elseif ($action == 'actualizar') {
            // Lógica para actualizar
        }
    }
}

// Verificar si hay postulaciones existentes
$tiene_postulaciones = isset($_SESSION['postulaciones']) && !empty($_SESSION['postulaciones']);
$postulaciones = $tiene_postulaciones ? $_SESSION['postulaciones'] : array();


?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>inicio</title>
  <link rel="stylesheet" href="subir.css">
  <script>
        window.history.forward();
        function noBack() {
            window.history.forward();
        }
    </script>
</head>
<body>
<div class="contenedor">
    <header class="header">
      <nav class="navbar">
        <div class="menu-toggle">
          <label for="toggle" class="label">
            <span>
              <div class="search-container">
                <input type="text" placeholder="buscar alumno...">
                <button class="barcode-btn">
                  <img src="./img/2866321.png" alt="Barcode Icon">
                </button>
              </div>
            </span>
            <span>
              <a href="cambio de usuario.html" class="userbtn">
                <img src="./img/user_icon.png" alt="user Icon">
              </a>
            </span>
            <span>
              <div class="dropdown">
                <button class="dropbtn"><img src="./img/54206.png" alt="menu Icon"></button>
                <div class="dropdown-content">
                  <a href="#">Opción 1</a>
                  <a href="#">Opción 2</a>
                  <a href="#">Opción 3</a>
                </div>
              </div>
            </span>
          </label>
        </div>
      </nav>
    </header>
    <sidebar class="usuario">
      <h2>Empresa</h2>
      <img src="Tu_foto_profesional.jpeg"> <br>
      <p> Nombre de la Empresa </p>
  </sidebar>
  <sidebar class="chat">
    <h2>Notificaciones</h2>
    <div class="chat-item">
      <img src="./img/user_icon.png" alt="user Icon" width="30px">
      <h3 class="title">Alumno (1)</h3>
      <p class="info">Detalles de la notificación 1.</p>
    </div>
    <div class="chat-item">
      <img src="./img/user_icon.png" alt="user Icon" width="30px">
      <h3 class="title">Alumno</h3>
      <p class="info">Detalles de la notificación 2.</p>
    </div>
    <div class="chat-item">
      <img src="./img/user_icon.png" alt="user Icon" width="30px">
      <h3 class="title">Alumno (2)</h3>
      <p class="info">Detalles de la notificación 3.</p>
    </div>
    <div class="chat-item">
      <img src="./img/user_icon.png" alt="user Icon" width="30px">
      <h3 class="title">Alumno (1)</h3>
      <p class="info">Detalles de la notificación 4.</p>
    </div>
  </sidebar>    
  <div class="postulacion">
    <h2>Ofertas de trabajo</h2>
    <div class="post">
        <div class="item" onclick="openModal()">
            <img src="./img/user_icon.png" alt="user Icon" width="25px">
            <h3>Agregar oferta de trabajo</h3><br>
            <p>Fecha actual</p>
        </div>
    </div>
    <div class="post">
        <div class="item" onclick="toggleInfo(this)">
            <img src="./img/user_icon.png" alt="user Icon" width="25px">
            <h3>Empresa 1</h3>
            <p>2/05/23</p>
        </div>
        <div class="info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed purus sit amet dolor pharetra pellentesque vel vitae neque. Mauris vestibulum risus et convallis imperdiet. Integer interdum varius massa quis tempor. Nunc facilisis dignissim dignissim. Aliquam a faucibus lectus. Duis libero diam, interdum at egestas in, posuere eu massa. Vestibulum lacus nibh, molestie nec mi id, aliquet tincidunt eros.</p>
        </div>
    </div>
    <div class="post">
        <div class="item" onclick="toggleInfo(this)">
            <img src="./img/user_icon.png" alt="user Icon" width="25px">
            <h3>Empresa 2</h3>
            <p>24/05/23</p>
        </div>
        <div class="info">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed purus sit amet dolor pharetra pellentesque vel vitae neque. Mauris vestibulum risus et convallis imperdiet. Integer interdum varius massa quis tempor. Nunc facilisis dignissim dignissim. Aliquam a faucibus lectus. Duis libero diam, interdum at egestas in, posuere eu massa. Vestibulum lacus nibh, molestie nec mi id, aliquet tincidunt eros.</p>
        </div>
    </div>
  </div>
<!-- Ventana Modal -->
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
                <body onload="noBack();" onpageshow="if (event.persisted) noBack();" onunload="">
                    <!-- Mostrar el mensaje de éxito -->
                    <?php echo $mensaje; ?>
                    <?php if ($puede_postular): ?>
                        <form method="POST" action="Postulaciones.php">
                            <div class="form-group">
                                <label for="postulacion_creador">Nombre de la Empresa:</label>
                                <input type="text" id="postulacion_creador" name="postulacion_creador" required>
                            </div>
                            <div class="form-group">
                                <label for="postulaciones_titulo">Nombre de la Propuesta:</label>
                                <input type="text" id="postulaciones_titulo" name="postulaciones_titulo" required>
                            </div>
                            <div class="form-group">
                                <label for="postulaciones_desc">Descripción de la Propuesta de Trabajo:</label>
                                <textarea id="postulaciones_desc" name="postulaciones_desc" rows="4" cols="50" required></textarea>
                            </div>
                            <div class="form-group horizontal-selects">
                                <div>
                                    <label for="postulaciones_estado">Etiquetas:</label>
                                    <select id="postulaciones_estado" name="postulaciones_estado" required>
                                        <option value="etiqueta1">Etiqueta 1</option>
                                        <option value="etiqueta2">Etiqueta 2</option>
                                        <option value="etiqueta3">Etiqueta 3</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="skillLevel">Nivel de Capacidad:</label>
                                    <select id="skillLevel" name="skillLevel" required>
                                        <option value="basico">Básico</option>
                                        <option value="promedio">Promedio</option>
                                        <option value="superior">Superior</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group horizontal-selects">
                                <div>
                                    <label for="languages">Idiomas:</label>
                                        <select id="languages" name="languages" required>
                                        <option value="espanol">Español</option>
                                        <option value="ingles">Inglés</option>
                                        <option value="frances">Francés</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="languageLevel">Nivel de Capacidad:</label>
                                    <select id="languageLevel" name="languageLevel" required>
                                        <option value="basico">Básico</option>
                                        <option value="promedio">Promedio</option>
                                        <option value="superior">Superior</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit">Agregar Postulación</button>
                        </form>
                    <?php else: ?>
                    <p>No tienes permiso para realizar una postulación.</p>
                    <?php endif; ?>
                    
                    <!-- Mostrar la lista de postulaciones con opciones de eliminar y actualizar -->
                    <?php if ($tiene_postulaciones): ?>
                    <!--<h2>Lista de Postulaciones</h2>-->
                    <ul>
                        <?php foreach ($postulaciones as $postulacion):   ?>
                        <!--<?php
                            /*echo "<pre>";
                            print_r($postulaciones);
                            echo "</pre>";*/
                        ?>-->
                        <li>
                            <strong>Título:</strong> <?php echo $postulacion ['postulaciones_titulo'];?> <br>
                            <strong>Descripción:</strong> <?php echo $postulacion['postulaciones_desc']; ?> <br>
                            <!--<strong>Fecha:</strong> <?php //echo $postulacion['postulaciones_fecha']; ?> <br> -->
                            <!-- Agrega enlaces o botones para eliminar y actualizar cada postulación -->
                            <a href="subir.php?mensaje=postulacion_exito<?php echo $postulacion['postulaciones_id']; ?>">Eliminar</a> 
                            <a href="subir.php?mensaje=postulacion_exito<?php echo $postulacion['postulaciones_id']; ?>">Actualizar</a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                </body>
                
        </div>
    </div>
</div>
<script>
  function toggleInfo(item) {
  var info = item.nextElementSibling;
  if (info.style.display === "block") {
      info.style.display = "none";
  } else {
      info.style.display = "block";
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const titles = document.querySelectorAll(".chat-item h3.title");

  titles.forEach(title => {
      title.addEventListener("click", function() {
          const parent = this.parentElement;
          parent.classList.toggle("active");
      });
  });
});
    // Función para alternar la visibilidad de la información
    function toggleInfo(item) {
        var info = item.nextElementSibling;
        if (info.style.display === "block") {
            info.style.display = "none";
        } else {
            info.style.display = "block";
        }
    }
    // Función para abrir la ventana modal
    function openModal() {
        document.getElementById("myModal").style.display = "block";
    }
    // Función para cerrar la ventana modal
    function closeModal() {
        document.getElementById("myModal").style.display = "none";
    }
    // Cerrar la ventana modal cuando el usuario hace clic fuera de ella
    window.onclick = function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
</script>
</body>
</html>