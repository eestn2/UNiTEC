// Import the EmailJS library to send emails
//<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Function to send emails using EmailJS
export function SendMail(email) {
    // Immediately invoked function expression (IIFE) to initialize EmailJS
    (function() {
        // Initialize EmailJS with a user ID (replace "ixWT1mJIQS1ksXzHB" with your actual user ID)
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    // Define the parameters for the email
    let params = {
        sendername: "Bolsa de Trabajo - Tecnica 2", // Name of the sender
        to: email, // Recipient's email address (passed as a parameter to the function)
        subject: "Actualización de datos requerida", // Subject of the email
        message: "¡Hola!, hemos visto que no has actualizado tus datos desde hace un tiempo, actualiza tus datos para que las empresas esten al tanto de ti y puedas tener mas oportunidades laborales." // Body of the email
    };

    // Define the EmailJS service ID and template ID
    let serviceID = "service_ifcpjwj"; // Replace with your actual EmailJS service ID
    let templateID = "template_ei8hmto"; // Replace with your actual EmailJS template ID

    // Send the email using EmailJS
    emailjs.send(serviceID, templateID, params);
}