/**
 * Function `restaurar` sets up an event listener on a form to handle password restoration.
 * It validates the input passwords, ensures they match, and sends the new password to the server.
 * If the operation is successful, the user is redirected to the login page.
 */
export function restaurar() {
    /**
     * Adds a 'submit' event listener to the first form element on the page.
     * Prevents the default form submission behavior and processes the form data.
     * 
     * @param {Event} e - The submit event triggered by the form.
     */
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault(); // Prevents the default form submission.

        // Collects form data into an object where keys are form field names and values are their inputs.
        const data = Object.fromEntries(new FormData(e.target));

        // Validates that both password fields match and are not empty.
        if (data.pas1 == data.pas2 && data.pas2 !== "" && data.pas1 !== "") {
            sendData(data.pas1); // Sends the password to the server if validation passes.
        } else {
            alert("No coinciden ambos campos"); // Alerts the user if passwords do not match or are empty.
        }

        /**
         * Sends the new password to the server using an AJAX request.
         * If the server responds successfully, redirects the user to the login page after a delay.
         * 
         * @param {string} pas - The new password to be sent to the server.
         */
        function sendData(pas) {
            // Creates a new XMLHttpRequest object for the AJAX request.
            var xhttp = new XMLHttpRequest();

            // Defines a callback function to handle the server's response.
            xhttp.onreadystatechange = function() {
                // Checks if the request is complete and the response status is OK.
                if (this.readyState == 4 && this.status == 200) {
                    // Redirects the user to the login page after a 2-second delay.
                    setTimeout(() => {
                        window.location.replace("../index.php");
                    }, 2000);
                }
            };

            // Configures the AJAX request with the POST method and target URL.
            xhttp.open("POST", "../vistas/olvide-contrasenia.php", true);

            // Sets the request header to indicate form data is being sent.
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            // Sends the password as a URL-encoded parameter.
            xhttp.send("pas=" + encodeURIComponent(pas));
        }
    });
}
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
                        window.location.replace("../index.php");
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