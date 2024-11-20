// Referencias del DOM
const mainContent = document.getElementById('main-content');

// Función para cargar datos desde el archivo JSON
async function cargarDatosEnfermedades() {
    try {
        const respuesta = await fetch('./json/enfermedades.json');
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar la información. Inténtalo más tarde.');
        }
        const enfermedades = await respuesta.json();
        iniciarDiagnosticoMultiple(enfermedades);
    } catch (error) {
        mostrarMensajeErrorUX('Hubo un problema al cargar los datos. Por favor, verifica tu conexión.');
    }
}

// Función para iniciar el diagnóstico con síntomas numerados
function iniciarDiagnosticoMultiple(enfermedades) {
    // Seleccionar varias enfermedades correctas aleatoriamente
    const enfermedadesCorrectas = [];
    while (enfermedadesCorrectas.length < 3) {
        const seleccion = enfermedades[Math.floor(Math.random() * enfermedades.length)];
        if (!enfermedadesCorrectas.includes(seleccion)) {
            enfermedadesCorrectas.push(seleccion);
        }
    }

    // Mezclar enfermedades correctas e incorrectas
    const enfermedadesOpciones = [...enfermedadesCorrectas];
    while (enfermedadesOpciones.length < 6) {
        const seleccion = enfermedades[Math.floor(Math.random() * enfermedades.length)];
        if (!enfermedadesOpciones.includes(seleccion)) {
            enfermedadesOpciones.push(seleccion);
        }
    }
    enfermedadesOpciones.sort(() => Math.random() - 0.5);

    // Crear HTML dinámico con números en lugar de nombres
    const diagnosticoHTML = `
        <h2>Diagnóstico Interactivo</h2>
        <p>A continuación se muestran los síntomas agrupados por ejemplo. Selecciona las enfermedades correctas:</p>
        ${enfermedadesCorrectas
            .map((enfermedad, index) => `
                <div>
                    <h3>Ejemplo ${index + 1}</h3>
                    <ul>
                        ${enfermedad.sintomas.map(sintoma => `<li>${sintoma}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        <form id="form-diagnostico">
            ${enfermedadesOpciones.map(enfermedad => `
                <div class="opcion">
                    <label>
                        <input type="checkbox" name="enfermedad" value="${enfermedad.nombre}">
                        ${enfermedad.nombre}
                    </label>
                </div>
            `).join('')}
            <button type="submit" class="btn-enviar">Enviar Respuesta</button>
        </form>
    `;

    // Mostrar en el DOM
    mainContent.innerHTML = diagnosticoHTML;

    // Manejar el envío del formulario
    document.getElementById('form-diagnostico').addEventListener('submit', (evento) => {
        evento.preventDefault();
        manejarRespuestaMultiple(enfermedadesCorrectas, enfermedadesOpciones);
    });
}

// Función para manejar la respuesta del usuario
function manejarRespuestaMultiple(enfermedadesCorrectas, enfermedadesOpciones) {
    const respuestasSeleccionadas = Array.from(document.querySelectorAll('input[name="enfermedad"]:checked'))
        .map(input => input.value);

    const nombresCorrectos = enfermedadesCorrectas.map(enfermedad => enfermedad.nombre);
    const aciertos = respuestasSeleccionadas.filter(respuesta => nombresCorrectos.includes(respuesta));
    const errores = respuestasSeleccionadas.filter(respuesta => !nombresCorrectos.includes(respuesta));
    const faltantes = nombresCorrectos.filter(correcta => !respuestasSeleccionadas.includes(correcta));

    // Crear el mensaje de resultados
    let resultadoHTML = `
        <p><strong>Resultados:</strong></p>
        <ul>
            ${nombresCorrectos.map(nombre => `
                <li>${nombre} (${aciertos.includes(nombre) ? 'Correcto' : 'Faltante'})</li>
            `).join('')}
        </ul>
        <p>Acertaste ${aciertos.length} de ${nombresCorrectos.length} enfermedades correctas.</p>
    `;

    if (aciertos.length === nombresCorrectos.length && errores.length === 0) {
        Swal.fire({
            title: '¡Correcto!',
            html: resultadoHTML,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: '¡Resultado Parcial!',
            html: resultadoHTML,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Función para mostrar errores de manera visual
function mostrarMensajeErrorUX(mensaje) {
    Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

// Inicializar la aplicación
cargarDatosEnfermedades();
