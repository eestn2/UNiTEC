//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

//Función para enviar emails gracias a Email JS
export function SendMail(email){
    (function(){
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    let params = {
        sendername: "Bolsa de Trabajo - Unitec",
        to: email,
        subject: "Actualización de datos requerida",
        message: "¡Hola!, hemos visto que no has actualizado tus datos desde hace un tiempo, actualiza tus datos para que las empresas esten al tanto de ti y puedas tener más oportunidades laborales."
    };

    let serviceID = "service_ifcpjwj";
    let templateID = "template_ei8hmto";

    emailjs.send(serviceID, templateID, params)
}