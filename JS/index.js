// Crear un objeto con las teclas permitidas para cada sistema numérico
var allowedKeys = {
    binary: ["0", "1"], // Sistema binario permite solo 0 y 1
    octal: ["0", "1", "2", "3", "4", "5", "6", "7"], // Sistema octal permite números del 0 al 7
    decimal: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."], // Sistema decimal permite números del 0 al 9 y el punto decimal
    hexadecimal: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f"] // Sistema hexadecimal permite dígitos del 0 al F (mayúsculas y minúsculas)
};

// Función para manejar las teclas permitidas
function handleKey(event) {
    // Obtener el tipo de calculadora seleccionado
    var calculatorType = document.querySelector(".calculator-container__select").value;
    // Obtener las teclas permitidas para el tipo de calculadora
    var allowedKeysForCalculatorType = allowedKeys[calculatorType];
    
    // Permitir las flechas de dirección y la tecla de borrar
    if (event.key.startsWith("Arrow") || event.key === "Backspace") {
        return;
    }
    
    // Si la tecla presionada no está en las teclas permitidas, prevenir la acción
    if (!allowedKeysForCalculatorType.includes(event.key)) {
        event.preventDefault();
    }
}

// Función para manejar los botones de operación
function handleOperationButton() {
    // Obtener todos los botones de operación
    var operationButtons = document.querySelectorAll(".operation-buttons__button");

    // Función manejadora de clic para los botones de operación
    function buttonClickHandler(button) {
        // Activar el botón de operación seleccionado
        activateOperationButton(button.id);
        // Calcular el resultado
        calculateResult();
    }

    // Asociar el evento de clic a cada botón de operación
    operationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttonClickHandler(button);
        });
    });
}

// Función para activar el botón de operación seleccionado
function activateOperationButton(operation) {
    // Obtener todos los botones de operación
    var operationButtons = document.querySelectorAll(".operation-buttons__button");

    // Desactivar todos los botones de operación
    operationButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    // Activar el botón de operación seleccionado
    document.getElementById(operation).classList.add("active");
}

// Función para mostrar alertas con un mensaje personalizado
function showAlert(message) {
    var popupContainer = document.getElementById("popup-container");
    var popupContent = document.getElementById("popup-content");
    
    // Mostrar la ventana emergente con el mensaje personalizado
    popupContent.textContent = message;
    popupContainer.style.display = "block";
    
    // Ocultar la ventana emergente después de 2 segundos
    setTimeout(function () {
        popupContainer.style.display = "none";
    }, 2000);
}

// Función para copiar el texto de los input
function copyInputText(inputId) {
    // Obtener el valor del input especificado por su ID
    var texto = document.getElementById(inputId).value;
    
    // Verificar si el campo de entrada está vacío
    if (texto.trim() === "") {
        // Mostrar un mensaje de advertencia si el campo está vacío
        showAlert("El campo está vacío. No se puede copiar.");
        return; // Salir de la función
    }
    
    // Intentar copiar el texto al portapapeles usando el API del navegador
    navigator.clipboard.writeText(texto).then(function () {
        // Mostrar un mensaje de éxito si se copió el texto correctamente
        showAlert("Texto copiado al portapapeles");
    }).catch(function (error) {
        // Manejar errores, si hubo alguno, y mostrar en la consola
        console.error("Error al copiar el texto: ", error);
    });
}

// Convierte un número de un sistema numérico dado a decimal
function convertToDecimal(value, fromBase) {
    switch (fromBase) {
        case "binary":
            // Convierte el valor binario a decimal
            return parseInt(value, 2);
        case "octal":
            // Convierte el valor octal a decimal
            return parseInt(value, 8);
        case "decimal":
            // El valor ya es decimal, simplemente lo analiza como un número de punto flotante
            return parseFloat(value);
        case "hexadecimal":
            // Convierte el valor hexadecimal a decimal
            return parseInt(value, 16);
        default:
            // Valor no reconocido; devuelve NaN (No es un número)
            return NaN;
    }
}

// Convierte un número decimal a un sistema numérico dado
function convertFromDecimal(value, toBase) {
    switch (toBase) {
        case "binary":
            // Convierte el valor decimal a binario
            return value.toString(2);
        case "octal":
            // Convierte el valor decimal a octal
            return value.toString(8);
        case "decimal":
            // El valor ya es decimal; simplemente lo convierte a una cadena
            return value.toString();
        case "hexadecimal":
            // Convierte el valor decimal a hexadecimal en mayúsculas
            return value.toString(16).toUpperCase();
        default:
            // Sistema numérico no válido; devuelve una cadena vacía
            return "";
    }
}

// Función principal para realizar cálculos y mostrar resultados
function calculateResult() {
    // Obtener el tipo de calculadora seleccionado
    var calculatorType = document.querySelector(".calculator-container__select").value;
    
    // Obtener los valores ingresados por el usuario
    var num1 = document.querySelector(".data-input__input--num1").value;
    var num2 = document.querySelector(".data-input__input--num2").value;

    // Obtener el operador seleccionado
    var operatorId = document.querySelector(".operation-buttons__button.active").id;
    
    // Inicializar el resultado
    var result = 0;

    // Validar números según el sistema numérico seleccionado
    function getValidNumberCharacters(calculatorType) {
        switch (calculatorType) {
            case "binary":
                return /^[01]+$/;  // Aceptar solo 0 y 1
            case "octal":
                return /^[0-7]+$/;  // Aceptar números del 0 al 7
            case "decimal":
                return /^-?\d+(\.\d+)?/;  // Aceptar números decimales (positivos y negativos)
            case "hexadecimal":
                return /^[0-9A-Fa-f]+$/;  // Aceptar dígitos hexadecimales
            default:
                return null;
        }
    }

    // Validar que los números ingresados sean válidos
    var validNumberCharacters = getValidNumberCharacters(calculatorType);
    if (!validNumberCharacters.test(num1) || !validNumberCharacters.test(num2)) {
        // Mostrar un mensaje de error si los números no son válidos para el sistema
        document.querySelector(".result-container__message").textContent = "Por favor ingrese números válidos para el sistema";
        return;
    }

    // Convertir los números ingresados al sistema decimal
    num1 = convertToDecimal(num1, calculatorType);
    num2 = convertToDecimal(num2, calculatorType);

    // Realizar la operación matemática según el operador seleccionado
    switch (operatorId) {
        case "add":  // Suma
            result = num1 + num2;
            break;
        case "subtract":  // Resta
            result = num1 - num2;
            break;
        case "multiply":  // Multiplicación
            result = num1 * num2;
            break;
        case "divide":  // División
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                // Manejar división por cero y mostrar un mensaje de error
                var NDC = "No puedes dividir por cero";
                document.querySelector(".result-container__text--bin").value = "";
                document.querySelector(".result-container__text--oct").value = "";
                document.querySelector(".result-container__text--dec").value = "";
                document.querySelector(".result-container__text--hex").value = "";
                document.querySelector(".result-container__message").textContent = NDC;
                return;
            }
            break;
        default:
            // Manejar operación no válida y mostrar un mensaje de error
            document.querySelector(".result-container__message").textContent = "Operación no válida.";
            return;
    }

    // Convertir el resultado a diferentes sistemas numéricos
    var binaryResult = convertFromDecimal(result, "binary");
    var octalResult = convertFromDecimal(result, "octal");
    var hexadecimalResult = convertFromDecimal(result, "hexadecimal");

    // Formatear el resultado decimal con 3 decimales
    var decimalResult = result.toFixed(3);

    // Inicializar un mensaje
    var message = "";

    // Verificar si el resultado contiene decimales
    if (
        binaryResult.includes(".") ||
        octalResult.includes(".") ||
        hexadecimalResult.includes(".")
    ) {
        message =
            "El resultado contiene decimales y no se puede mostrar en binario, octal o hexadecimal.";
        binaryResult = "";
        octalResult = "";
        hexadecimalResult = "";
    }

    // Actualizar los campos de resultado en diferentes sistemas numéricos
    document.querySelector(".result-container__text--bin").value = binaryResult;
    document.querySelector(".result-container__text--oct").value = octalResult;
    document.querySelector(".result-container__text--dec").value = decimalResult;
    document.querySelector(".result-container__text--hex").value = hexadecimalResult;
    document.querySelector(".result-container__message").textContent = message;
}


// Función para inicializar la calculadora
function initializeCalculator() {
    // Agregar un evento keydown al documento
    document.addEventListener("keydown", handleKey);
    // Manejar los botones de operación
    handleOperationButton();
    // Agregar un evento change al elemento select
    var calculatorTypeSelect = document.querySelector(".calculator-container__select");
    calculatorTypeSelect.addEventListener("change", function () {
        // Limpiar los campos de entrada
        document.querySelector(".data-input__input--num1").value = "";
        document.querySelector(".data-input__input--num2").value = "";
    });
    // Llamar a la función de cálculo inicial
    calculateResult();
}

// Llamar a la función para inicializar la calculadora cuando se cargue la página
window.addEventListener("load", initializeCalculator);
