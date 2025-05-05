<?php

//Nombre original: index.php
//Edición en proceso...
date_default_timezone_set('America/Argentina/Buenos_Aires');
require("./Logic_Backend/connect_to_database.php");
require("./Logic_Backend/UserServiceManager.php");
session_start();

if(!isset($_SESSION['email'])) {
    header('Location:./Logic_Backend/logout.php');
    exit();
}

$email=$_SESSION['email'];
$user = "SELECT * FROM users INNER JOIN user_types ON users.user_rol = user_types.rol_id WHERE users.user_email='$email' AND users.user_rol!=1";
$userResult = $connection->query($user);

$person = null; // Inicializar la variable

if ($userResult && mysqli_num_rows($userResult) > 0) {
    while ($row = mysqli_fetch_array($userResult)) {
        $person = new user_create($row['user_id'], $row['user_name'], $row['user_age'], $row['user_location'], $row['user_email'], $row['user_password'], $row['user_description'], $row['user_last_update_date'], $row['user_profile_picture'], $row['user_portfolio'], $row['user_is_enabled'], $row['role_name'], $row['user_status']);
    }

    if ($person) {
        $id = $person->getId();
        $userTagsQuery = "SELECT * FROM user_tags INNER JOIN tag_labels ON user_tags.tag_id = tag_labels.tag_id WHERE user_id = $id";
        $userTagsResult = $connection->query($userTagsQuery);

        $userChatsQuery = "SELECT * FROM sent_messages INNER JOIN users ON sent_messages.sender_id = users.user_id WHERE receiver_id = $id ORDER BY sent_messages.message_id DESC";
        $userChatsResult = $connection->query($userChatsQuery);

        $applications = "SELECT * FROM applications INNER JOIN users ON applications.applicant_id = users.user_id ORDER BY applications.application_id DESC";
        $jobApplicationsResult = $connection->query($applications);
    } else {
        // Redirigir si no se encuentra a la person
        header("Location:./index-label.php");
        exit();
    }
} else {
    // Redirigir si la consulta no devuelve resultados
    header("Location:./index-label.php");
    exit();
}

if(date('Y-m-d') >= date('Y-m-d', strtotime($person->getUser_last_update_date() . '+ 3 months'))){?>
  <script type="module">
    import { SendMail } from "./scripts/date_update.js"
    SendMail("<?php echo $_SESSION['email']; ?>")
  </script>
<?php }?>
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
    console.log(info)
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
                              <a href="./vistas/edit-perfil-u.php">Editar Perfil</a>
                              <a href="./Logic_Backend/logout.php">Cerrar Sesion</a>
                          </div>
                      </div>
                  </span>
                  <span>
                      <div class="dropdown">
                          <button class="dropbtn"><img style="width:24px; height:24px;"
                                  src="./imgs/54206.png" alt="menu Icon"></button>
                          <div class="dropdown-content">
                              <a href="./user_dashboard.php">Inicio</a>
                          </div>
                      </div>
                  </span>
              </label>
          </div>
      </nav>
    </header>
    <sidebar class="usuario">
        <h2><?php echo $person->getRole_name(); ?></h2>
        <img style="width:80px; height:80px; border-radius: 50%;" id="img-appTag" src="">
        <br>
        <appTag> <?php echo $person->getUser_name(); ?> </appTag>
        <ul class="eti">
            <?php while($row=mysqli_fetch_array($userTagsResult)){ ?>
              <li><a class="tag_labels"><?php echo $row['tag_name']; ?> </a></li>
            <?php } ?>
        </ul>
    </sidebar>
    <sidebar class="chat">
      <h2>Notificaciones</h2>
      <?php while($row=mysqli_fetch_array($userChatsResult)){ ?>
        <div class="chat-item">
          <img src="./imgs/user_icon.png" alt="user Icon" width="30px">
          <h3 class="title"><?php echo $row['user_name']; ?></h3>
          <appTag><?php echo $row['mailSentAt']; ?></appTag>
          <appTag class="info"><?php echo $row['mailSubject']; ?> </appTag>
          <appTag class="info"><?php echo $row['mailMessage']; ?></appTag>
        </div>  
      <?php } ?>
    </sidebar>    
    <div class="postulacion">
      <h2>Ofertas de trabajo</h2>
      <?php while($row=mysqli_fetch_array($jobApplicationsResult)){ 
                        if($row['applicationStatus']==1){?>
                          <div class="post">
                            <div class="item" onclick="toggleInfo(this)">
                              <img src="./imgs/user_icon.png" alt="user Icon" width="25px"> 
                              <h3><?php echo $row['applicationTitle']; ?></h3>
                              <appTag><?php echo $row['applicationDate']; ?></appTag>
                            </div>
                          <div class="info">
                            <appTag><?php echo $row['user_name']; ?></appTag>
                            <appTag><?php echo $row['application_description']; ?></appTag>
                            <ul clas="eti">
                              <?php
                              $applicationId=$row['application_id'];
                              $postTagsQuery="SELECT * FROM application_labels appTag INNER JOIN tag_labels label ON appTag.tag_id = label.tag_id WHERE appTag.application_id = $applicationId  ";
                              $postTagsResult=$connection->query($postTagsQuery); 
                              while($row2=mysqli_fetch_array($postTagsResult)){?>
                                  <li>
                                      <a class="tag_labels"><?php echo $row2['tag_name']; ?></a>
                                  </li>      
                                      <?php };?>
                            </ul>
                            <br>
                            <?php
                            $applicantCountQuery  = "SELECT COUNT(*) as total FROM applications WHERE application_id=$applicationId AND user_id=$id";
                            $applicantCountResult = $connection->query($applicantCountQuery );
                            $row = mysqli_fetch_assoc($applicantCountResult);
                            $count = $row['total'];
                            if ($count <= 0) { ?>
                                <a class="bot1" href="./Logic_Backend/process_application.php?postulacion=<?php echo $applicationId; ?>&postulado=<?php echo $person->getId(); ?>">Postularse</a>
                            <?php } else { ?>
                                <a class="bot1" href="./Logic_Backend/desprocess_application.php?postulacion=<?php echo $applicationId; ?>&postulado=<?php echo $person->getId(); ?>">Despostularse</a>
                            <?php } ?>
                          </div>
            </div>
              <?php }} ?>
  </div>
</div>
<?php 
include('./vistas/footer.html');

if (empty($person->getUser_profile_picture())) { ?>
    <script>
        document.getElementById('img-appTag').src = '../imgs/img_u/user.jpg';
    </script>
<?php } else { ?>
    <script>
        document.getElementById('img-appTag').src = '<?php echo $person->getUser_profile_picture(); ?>';
    </script>
<?php } ?>
</body>
</html>