
const formReserva = document.getElementById("formReserva");
const mensaje = document.getElementById("mensaje");

formReserva.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Evita envío automático

    
    const nombre = document.getElementById("nombre").value.trim();
    const contacto = document.getElementById("contacto").value.trim();
    const fecha = document.getElementById("fecha").value;
    const personas = document.getElementById("personas").value;
    const comentarios = document.getElementById("comentarios").value.trim();

    
    if (nombre === "") {
        mostrarMensaje("El nombre es obligatorio.", "error");
        return;
    }

    
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatoTelefono = /^[0-9\-\+\s]{8,15}$/;

    if (contacto === "" || (!formatoCorreo.test(contacto) && !formatoTelefono.test(contacto))) {
        mostrarMensaje("Ingrese un correo o teléfono válido.", "error");
        return;
    }

    
    if (fecha === "") {
        mostrarMensaje("Seleccione una fecha de reserva.", "error");
        return;
    }

    const fechaSeleccionada = new Date(fecha + "T00:00:00");
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        mostrarMensaje("La fecha no puede ser anterior a hoy.", "error");
        return;
    }

    
    if (personas === "" || Number(personas) <= 0) {
        mostrarMensaje("El número de personas debe ser mayor a cero.", "error");
        return;
    }

    
    const textoConfirmacion = `
        Reserva realizada con éxito.<br>
        Nombre: ${nombre}<br>
        Contacto: ${contacto}<br>
        Fecha: ${fecha}<br>
        Personas: ${personas}<br>
        Comentarios: ${comentarios === "" ? "Sin comentarios" : comentarios}
    `;

    mostrarMensaje(textoConfirmacion, "exito");
    formReserva.reset(); // Limpia el formulario
});


function mostrarMensaje(texto, tipo) {
    mensaje.innerHTML = texto;
    mensaje.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
}