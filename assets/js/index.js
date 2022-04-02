/** Validación del formulario **/

// variables
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-email');
const resetBtn = document.querySelector('#resetBtn');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// funciones
eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     nombre.addEventListener('blur', validarFormulario);
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Boton de enviar en el submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetFormulario);
}

function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
     btnEnviar.classList.add('disabled')
}

// Valida que el campo tengo algo escrito
function validarFormulario(e) {
    
     if(e.target.value.length > 0 ) {
          e.target.style.borderColor = 'green';
          e.target.classList.remove('border-danger');
     } else {
          e.target.classList.add('border-danger');
     }

     // Validar unicamente el email
     if(this.type === 'email') {
          validarEmail(this);
     }

     if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('disabled');
     }
}

// Resetear el formulario 
function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {

    e.preventDefault();

     // Spinner al presionar Enviar
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     // Gif que envia email
     const enviado = document.createElement('p');
     enviado.textContent = 'MENSAJE NO ENVIADO. La función de envío de emails está en proceso';
    //  enviado.classList.add('bg-primary', 'text-white', 'text-center', 'mt-2', 'p-2', 'fs-3');
     enviado.classList.add('mensajeExitoso')
     
     inicioApp();
     // Ocultar Spinner y mostrar gif de enviado
     setTimeout( () => {
          spinner.style.display = 'none';

          document.querySelector('#mensaje-enviado').appendChild( enviado );
          
          setTimeout(() =>  {
               enviado.remove();
               formularioEnviar.reset();
          }, 5000);
     }, 3000);
     
}

function validarEmail(campo) {
     const mensaje = campo.value;
     
     if( emailRegEx.test(mensaje.toLowerCase()) ) {
          campo.style.borderColor = 'green';
          campo.classList.remove('border-danger');
     } else {
          campo.style.borderColor = 'red';
          campo.classList.add('error');
     }
}