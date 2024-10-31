// Variables globales
const enfermedades = [
    { nombre: 'Gripe', sintomas: ['Fiebre', 'Tos', 'Dolor de garganta'] },
    { nombre: 'Covid-19', sintomas: ['Fiebre', 'Dificultad para respirar', 'Pérdida del olfato'] },
    { nombre: 'Migraña', sintomas: ['Dolor de cabeza', 'Sensibilidad a la luz', 'Náuseas'] },
    { nombre: 'Gastritis', sintomas: ['Dolor abdominal', 'Acidez', 'Náuseas'] },
    { nombre: 'Amigdalitis', sintomas: ['Dolor de garganta', 'Dificultad para tragar', 'Fiebre'] },
    { nombre: 'Diabetes', sintomas: ['Sed excesiva', 'Micción frecuente', 'Fatiga'] },
    { nombre: 'Hipertensión', sintomas: ['Dolor de cabeza', 'Mareos', 'Dificultad para respirar'] },
    { nombre: 'Bronquitis', sintomas: ['Tos persistente', 'Flema', 'Fatiga'] },
    { nombre: "Neumonía", sintomas: ["dificultad para respirar", "dolor en el pecho", "tos con flema"] },
    { nombre: "Apendicitis", sintomas: ["dolor abdominal agudo", "náuseas", "fiebre baja"] },
    { nombre: "Asma", sintomas: ["dificultad para respirar", "silbidos al respirar", "opresión en el pecho"] },
    { nombre: "Anemia", sintomas: ["fatiga", "palidez", "dificultad para concentrarse"] }
];

let enfermedadSeleccionada = {};
let intentos = 3; // Inicializa con 3 intentos

// Cargar almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generarSintomasAleatorios(); // Generar síntomas al cargar la página
    const savedDiagnostico = localStorage.getItem('diagnostico');
    if (savedDiagnostico) {
        mostrarDiagnostico(savedDiagnostico);
    }
});

// Función para generar una lista de síntomas aleatorios
function generarSintomasAleatorios() {
    const randomIndex = Math.floor(Math.random() * enfermedades.length);
    enfermedadSeleccionada = enfermedades[randomIndex];
    mostrarSintomas(enfermedadSeleccionada.sintomas);
}

// Mostrar los síntomas en el DOM
function mostrarSintomas(sintomas) {
    const sintomasLista = document.getElementById('sintomasLista');
    sintomasLista.innerHTML = ''; // Limpiar cualquier síntoma anterior
    sintomas.forEach(sintoma => {
        const li = document.createElement('li');
        li.textContent = sintoma;
        sintomasLista.appendChild(li);
    });
}

// Función para procesar la respuesta del usuario
function procesarRespuesta() {
    const inputUsuario = document.getElementById('respuestaUsuario').value.trim();
    const resultMessage = document.getElementById('resultMessage');

    // Chequea si aún tiene intentos
    if (intentos > 0) {
        if (inputUsuario.toLowerCase() === enfermedadSeleccionada.nombre.toLowerCase()) {
            mostrarDiagnostico('¡Correcto! El diagnóstico es: ' + enfermedadSeleccionada.nombre, 'correcto');
            localStorage.setItem('diagnostico', '¡Correcto! El diagnóstico es: ' + enfermedadSeleccionada.nombre);
        } else {
            intentos--;
            mostrarDiagnostico(`Diagnóstico incorrecto. Te quedan ${intentos} intentos.`, 'fallo');
        }
    }

    // Si ya no quedan intentos, muestra el resultado
    if (intentos === 0) {
        mostrarDiagnostico('No tienes más intentos. El diagnóstico correcto era: ' + enfermedadSeleccionada.nombre, 'fallido');
        localStorage.setItem('diagnostico', 'No tienes más intentos. El diagnóstico correcto era: ' + enfermedadSeleccionada.nombre);
    }
}

// Mostrar diagnóstico en el DOM con estilos de color
function mostrarDiagnostico(diagnostico, estado) {
    const resultMessage = document.getElementById('resultMessage');
    resultMessage.textContent = diagnostico;
    
    // Cambiar color del mensaje según el estado
    if (estado === 'correcto') {
        resultMessage.style.color = 'green';
    } else if (estado === 'fallido') {
        resultMessage.style.color = 'red';
    } else if (estado === 'fallo') {
        resultMessage.style.color = 'yellow';
    }
}

// Escuchar el evento de clic en el botón de diagnóstico
document.getElementById('enviarRespuesta').addEventListener('click', procesarRespuesta);

// Limpiar LocalStorage y resultados
document.getElementById('limpiarDiagnostico').addEventListener('click', () => {
    localStorage.removeItem('diagnostico');
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('respuestaUsuario').value = '';
    const sintomasLista = document.getElementById('sintomasLista');
    sintomasLista.innerHTML = '';
    intentos = 3; // Reinicia los intentos
    generarSintomasAleatorios(); // Generar nuevos síntomas
});
