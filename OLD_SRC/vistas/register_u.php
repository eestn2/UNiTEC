<?php

require('../Logic_Backend/connect_to_database.php');
require('../Logic_Backend/encryption_keys.php');

date_default_timezone_set('America/Argentina/Buenos_Aires');

$show_languages = "SELECT * FROM `languages`";
$show_labels = "SELECT * FROM `tags`";
$show_users = "SELECT * FROM `user_types`";
$show_state = "SELECT * FROM `statuses`";

$query_languages = $connection->query($show_languages);
$query_labels = $connection->query($show_labels);
$query_users = $connection->query($show_users);
$query_state = $connection->query($show_state);

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse</title>
    <link rel="stylesheet" href="../estilos/registro.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body class="reg">
    <div class="logo"></div>
    <section class="container">
        <form action="../Logic_Backend/UserServiceManager.php" method="POST" onSubmit="SendArrays();" class="form-box">
            <h1>Registro del usuario</h1>
            <input type="text" class="input-box" placeholder="Nombre y apellido" name="user_name" required>
            <input type="email" class="input-box" placeholder="Correo electrónico" name="user_email" required>
            <input type="password" class="input-box" placeholder="Contraseña" name="user_password" required> 
            <span>
                <label for="user_age">Fecha de nacimiento: </label>
                <input type="date" class="input-box" name="user_age" required>
            </span>
            <input type="text" class="input-box" placeholder="Localidad" name="user_location" required>
            <input type="text" class="input-box" id="portfolio" placeholder="Link de su portfolio (Opcional)" name="user_portfolio">
            <textarea name="user_description" class="input-box" cols="30" rows="3" placeholder="Descripción suya" required></textarea>

            <input type="hidden" name="redirect_url" value="../vistas/register_u.php">
            <input type="hidden" name="user_date" value="<?php echo date('Y-m-d'); ?>">
            <input type="hidden" name="user_is_enabled" value="false">
            <input type="hidden" name="action" value="1">
            <input type="hidden" name="arrayPHPLanguages" id="arrayPHPLanguages" value="a">
            <input type="hidden" name="arrayPHPLabels" id="arrayPHPLabels" value="a">
            <input type="hidden" name="arrayPHPLevelsLanguages" id="arrayPHPLevelsLanguages" value="a"> 
            <input type="hidden" name="arrayPHPLevelsLabels" id="arrayPHPLevelsLabels" value="a"> 
            <center>
        <div class="checkboxes">
            <div class="checkbox-group">
            <select id="idiomas" class="input-box" required>
                <option value="">Idiomas</option>
                <?php
                    while($array = mysqli_fetch_assoc($query_languages)){ ?>
                            <option value="<?php echo $array['id']; ?>"><?php echo $array['name']; ?></option>    
                <?php } ?>
            </select>
            <div class="checkbox-group">
                <input type="checkbox" class="cboxI" value="1"><label for="">Básico</label>
                <input type="checkbox" class="cboxI" value="2"><label for="">Intermedio</label>
                <input type="checkbox" class="cboxI" value="3"><label for="">Avanzado</label> 
            </div>
        </div>
        <div class="checkboxes">
            <div class="checkbox-group">
            <select id="etiquetas" class="input-box" required>
                <option value="">Etiquetas</option>
                <?php
                    while($array = mysqli_fetch_assoc($query_labels)){ ?>
                            <option value="<?php echo $array['id']; ?>"><?php echo $array['name']; ?></option>
                <?php } ?>
            </select>
            <div class="checkbox-group">
            <input type="checkbox" class="cboxE" value="1"><label for="">Básico</label>
            <input type="checkbox" class="cboxE" value="2"><label for="">Intermedio</label>
            <input type="checkbox" class="cboxE" value="3"><label for="">Avanzado</label> 
        </div>
    </div>
    </center>
    <div class="checkboxes">
            <select id="user_type" name="user_type" class="input-box" required>
                <option value="">Tipos de usuario</option>
                <?php
                    while($array = mysqli_fetch_assoc($query_users)){ 
                        if($array['name'] != "Empresa" && $array['name'] != "Administrador") {?>
                            <option value="<?php echo $array['id']; ?>"><?php echo $array['name']; ?></option>
                <?php } }?>
            </select>
            <select id="user_status" name="user_status" class="input-box" required>
                <option value="">Estados</option>
                <?php
                    while($array = mysqli_fetch_assoc($query_state)){ ?>
                            <option value="<?php echo $array['id']; ?>"><?php echo $array['name']; ?></option>
                <?php } ?>
            </select>
        </div>
            <center>
                <input type="submit" class="btn" id="btn-reg" value="Registrarse" disabled>
                <p><a href="../vistas/register_e.php" class="UsuaerioLink">Registrarse como empresa</a></p>
                <p>¿Ya tienes una cuenta? <a href="login.php">Inicia sesión</a></p>
                <button onclick="limpiarEtiquetas();">
                    Limpiar etiquetas
                </button>

                <button onclick="limpiarIdiomas();">
                    Limpiar idiomas
                </button>
            </center>

            <div id="div-idiomas"></div>
            <div id="div-etiquetas"></div>
        </form>
    </section>          

    <script>
        let cboxesE = [...document.querySelectorAll('.cboxE')];
        let cboxesI = [...document.querySelectorAll('.cboxI')];

        let inputs = document.querySelectorAll('input:not(#portfolio)');

        let btn_reg = document.getElementById('btn-reg');

        let div_languages = document.getElementById('div-idiomas');
        let div_labels = document.getElementById('div-etiquetas');

        let languages = document.getElementById('idiomas');
        let labels = document.getElementById('etiquetas');
        let states = document.getElementById('estado');
        let type_user = document.getElementById('user_types');

        let array_languages = [];
        let text_languages = [];

        let array_labels = [];
        let text_labels = [];

        let array_levels_e = [];
        let text_levels_e = [];

        let array_levels_i = [];
        let text_levels_i = [];

        function removeUrlParams() {
            const url = new URL(window.location.href);

            url.searchParams.delete('msg');

            window.history.replaceState({}, document.title, url.toString());
        }

        if(labels.options[labels.selectedIndex].text == 'Etiquetas'){
            cboxesE.forEach(cb => {
                cb.disabled = true;
            });
        }

        if(languages.options[languages.selectedIndex].text == 'Idiomas'){
            cboxesI.forEach(cb => {
                cb.disabled = true;
            });
        }

        cboxesE.forEach(e => {
            e.addEventListener('change', () => {
                if(e.checked == true){
                    if(!array_labels.includes(labels.value)){
                        array_labels.push(labels.value);
                        array_levels_e.push(e.value);                
                    }

                    if(!text_labels.includes(labels.options[labels.selectedIndex].text) && labels.options[labels.selectedIndex].text != 'Etiquetas'){
                        text_labels.push(labels.options[labels.selectedIndex].text);

                        switch(e.value){
                            case "1":
                                text_levels_e.push("Básico");
                                break;
                            case "2":
                                text_levels_e.push("Intermedio");
                                break;
                            case "3":
                                text_levels_e.push("Avanzado");
                                break;
                        }
                    }   

                    div_labels.innerHTML = '';

                    if(text_labels.length != 0){ 
                        for(let i = 0; i < text_labels.length; i++){
                            const span = document.createElement('span');
                            span.textContent = text_labels[i] + ' - ' + text_levels_e[i] + ' ';
                            div_labels.appendChild(span);
                        }
                    }

                    setTimeout(() => {
                        e.checked = false;

                        cboxesE.forEach(cb => {
                            cb.disabled = true;
                        });
                    }, 500);
                }
            });
        });

        labels.addEventListener('change', () => {
            if(text_labels.includes(labels.options[labels.selectedIndex].text) || labels.options[labels.selectedIndex].text == 'Etiquetas'){
                cboxesE.forEach(cb => {
                    cb.disabled = true;
                });
            } else {
                cboxesE.forEach(cb => {
                    cb.disabled = false;
                });
            }   
        });

        cboxesI.forEach(e => {
            e.addEventListener('change', () => {
                if(e.checked == true){
                    if(!array_languages.includes(languages.value)){
                        array_languages.push(languages.value);
                        array_levels_i.push(e.value);                
                    }

                    if(!text_languages.includes(languages.options[languages.selectedIndex].text) && languages.options[languages.selectedIndex].text != 'Idiomas'){
                        text_languages.push(languages.options[languages.selectedIndex].text);

                        switch(e.value){
                            case "1":
                                text_levels_i.push("Básico");
                                break;
                            case "2":
                                text_levels_i.push("Intermedio");
                                break;
                            case "3":
                                text_levels_i.push("Avanzado");
                                break;
                        }
                    }

                    div_languages.innerHTML = '';

                    if(text_languages.length != 0){ 
                        for(let i = 0; i < text_languages.length; i++){
                            const span = document.createElement('span');
                            span.textContent = text_languages[i] + ' - ' + text_levels_i[i] + ' ';
                            div_languages.appendChild(span);
                        }
                    }

                    setTimeout(() => {
                        e.checked = false;

                        cboxesI.forEach(cb => {
                            cb.disabled = true;
                        });
                    }, 500);
                }
            });
        });

        languages.addEventListener('change', () => {
            if(text_languages.includes(languages.options[languages.selectedIndex].text) || languages.options[languages.selectedIndex].text == 'Idiomas'){
                cboxesI.forEach(cb => {
                    cb.disabled = true;
                });
            } else {
                cboxesI.forEach(cb => {
                    cb.disabled = false;
                });
            }   
        });

        check_btn = setInterval(btnDisabled, 1000);

        function btnDisabled(){
            let empty = false;

            inputs.forEach(e => {
                if(e.value.trim() == ''){
                    empty = true;
                }

                e.addEventListener('input', () => {
                    if (e.value.length > 40){
                        e.value = e.value.slice(0, 40); 
                    }
                });

            });

            if(array_languages.length != 0 && array_labels.length != 0 && empty == false && states.options[states.selectedIndex].text != 'Estados' && type_user.options[type_user.selectedIndex].text != 'Tipos de usuario'){
                btn_reg.disabled = false;
            } else {
                btn_reg.disabled = true;
            }
        }

        function SendArrays(){
            document.getElementById('arrayPHPLanguages').value = array_languages.toString();
            document.getElementById('arrayPHPLabels').value = array_labels.toString();
            document.getElementById('arrayPHPLevelsLanguages').value = array_levels_i.toString();
            document.getElementById('arrayPHPLevelsLabels').value = array_levels_e.toString();

            inputs.forEach(e => {
                e = e.value.trim();
            })
        }

        function limpiarEtiquetas(){
            event.preventDefault();
            div_labels.innerHTML = '';

            array_labels.length = 0;
            text_labels.length = 0; 

            array_levels_e.length = 0;
            text_levels_e.length = 0;
        }

        function limpiarIdiomas(){
            event.preventDefault(); 
            div_languages.innerHTML = '';

            array_languages.length = 0;
            text_languages.length = 0; 

            array_levels_i.length = 0;
            text_levels_i.length = 0;
        }
    </script>

    <?php
        if(isset($_GET['msg'])){ ?>
            <script>
                Swal.fire({
                    title: '<?php echo $_GET['msg']; ?>',
                    icon: 'success',
                    confirmButtonColor: '#A70019',
                    confirmButtonText: 'Aceptar',
                });

                removeUrlParams();
            </script>
    <?php } ?>
</body>
</html>