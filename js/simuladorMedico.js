// Variables y constantes
const symptoms = [
    { enfermedad: "Gripe", sintomas: ["fiebre", "tos", "dolor de cabeza"] },
    { enfermedad: "Neumonía", sintomas: ["dificultad para respirar", "dolor en el pecho", "tos con flema"] },
    { enfermedad: "Diabetes", sintomas: ["sed excesiva", "micción frecuente", "fatiga"] },
    { enfermedad: "Migraña", sintomas: ["dolor intenso en un lado de la cabeza", "sensibilidad a la luz", "náuseas"] },
    { enfermedad: "Apendicitis", sintomas: ["dolor abdominal agudo", "náuseas", "fiebre baja"] },
    { enfermedad: "Hipertensión", sintomas: ["dolor de cabeza frecuente", "mareos", "visión borrosa"] },
    { enfermedad: "Asma", sintomas: ["dificultad para respirar", "silbidos al respirar", "opresión en el pecho"] },
    { enfermedad: "Anemia", sintomas: ["fatiga", "palidez", "dificultad para concentrarse"] }
];

let selectedDisease = getRandomDisease();
let attempts = 0;
const MAX_ATTEMPTS = 3;

// Elementos del DOM
const symptomList = document.getElementById("symptomList");
const resultMessage = document.getElementById("resultMessage");

// Función para seleccionar una enfermedad aleatoria
function getRandomDisease() {
    const randomIndex = Math.floor(Math.random() * symptoms.length);
    return symptoms[randomIndex];
}

// Muestra los síntomas en el HTML
function displaySymptoms() {
    selectedDisease.sintomas.forEach(sintoma => {
        const li = document.createElement("li");
        li.textContent = sintoma;
        symptomList.appendChild(li);
    });
}

// Función para procesar el diagnóstico ingresado por el usuario
function processDiagnosis(diagnosis) {
    if (diagnosis.trim().toLowerCase() === selectedDisease.enfermedad.toLowerCase()) {
        alert(`¡Correcto! El diagnóstico es: ${selectedDisease.enfermedad}`);
        console.log(`¡El diagnóstico fue correcto! Enfermedad: ${selectedDisease.enfermedad}`);
        resultMessage.textContent = `¡Correcto! El diagnóstico es: ${selectedDisease.enfermedad}`;
        resultMessage.style.color = "green";
        return true;
    } else {
        alert("Diagnóstico incorrecto. Inténtalo de nuevo.");
        console.log("Diagnóstico incorrecto.");
        resultMessage.textContent = "Diagnóstico incorrecto. Inténtalo de nuevo.";
        resultMessage.style.color = "red";
        return false;
    }
}

// Función para ejecutar la simulación
function runMedicalSimulation() {
    alert("Bienvenido al Simulador Diagnóstico Médico");
    
    // Mostrar síntomas en el HTML
    displaySymptoms();
    
    // Da tiempo para que el usuario vea los síntomas
    setTimeout(() => {
        while (attempts < MAX_ATTEMPTS) {
            const userDiagnosis = prompt("Ingresa tu diagnóstico:");
            if (processDiagnosis(userDiagnosis)) {
                break; // Si el diagnóstico es correcto, salir del ciclo
            }
            attempts++;
        }

        if (attempts === MAX_ATTEMPTS) {
            alert(`Lo siento, has alcanzado el límite de intentos. La enfermedad era: ${selectedDisease.enfermedad}`);
            console.log(`El usuario no adivinó la enfermedad. La respuesta correcta era: ${selectedDisease.enfermedad}`);
            resultMessage.textContent = `Lo siento, has alcanzado el límite de intentos. La enfermedad era: ${selectedDisease.enfermedad}`;
            resultMessage.style.color = "orange";
        }
    }, 500); // Retraso para que se puedan ver los sintomas antes de contestar
}

runMedicalSimulation();
