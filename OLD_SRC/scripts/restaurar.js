export function restaurar(){
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        if (data.pas1 == data.pas2 && data.pas2!="" && data.pas1!=""){
            sendData(data.pas1);
        } else {
            alert("No coinciden ambos campos");
        }
    
        function sendData(pas) {
            // Envía los datos al servidor mediante AJAX
           var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // 
                    setTimeout(() => {
                        window.location.replace("../user_dashboard.php");
                    }, 2000);
                }
           };
           //METODO, ARCHIVO, TRUE
           xhttp.open("POST", "../vistas/olvide-contrasenia.php", true);
           xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           // ENVIA LOS PARAMETROS Y SUS VALORES
           xhttp.send("pas=" + encodeURIComponent(pas));
       }
    });
}