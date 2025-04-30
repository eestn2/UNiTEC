let forms = document.querySelectorAll('.form');

function toggleDiv(param) {
    var languages = document.querySelectorAll(param);
    // Alterna la clase 'hidden'

    languages.forEach(e => {
        e.classList.toggle("show")

    });

}

function sendForm() {
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            const formID = btn.getAttribute('data-form-id');
            const form = document.getElementById(formID);

            if (form) {
                let allInputsEnabled = true;

                form.querySelectorAll('input').forEach(input => {
                    if (input.disabled) {
                        allInputsEnabled = false;
                    }
                });

                if (allInputsEnabled) {
                    form.submit();
                }
            } else {
                console.error('No se encontró un formulario con ID:', formID);
            }
        });
    });
}


function enfocarInput(spanElement) {
    var inputFields = spanElement.previousElementSibling; // Asume que el input es el hermano anterior del span
    if (inputFields.hasAttribute('disabled')) {
        // Si el campo tiene el atributo 'disabled', lo eliminamos y enfocamos el campo
        inputFields.removeAttribute('disabled');
        inputFields.focus();
    } else {
        // Si el campo no tiene el atributo 'disabled', lo añadimos
        inputFields.setAttribute('disabled', 'true');
    }
}

document.addEventListener('DOMContentLoaded', sendForm);
