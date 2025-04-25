// Select all elements with the class 'form' and store them in the 'forms' variable
let forms = document.querySelectorAll('.form');

/**
 * Toggles the visibility of elements matching the given selector.
 * @param {string} param - A CSS selector to identify the elements to toggle.
 */
function toggleDiv(param) {
    // Select all elements matching the provided selector
    var languages = document.querySelectorAll(param);

    // Toggle the 'show' class for each element in the NodeList
    languages.forEach(e => {
        e.classList.toggle("show");
    });
}

/**
 * Adds click event listeners to buttons with the class 'btn-editar'.
 * When clicked, the button will attempt to submit the associated form
 * if all input fields in the form are enabled.
 */
function sendForm() {
    // Select all buttons with the class 'btn-editar'
    document.querySelectorAll('.btn-editar').forEach(btn => {
        // Add a click event listener to each button
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default form submission behavior

            // Get the ID of the form associated with the button
            const formID = btn.getAttribute('data-form-id');
            const form = document.getElementById(formID); // Find the form by its ID

            if (form) {
                let allInputsEnabled = true; // Flag to check if all inputs are enabled

                // Check if any input field in the form is disabled
                form.querySelectorAll('input').forEach(input => {
                    if (input.disabled) {
                        allInputsEnabled = false;
                    }
                });

                // If all inputs are enabled, submit the form
                if (allInputsEnabled) {
                    form.submit();
                }
            } else {
                // Log an error if the form with the specified ID is not found
                console.error('No se encontró un formulario con ID:', formID);
            }
        });
    });
}

/**
 * Toggles the 'disabled' attribute of an input field and focuses it if enabled.
 * @param {HTMLElement} spanElement - The span element that triggers the function.
 */
function enfocarInput(spanElement) {
    // Get the input field that is the previous sibling of the span element
    var inputFields = spanElement.previousElementSibling;

    if (inputFields.hasAttribute('disabled')) {
        // If the input field is disabled, remove the 'disabled' attribute and focus it
        inputFields.removeAttribute('disabled');
        inputFields.focus();
    } else {
        // If the input field is not disabled, add the 'disabled' attribute
        inputFields.setAttribute('disabled', 'true');
    }
}

// Wait for the DOM to fully load, then call the sendForm function to set up event listeners
document.addEventListener('DOMContentLoaded', sendForm);
