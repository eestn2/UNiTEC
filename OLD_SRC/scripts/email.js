//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

function SendMail(email){
    (function(){
        //inicia el api con una clave
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    let params = {
        // quien lo manda, para quien, asunto, mensaje
        sendername: "Bolsa De Trabajo - Tecnica 2",
        to: email,
        subject: document.getElementById('asunto').value,
        message: document.getElementById('mensaje').value
    };

    let serviceID = "service_ifcpjwj";
    let templateID = "template_ei8hmto";
    
    if(params['subject']!="" && params['message']!=""){
        //envia el email si existe el asunto y el mensaje
        emailjs.send(serviceID, templateID, params)
        .then( res => {
            //alerta que el email fue enviado
            alert("Email enviado.");
        })
        .catch();
        
    }
}
//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

function SendMail(email){
    (function(){
        //inicia el api con una clave
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    let params = {
        // quien lo manda, para quien, asunto, mensaje
        sendername: "Bolsa De Trabajo - Tecnica 2",
        to: email,
        subject: document.getElementById('asunto').value,
        message: document.getElementById('mensaje').value
    };

    let serviceID = "service_ifcpjwj";
    let templateID = "template_ei8hmto";
    
    if(params['subject']!="" && params['message']!=""){
        //envia el email si existe el asunto y el mensaje
        emailjs.send(serviceID, templateID, params)
        .then( res => {
            //alerta que el email fue enviado
            alert("Email enviado.");
        })
        .catch();
        
    }
}
//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

function SendMail(email){
    (function(){
        //inicia el api con una clave
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    let params = {
        // quien lo manda, para quien, asunto, mensaje
        sendername: "Bolsa De Trabajo - Tecnica 2",
        to: email,
        subject: document.getElementById('asunto').value,
        message: document.getElementById('mensaje').value
    };

    let serviceID = "service_ifcpjwj";
    let templateID = "template_ei8hmto";
    
    if(params['subject']!="" && params['message']!=""){
        //envia el email si existe el asunto y el mensaje
        emailjs.send(serviceID, templateID, params)
        .then( res => {
            //alerta que el email fue enviado
            alert("Email enviado.");
        })
        .catch();
        
    }
}
//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

function SendMail(email){
    (function(){
        //inicia el api con una clave
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    let params = {
        // quien lo manda, para quien, asunto, mensaje
        sendername: "Bolsa De Trabajo - Tecnica 2",
        to: email,
        subject: document.getElementById('asunto').value,
        message: document.getElementById('mensaje').value
    };

    let serviceID = "service_ifcpjwj";
    let templateID = "template_ei8hmto";
    
    if(params['subject']!="" && params['message']!=""){
        //envia el email si existe el asunto y el mensaje
        emailjs.send(serviceID, templateID, params)
        .then( res => {
            //alerta que el email fue enviado
            alert("Email enviado.");
        })
        .catch();
        
    }
}
