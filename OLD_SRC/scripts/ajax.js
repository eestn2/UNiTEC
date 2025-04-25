// Select all elements with the class "FormularioAjax" and store them in a NodeList
const formularios_ajax = document.querySelectorAll(".FormularioAjax");

// Function to handle the AJAX form submission
function enviar_formulario_ajax() {
    // Display a confirmation dialog to the user
    let enviar = confirm("¿Desea enviar el formulario?");

    // If the user confirms (clicks "OK")
    if (enviar == true) {
        // Add an event listener for when the DOM content is fully loaded
        document.addEventListener("DOMContentLoaded", function () {
            // Create a FormData object to gather all the form data
            let data = new FormData(this);

            // Get the HTTP method (e.g., POST, GET) from the form's "method" attribute
            let method = this.getAttribute("method");

            // Get the URL to send the request to from the form's "action" attribute
            let action = this.getAttribute("action");

            // Create a Headers object (currently unused, but could be used for custom headers)
            let encabezados = new Headers();

            // Define the configuration object for the fetch request
            let config = {
                method: method, // HTTP method (e.g., POST, GET)
                headers: encabezados, // Headers object (currently empty)
                mode: 'cors', // Enable Cross-Origin Resource Sharing
                cache: 'no-cache', // Disable caching
                body: data // Attach the form data as the request body
            };

            // Send the AJAX request using the Fetch API
            fetch(action, config)
                .then(respuesta => respuesta.text()) // Parse the response as plain text
                .then(respuesta => {
                    // Find the element with the ID "form-rest"
                    let contenedor = document.getElementById("form-rest");

                    // Insert the server's response into the "form-rest" element
                    contenedor.innerHTML = respuesta;
                });
        });
    }
}

// Attach the "submit" event listener to each form in the NodeList
formularios_ajax.forEach(formularios => {
    // Note: The function is being called immediately here, which is incorrect.
    // It should be passed as a reference instead of being invoked.
    formularios.addEventListener("submit", enviar_formulario_ajax());
});