/* Validación del formulario de contacto */

// Evento que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {

     // Objeto principal para validar y sincronizar los datos del formulario.
     const datosForm = {
         nombre: '',
         email: '',
         asunto: '',
         mensaje: ''
     }
 
     // Seleccionando los elementos de la interfaz
     const nombre = document.querySelector('#nombre');
     const inputEmail = document.querySelector('#email');
     const inputAsunto = document.querySelector('#asunto');
     const mensaje = document.querySelector('#mensaje');
     const formulario = document.querySelector('#formulario');
     const btnSubmit = document.querySelector('#formulario button[type="submit"]');
     const btnReset = document.querySelector('#formulario button[type="reset"]');
     const spinner = document.querySelector('#spinner');
 
     // Eventos de los elementos de la interfaz
     nombre.addEventListener('input', validar);
     inputEmail.addEventListener('input', validar);
     inputAsunto.addEventListener('input', validar);
     mensaje.addEventListener('input', validar);
 
     // Evento del botón submit, ejecuta la función enviarEmail
     formulario.addEventListener('submit', enviarEmail);
 
     // Evento del botón reset, ejecuta la función resetForm
     btnReset.addEventListener('click', function(e) {
         e.preventDefault();
 
         resetFormulario();
     });
 
     // Función para validar cada campo del formulario
     function validar(e) {

         if(e.target.value.trim() === '') {
             e.target.classList.add('border', 'border-danger'); // agregando un borde rojo al padre        
             mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); // muestra la alerta personalizada junto a su campo
             datosForm[e.target.name] = ''; // sincroniza los datos del formulario con el objeto principal
             comprobarDatosForm();
             return; // para cortar la ejecución del código y salir de la función
         }

         if(e.target.id === 'email' && !validarEmail(e.target.value)) { // si no es un email válido, entra en el if
             e.target.classList.add('border', 'border-danger'); // agregando un borde rojo al padre
             mostrarAlerta('El email no es válido', e.target.parentElement);
             datosForm[e.target.name] = '';
             comprobarDatosForm();
             return;
         }
         
         e.target.classList.remove('border', 'border-danger'); // si el campo es válido, se elimina el borde rojo del padre
         // Borra la/s alerta/s si pasa la validación (cada campo está correcto)
         borrarAlerta(e.target.parentElement) // se le pasa la referencia del padre para que borre la alerta del campo que se validó
 
         // Asigna los valores de los campos al objeto principal
         datosForm[e.target.name] = e.target.value.trim().toLowerCase(); // trim() elimina los espacios en blanco, toLowerCase() convierte a minúsculas
         comprobarDatosForm(); // comprueba el objeto principal, para verificar si está completo
     }
      
     function mostrarAlerta(mensaje, referencia){
         // Borra la/s alerta/s si pasa la validación (cada campo está correcto)
         borrarAlerta(referencia); // para que no se duplique la alerta
         // Genera alerta en el HTML
         const error = document.createElement('P'); // crear un elemento, se usa mayúscula por buena práctica
         error.textContent = mensaje; // agregando texto a la etiqueta "p" creada, que vine por parámetro de la función mostrarAlerta
         error.classList.add('error', 'text-danger', 'fs-6', 'text-start', 'p-0', 'm-0'); // agregar una clase personalizada o clases, al elemento creado
         // inserta el elemento creado al final del elemento padre (e.target.parentElement), en vez de al final del formulario para todos los campos
         referencia.appendChild(error); // la referencia viene por parámetro de la función mostrarAlerta
     }
 
     // Pasándole la referencia del padre para que borre la alerta del campo que se validó
     function borrarAlerta(referencia){ 
         // Comprueba si ya existe una alerta en el campo, para no crear otra. Previene múltiples alertas
         const alerta = referencia.querySelector('.error'); // referencia(e.target.parentElement): selecciona el campo en particular con la clase error
         if(alerta){
             alerta.remove();
         }
     }
     // Función específica con regex para validar el email
     function validarEmail(email){
         // expresión regular para validar el email: 
         const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
         const resultado = regex.test(email); // test() es un método de regex que valida el email
         return resultado; // true or false
     }
     // Función comprobarDatosForm() para validar que todos los campos estén completos
     function comprobarDatosForm(){
         // comprueba si el objeto principal tiene algún campo vacío
         if(Object.values(datosForm).includes('')){
             // deshabilita el botón enviar
             btnSubmit.disabled = true;
             return;
         } 
         // habilita el botón enviar
         btnSubmit.disabled = false;
     }
     // Función enviarEmail
     function enviarEmail(e){
         e.preventDefault();
         // muestra el spinner
         const spinner = document.querySelector('#spinner');
         spinner.classList.add('d-flex'); // agrega la clase d-flex al spinner
         spinner.classList.remove('visually-hidden'); // borra la clase que lo mantiene oculto
         
         setTimeout(() => {
             spinner.classList.remove('d-flex'); // borra la clase d-flex al spinner
             spinner.classList.add('visually-hidden'); // agrega la clase que lo mantiene oculto
             // resetea el formulario  
             resetFormulario(); 
             // muestra la alerta de éxito
             const alertaExito = document.createElement('P');
             alertaExito.classList.add('bg-dark', 'bg-gradient', 'rounded', 'p-2', 'm-1', 'text-white', 'text-center', 'fs-5', 'fw-bold');
             alertaExito.textContent = 'El email no se envió porque está en proceso de desarrollo';
             // inserta la alerta de éxito en el HTML
             formulario.appendChild(alertaExito);
             // oculta la alerta de éxito después de 3 segundos
             setTimeout(() => {
                 alertaExito.remove();
             }, 3000);
         }, 3000);
     }
     // Función resetFormulario para evitar repetir código
     function resetFormulario(){
         // reiniciar el objeto principal
         datosForm.nombre = '';
         datosForm.email = '';
         datosForm.asunto = '';
         datosForm.mensaje = '';
 
         formulario.reset(); // resetea el formulario
         comprobarDatosForm(); // deshabilita el botón enviar luego de comprobar que los campos están vacíos
     }
 });