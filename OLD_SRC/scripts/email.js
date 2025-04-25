// Import the EmailJS library (commented out here, but necessary for the script to work)
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Function to send an email using EmailJS
function SendMail(email) {
    // Immediately invoked function to initialize the EmailJS API with a user key
    (function() {
        // Initialize the EmailJS API with the user key (replace with your actual key)
        emailjs.init("ixWT1mJIQS1ksXzHB");
    })();

    // Define the parameters for the email
    let params = {
        // Sender's name
        sendername: "Bolsa De Trabajo - Tecnica 2",
        // Recipient's email address
        to: email,
        // Subject of the email (retrieved from an input field with id 'asunto')
        subject: document.getElementById('asunto').value,
        // Message content of the email (retrieved from an input field with id 'mensaje')
        message: document.getElementById('mensaje').value
    };

    // Define the EmailJS service ID and template ID
    let serviceID = "service_ifcpjwj"; // Replace with your actual service ID
    let templateID = "template_ei8hmto"; // Replace with your actual template ID

    // Check if the subject and message fields are not empty
    if (params['subject'] != "" && params['message'] != "") {
        // Send the email using EmailJS
        emailjs.send(serviceID, templateID, params)
        .then(res => {
            // Alert the user that the email was successfully sent
            alert("Email enviado.");
        })
        .catch(err => {
            // Handle any errors that occur during the email sending process
            console.error("Error sending email:", err);
        });
    }
}

// Note: The script tag for importing the EmailJS library is commented out. 
// Make sure to include it in your HTML file for this script to work properly.
