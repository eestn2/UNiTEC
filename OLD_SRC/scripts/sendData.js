function sendData(php,array) {
    //selecciona los datos
    // Envía los datos al servidor mediante AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Muestra la respuesta del servidor
            console.log(this.responseText);
        }
    };
    //METODO, ARCHIVO, TRUE
    xhttp.open("POST", php, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // ENVIA LOS PARAMETROS Y SUS VALORES
    xhttp.send("array=" + array);
}
