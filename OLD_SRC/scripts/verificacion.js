import { makeCode } from "./generadorCodigo.js";

export function verificacion(php, mail) {
    const codigo = makeCode(4);
    const asunto = "VERIFICACION EN DOS PASOS";
    const mensaje = `TU CODIGO DE VERIFICACIÓN ES: ${codigo}`;
    if (mail != null) {
        SendMail(mail);
    }

    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const code = data.codigo;
        if (code == codigo) {
            sendData(mail,php);
        } else {
            alert("Código incorrecto");
        }
    });

    function SendMail(email) {
        (function () {
            emailjs.init("ixWT1mJIQS1ksXzHB");
        })();

        let params = {
            sendername: "Bolsa De Trabajo - Tecnica 2",
            to: email,
            subject: asunto,
            message: mensaje
        };

        let serviceID = "service_ifcpjwj";
        let templateID = "template_ei8hmto";

        if (params['subject'] != "" && params['message'] != "") {
            emailjs.send(serviceID, templateID, params).then(res => {
                alert("Email enviado.");
            }).catch();
        }
    }

    function sendData(em,dir) {
         // Envía los datos al servidor mediante AJAX
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // 
            setTimeout(() => {
                window.location.replace(dir)
            }, 2000);
        }
        };
        //METODO, ARCHIVO, TRUE
        xhttp.open("POST", "verificar.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // ENVIA LOS PARAMETROS Y SUS VALORES
        xhttp.send("em=" + em + "&dir=" + dir);
    }
}
