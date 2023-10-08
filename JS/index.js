// Crear un objeto con las teclas permitidas para cada sistema numérico
var allowedKeys = {
    binary: ["0", "1"],
    octal: ["0", "1", "2", "3", "4", "5", "6", "7"],
    decimal: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    hexadecimal: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f"]
};

// Función para manejar las teclas permitidas
function handleKey(event) {
    var calculatorType = document.querySelector(".calculator-container__select").value;
    var allowedKeysForCalculatorType = allowedKeys[calculatorType];

    // Permitir las flechas de dirección y la tecla de borrar
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "Backspace"
    ) {
        return;
    }

    if (!allowedKeysForCalculatorType.includes(event.key)) {
        event.preventDefault();
    }
}

// Función para manejar los botones de operación
function handleOperationButton() {
    var operationButtons = document.querySelectorAll(".operation-buttons__button");
    operationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activateOperationButton(button.id);
            calculateResult();
        });
    });
}

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
    // Obtenemos el valor del input
    var texto = document.getElementById(inputId).value;

    // Verificar si el campo está vacío
    if (texto.trim() === "") {
        showAlert("El campo está vacío. No se puede copiar.");
        return;
    }

    // Copiamos el texto al portapapeles
    navigator.clipboard.writeText(texto).then(function () {
        showAlert("Texto copiado al portapapeles");
    }).catch(function (error) {
        console.error("Error al copiar el texto: ", error);
    });
}

// Función para convertir a decimal desde otros sistemas
function convertToDecimal(value, fromBase) {
    switch (fromBase) {
        case "binary":
            return parseInt(value, 2);
        case "octal":
            return parseInt(value, 8);
        case "decimal":
            return parseFloat(value);
        case "hexadecimal":
            return parseInt(value, 16);
        default:
            return NaN;
    }
}

// Función para convertir desde decimal a otros sistemas
function convertFromDecimal(value, toBase) {
    switch (toBase) {
        case "binary":
            return value.toString(2);
        case "octal":
            return value.toString(8);
        case "decimal":
            return value.toString();
        case "hexadecimal":
            return value.toString(16).toUpperCase();
        default:
            return "";
    }
}

// Función principal para realizar cálculos y mostrar resultados
function calculateResult() {
    var calculatorType = document.querySelector(".calculator-container__select").value;
    var num1 = document.querySelector(".data-input__input--num1").value;
    var num2 = document.querySelector(".data-input__input--num2").value;
    var operator = document.querySelector(".operation-buttons__button.active").textContent;
    var result = 0;

    // Validar números según el sistema numérico seleccionado
    function getValidNumberCharacters(calculatorType) {
        switch (calculatorType) {
            case "binary":
                return /^[01]+$/;
            case "octal":
                return /^[0-7]+$/;
            case "decimal":
                return /^-?\d+(\.\d+)?$/; // Permitir números decimales
            case "hexadecimal":
                return /^[0-9A-Fa-f]+$/;
            default:
                return null;
        }
    }

    // Validar que los números sean válidos
    var validNumberCharacters = getValidNumberCharacters(calculatorType);
    if (!validNumberCharacters.test(num1) || !validNumberCharacters.test(num2)) {
        document.querySelector(".result-container__message").textContent = "Por favor ingrese números válidos para el sistema";
        return;
    }

    // Convertir los números al sistema decimal
    num1 = convertToDecimal(num1, calculatorType);
    num2 = convertToDecimal(num2, calculatorType);

    switch (operator) {
        case "Suma (+)":
            result = num1 + num2;
            break;
        case "Resta (-)":
            result = num1 - num2;
            break;
        case "Multiplicación (*)":
            result = num1 * num2;
            break;
        case "División (/)":
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
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
            document.querySelector(".result-container__message").textContent = "Operación no válida.";
            return;
    }

    var binaryResult = convertFromDecimal(result, "binary");
    var octalResult = convertFromDecimal(result, "octal");
    var hexadecimalResult = convertFromDecimal(result, "hexadecimal");

    var decimalResult = result.toFixed(3);

    var message = "";
    if (
        (binaryResult.includes(".") ||
            octalResult.includes(".") ||
            hexadecimalResult.includes("."))
    ) {
        message =
            "El resultado contiene decimales y no se puede mostrar en binario, octal o hexadecimal.";
        binaryResult = "";
        octalResult = "";
        hexadecimalResult = "";
    }

    document.querySelector(".result-container__text--bin").value = binaryResult;
    document.querySelector(".result-container__text--oct").value = octalResult;
    document.querySelector(".result-container__text--dec").value = decimalResult;
    document.querySelector(".result-container__text--hex").value = hexadecimalResult;
    document.querySelector(".result-container__message").textContent = message;
}

// Función para activar el botón de operación seleccionado
function activateOperationButton(operation) {
    var operationButtons = document.querySelectorAll(".operation-buttons__button");
    operationButtons.forEach(function (button) {
        button.classList.remove("active");
    });
    document.getElementById(operation).classList.add("active");
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
