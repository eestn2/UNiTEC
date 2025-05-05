<?php
//Nombre original: index-e.php
date_default_timezone_set('America/Argentina/Buenos_Aires');
require "./Logic_Backend/connect_to_database.php";
require "./Logic_Backend/UserServiceManager.php";
session_start();

if (!isset($_SESSION['email'])) {
    header('Location:./Logic_Backend/logout.php');
    exit();
}

$email = $_SESSION['email'];
$user = "SELECT * FROM users INNER JOIN user_types ON users.user_rol = user_types.rol_id WHERE users.user_email='$email' AND users.user_rol=1";
$userResult = $connection->query($user);

$person = null; // Inicializa la variable

if ($userResult && mysqli_num_rows($userResult) > 0) {
    while ($row = mysqli_fetch_array($userResult)) {
        $person = new user_create($row['user_id'], $row['user_name'], $row['user_age'], $row['user_location'], $row['user_email'], $row['user_password'], $row['user_description'], $row['user_last_update_date'], $row['user_profile_picture'], $row['user_portfolio'], $row['user_is_enabled'], $row['role_name'], $row['user_status']);
    }

    if ($person) {
        $_SESSION['user_id'] = $person->getId();
        $id = $person->getId();
        $userTagsQuery = "SELECT * FROM user_tags INNER JOIN tag_labels ON user_tags.tag_id = tag_labels.tag_id WHERE user_id = $id";
        $userTagsResult = $connection->query($userTagsQuery);

        $userChatsQuery = "SELECT * FROM sent_messages INNER JOIN users ON sent_messages.sender_id = users.user_id WHERE receiver_id = $id ORDER BY sent_messages.mail_id DESC";
        $resultChats = $connection->query($userChatsQuery);

        $applications = "SELECT * FROM applications WHERE application_creator=$id ORDER BY applications.applications_id DESC";
        $$jobApplicationsResult = $connection->query($applications);
    } else {
        header("Location:./user_dashboard.php");
        exit();
    }
} else {
    header("Location:./user_dashboard.php");
    exit();
}

if (date('Y-m-d') >= date('Y-m-d', strtotime($person->getUser_last_update_date() . '+ 3 months'))) { ?>
    <script type="module">
        import { SendMail } from "./scripts/date_update.js";
        SendMail("<?php echo $_SESSION['email']; ?>");
    </script>
<?php } ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <title>inicio</title>
    <link rel="stylesheet" href="./estilos/index.css">
    <link rel="stylesheet" href="./estilos/estilo_footer.css">
    <link rel="icon" href="./imgs/logo_blanco.ico">
</head>
<body>
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
</script>
<div class="contenedor">
    <header class="header">
      <nav class="navbar">
          <div class="menu-toggle">
              <label for="toggle" class="label">
                  <span>
                      <div class="dropdown">
                          <button class="dropbtn"><img style="width:27px; height:27px;"
                                  src="./imgs/user_icon.png" alt="user Icon"></button>
                          <div class="dropdown-content">
                              <a href="./vistas/edit-perfil-e.php">Editar Perfil</a>
                              <a href="./Logic_Backend/logout.php">Cerrar Sesion</a>
                          </div>
                      </div>
                  </span>
                  <span>
                      <div class="dropdown">
                          <button class="dropbtn"><img style="width:24px; height:24px;"
                                  src="./imgs/54206.png" alt="menu Icon"></button>
                          <div class="dropdown-content">
                              <a href="../company_dashboard.php">Inicio</a>
                          </div>
                      </div>
                  </span>
              </label>
          </div>
      </nav>
    </header>
    <sidebar class="usuario">
        <h2><?php echo $person->getRole_name(); ?></h2>
        <img style="width:80px; height:80px; border-radius: 50%;" id="img-p" src="">
        <br>
        <p><?php echo $person->getUser_name(); ?></p>
        <ul class="eti">
            <?php while ($row = mysqli_fetch_array($userTagsResult)) { ?>
                <li><a class="tag_labels"><?php echo $row['etiqueta_nombre']; ?></a></li>
            <?php } ?>
        </ul>
    </sidebar>
    <sidebar class="chat">
        <h2>Notificaciones</h2>
        <div style="overflow: hidden; overflow-y: auto; max-height:275px; padding:10px;">
        <?php 
            while($row = mysqli_fetch_array($resultChats)) {
                $originalDateTime = new DateTime($row['mail_fechaEmision']);
                $adjustedDateTime = $originalDateTime->sub(new DateInterval('PT3H'));
                $formattedDateTime = $adjustedDateTime->format('Y-m-d H:i');
            ?>
                <div class="chat-item">
                    <img src="./imgs/user_icon.png" alt="user Icon" width="30px">
                    <h3 class="title"><?php echo htmlspecialchars($row['user_name']); ?></h3>
                    <p><?php echo htmlspecialchars($formattedDateTime); ?></p>
                    <p class="info"><?php echo htmlspecialchars($row['mail_asunto']); ?></p>
                    <p class="info"><?php echo htmlspecialchars($row['mail_mensaje']); ?></p>
                </div>  
            <?php } ?>
        </div>
    </sidebar>

    <div class="postulacion">
        <h2>Ofertas de trabajo</h2>
        <div style="overflow: hidden; overflow-y: auto; padding:10px;">
            <div class="post">
                        <div class="item" onclick="toggleInfo(this)">
                            <img src="./imgs/user_icon.png" alt="user Icon" width="25px">
                            <h3>Agregar oferta de trabajo</h3>
                        </div>
                        <div class="info">
                            <form method="POST" action="./Logic_Backend/applications.php">
                                <div class="form-group">
                                    <input type="number" id="creador" hidden="" value="<?php echo $id ?>" name="application_creator" required>
                                </div>
                                <div class="form-group">
                                    <label for="applications_titulo">Titulo:</label>
                                    <input type="text" id="titulo" name="applications_titulo" required>
                                </div>
                                <div class="form-group">
                                    <label for="applications_desc">Descripción:</label>
                                    <textarea id="desc" name="applications_desc" rows="4" cols="50" required></textarea>
                                </div>
                                <input type="hidden" name="action" value="ingresar">
                                <input class="bot1" type="submit">
                        </form>
                        </div>
            </div>            
            <?php while ($row = mysqli_fetch_array($$jobApplicationsResult)) {
                $originalDateTime = new DateTime($row['applications_fecha']);
                $adjustedDateTime = $originalDateTime->sub(new DateInterval('PT3H'));
                $formattedDateTime = $adjustedDateTime->format('Y-m-d H:i');
                if ($row['applications_estado'] == 1) { ?>
                    <div class="post">
                        <div class="item" onclick="toggleInfo(this)">
                            <img src="./imgs/user_icon.png" alt="user Icon" width="25px">
                            <h3><?php echo $row['applications_titulo']; ?></h3>
                            <p><?php echo $formattedDateTime ?></p>
                        </div>
                        <div class="info">
                            <p><?php echo $row['applications_desc']; ?></p>
                            <ul class="eti">
                                <?php
                                $posId = $row['applications_id'];
                                $posteti = "SELECT * FROM post_etiqueta p INNER JOIN tag_labels e ON p.tag_id = e.tag_id WHERE p.postulacion_id = $posId";
                                $ejeeti = $connection->query($posteti);
                                while ($row2 = mysqli_fetch_array($ejeeti)) { ?>
                                    <li>
                                        <a class="tag_labels"><?php echo $row2['etiqueta_nombre']; ?></a>
                                    </li>
                                <?php } ?>
                            </ul>
                            <br>
                            <a class="bot1" href="./vistas/listapostulados.php?postulacion=<?php echo $posId; ?>">Ver postulados</a>
                            <form method="POST" action="./Logic_Backend/applications.php">
                                <input type="number" name="applications_id" hidden="" value="<?php echo $posId; ?>">
                                <input type="text" value="eliminar" hidden="" name="action">
                                <input type="submit" class="bot1" value="Eliminar postulación">
                            </form>
                        </div>
                    </div>
                <?php }
            } ?>
        </div>
    </div>
</div>
<?php
include('./vistas/footer.html');

if (empty($person->getUser_profile_picture())) { ?>
    <script>
        document.getElementById('img-p').src = '../imgs/img_u/user.jpg';
    </script>
<?php } else { ?>
    <script>
        document.getElementById('img-p').src = '<?php echo $person->getUser_profile_picture(); ?>';
    </script>
<?php } ?>
</body>
</html>
