<?php
//Opción 1 registra usuarios.
//Opción 2 registra empresas.
//Opción 3 elimina usuarios.
//Opción 4 actualiza datos de usuarios.
//Opción 5 comprueba si el usuario existe y si la contraseña es correcta (login).
//Opción 6 cambia la contraseña de un usuario.
//Opción 7 elimina usuarios.
//Opción 8 cambia la foto de perfil de un usuario.
//Opción 9 actualiza datos de empresas.

if(isset($_POST['action']) && $_POST['action'] == '1'){

    $received_url = $_POST['redirect_url '];

    $name = $_POST['user_name']; //nombre
    $age = $_POST['user_age']; //edad
    $location = $_POST['user_location']; //localidad
    $mail = $_POST['user_email']; //user_email
    $password = password_hash($_POST['user_password'], PASSWORD_DEFAULT); //contrasenia
    $description = $_POST['user_description'];//descripcion
    $date = $_POST['user_date'];//user_date
    $briefcase = $_POST['user_portfolio'];//portfolio
    $enabled = $_POST['user_is_enabled'];//habilitado
    $state = $_POST['user_status'];//estado
    $type_user = $_POST['user_type'];
    $post_languages = $_POST['arrayPHPLanguages'];
    $post_labels = $_POST['arrayPHPLabels'];
    $post_languages_levels = $_POST['arrayPHPLevelsLanguages'];
    $post_labels_levels = $_POST['arrayPHPLevelsLabels'];

    $array_languages = explode(',', $post_languages);   
    $array_labels = explode(',', $post_labels);
    $array_languages_levels = explode(',', $post_languages_levels);   
    $array_labels_levels = explode(',', $post_labels_levels);
    
    $picture = '';

    $obj_user->Register_users($name, $age, $location, $array_languages, $array_labels, $array_languages_levels, $array_labels_levels, $mail, $password, $description, $state, $date, $picture, $briefcase, $type_user, $enabled, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '2'){

    $received_url = $_POST['redirect_url '];

    $name = $_POST['user_name'];
    $age = $_POST['user_age'];
    $location = $_POST['user_location'];
    $mail = $_POST['user_email'];
    $password = password_hash($_POST['user_password'], PASSWORD_DEFAULT);
    $description = $_POST['user_description'];
    $date = $_POST['user_date'];
    $briefcase = $_POST['user_portfolio'];
    $enabled = $_POST['user_is_enabled'];
    $state = $_POST['user_status'];
    $type_user = $_POST['user_type'];
    
    $picture = '';

    $obj_user->Register_companies($name, $age, $location, $mail, $password, $description, $state, $date, $picture, $briefcase, $type_user, $enabled, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '3') {

    $received_url = $_POST['redirect_url'];

    $received_id = $_POST['user_id'];

    $obj_user->Delete_users($received_id, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '4') {

    require_once('encryption_keys.php');

    $received_url = $_POST['redirect_url '];

    $received_id = openssl_decrypt($_POST['user_id'], AES, KEY);

    $name = $_POST['user_name'];
    $location = $_POST['user_location'];
    $mail = $_POST['user_email'];
    $description = $_POST['user_description'];
    $date = $_POST['user_date'];
    $briefcase = $_POST['user_portfolio'];
    $state = $_POST['user_status'];
    $type_user = $_POST['user_type'];
    $post_languages = $_POST['arrayPHPLanguages'];
    $post_labels = $_POST['arrayPHPLabels'];
    $post_languages_levels = $_POST['arrayPHPLevelsLanguages'];
    $post_labels_levels = $_POST['arrayPHPLevelsLabels'];

    $array_languages = explode(',', $post_languages);   
    $array_labels = explode(',', $post_labels);
    $array_languages_levels = explode(',', $post_languages_levels);   
    $array_labels_levels = explode(',', $post_labels_levels);

    $obj_user->update_Users_data($received_id, $name, $location, $mail, $description, $state, $date, $briefcase, $type_user, $array_languages, $array_labels, $array_languages_levels, $array_labels_levels, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '5') {

    $received_url = $_POST['redirect_url '];

    $received_email = $_POST['user_email'];
    $received_password = $_POST['user_password'];

    echo json_encode($obj_user->comprobate_User($received_email, $received_password, $received_url));

} else if(isset($_POST['action']) && $_POST['action'] == '6') {

    require_once('encryption_keys.php');

    $received_url = $_POST['redirect_url '];
    $received_id = openssl_decrypt($_POST['user_id'], AES, KEY);

    $new_password = $_POST['new-password'];
    $password = $_POST['password'];

    $obj_user->changePassword($received_id, $password, $new_password, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '7') {

    require_once('encryption_keys.php');
    
    $received_url = $_POST['redirect_url '];
    $received_id = openssl_decrypt($_POST['user_id'], AES, KEY);

    $obj_user->Delete_users($received_id, $received_url);

} else if(isset($_POST['action']) && $_POST['action'] == '8') {
    
    require_once('encryption_keys.php');

    $received_id = openssl_decrypt($_POST['user_id'], AES, KEY);
    $received_url = $_POST['redirect_url '];
    $received_picture = $_FILES['image'];

    $obj_user->change_profile_photo($received_id, $received_picture, $received_url);
 
} else if(isset($_POST['action']) && $_POST['action'] == '9') {

    require_once('encryption_keys.php');

    $received_url = $_POST['redirect_url '];

    $received_id = openssl_decrypt($_POST['user_id'], AES, KEY);

    $name = $_POST['user_name'];
    $location = $_POST['user_location'];
    $mail = $_POST['user_email'];
    $description = $_POST['user_description'];
    $date = $_POST['user_date'];
    $briefcase = $_POST['user_portfolio'];

    $obj_user->Update_company_data($received_id, $name, $location, $mail, $description, $date, $briefcase, $received_url);

}
?>