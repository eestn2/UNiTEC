import { makeCode } from "./generadorCodigo.js";

/**
 * Sends a verification code to the provided email and validates user input against the code.
 * 
 * @param {string} php - The PHP file path to redirect to after successful verification.
 * @param {string} mail - The email address to which the verification code will be sent.
 */
export function verificacion(php, mail) {
    /**
     * Sends an email with the verification code using EmailJS.
     * 
     * @param {string} email - The recipient's email address.
     */
    function SendMail(email) {
        // Initialize EmailJS with the user ID
        (function () {
            emailjs.init("ixWT1mJIQS1ksXzHB");
        })();

        // Email parameters
        let params = {
            sendername: "Bolsa De Trabajo - Tecnica 2", // Sender's name
            to: email, // Recipient's email
            subject: asunto, // Email subject
            message: mensaje // Email body
        };

        // EmailJS service and template IDs
        let serviceID = "service_ifcpjwj";
        let templateID = "template_ei8hmto";

        // Send the email if subject and message are not empty
        if (params['subject'] != "" && params['message'] != "") {
            emailjs.send(serviceID, templateID, params)
                .then(res => {
                    alert("Email enviado."); // Notify the user that the email was sent
                })
                .catch(); // Handle errors silently (no error handling provided)
        }
    }

    /**
     * Sends data to the server via an AJAX POST request and redirects the user upon success.
     * 
     * @param {string} em - The email address to send to the server.
     * @param {string} dir - The directory or URL to redirect to after successful verification.
     */
    function sendData(em, dir) {
        // Create a new XMLHttpRequest object
        var xhttp = new XMLHttpRequest();

        // Define the callback function for state changes
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Redirect to the specified directory after a delay
                setTimeout(() => {
                    window.location.replace(dir);
                }, 2000);
            }
        };

        // Configure the POST request
        xhttp.open("POST", "verificar.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Send the email and directory as POST parameters
        xhttp.send("em=" + em + "&dir=" + dir);
    }

    // Generate a 4-digit verification code
    const codigo = makeCode(4);

    // Email subject and message
    const asunto = "VERIFICACION EN DOS PASOS";
    const mensaje = `TU CODIGO DE VERIFICACIÓN ES: ${codigo}`;

    // If an email is provided, send the verification code
    if (mail != null) {
        SendMail(mail);
    }

    // Add an event listener to the form for handling submission
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Extract form data into an object
        const data = Object.fromEntries(new FormData(e.target));
        const code = data.codigo; // Get the user-provided verification code

        // Check if the provided code matches the generated code
        if (code == codigo) {
            sendData(mail, php); // Send data to the server and redirect
        } else {
            alert("Código incorrecto"); // Notify the user of an incorrect code
        }
    });
}
