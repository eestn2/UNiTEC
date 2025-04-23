const formularios_ajax=document.querySelectorAll(".FormularioAjax");
function enviar_formulario_ajax(){
    let enviar=confirm("¿Desea enviar el formulario?");

    if(enviar==true){
        document.addEventListener("DOMContentLoaded", function() {
            let data= new FormData(this);
            let method=this.getAttribute("method");
            let action=this.getAttribute("action");

            let encabezados= new Headers();

            let config={
                method: method,
                headers: encabezados,
                mode: 'cors',
                cache: 'no-cache',
                body: data
            };
            
            fetch(action,config)
            .then(respuesta => respuesta.text())
            .then(respuesta =>{ 
                let contenedor=document.getElementById("form-rest");
                contenedor.innerHTML = respuesta;
            });
        
        });
        
    }

}

formularios_ajax.forEach(formularios => {
    formularios.addEventListener("submit",enviar_formulario_ajax());
});