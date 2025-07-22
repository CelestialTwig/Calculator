function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    return operator(num1,num2)
}

let display = document.querySelector(".display");
const buttons = document.querySelectorAll(".numbers button");
const equals = document.querySelector("#equals");
const clearButton = document.getElementById("clear");
const addButton = document.getElementById("add-button");
const multiplyButton = document.getElementById("multiply-button");
const subtractButton = document.getElementById("subtract-button");
const divideButton = document.getElementById("divide-button");

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;
let resultDisplayed = false;

function roundResult(num) {
    if (Number.isInteger(num)) return num;
    return Math.round(num * 1e6) / 1e6;
}

function showError(message) {
    display.textContent = message;
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    resultDisplayed = true;
}

function resetCalculator() {
    display.textContent = "";
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    resultDisplayed = false;
}

function handleNumberInput(num) {
    if (resultDisplayed) {
        display.textContent = num;
        resultDisplayed = false;
        firstNumber = null;
        secondNumber = null;
        currentOperator = null;
        waitingForSecondNumber = false;
        return;
    }
    if (waitingForSecondNumber) {
        display.textContent = num;
        waitingForSecondNumber = false;
    } else {
        if (display.textContent === "0") {
            display.textContent = num;
        } else {
            display.textContent += num;
        }
    }
}

buttons.forEach(function(button) {
    button.onclick = function() {
        handleNumberInput(button.textContent);
    };
});

clearButton.onclick = function() {
    resetCalculator();
};

function handleOperator(opFunc) {
    if (currentOperator && !waitingForSecondNumber) {
        secondNumber = parseFloat(display.textContent);
        if (currentOperator === divide && secondNumber === 0) {
            showError("Nice try. Can't divide by zero!");
            return;
        }
        let result = operate(currentOperator, firstNumber, secondNumber);
        result = roundResult(result);
        display.textContent = result;
        firstNumber = result;
        resultDisplayed = true;
    } else if (!currentOperator) {
        firstNumber = parseFloat(display.textContent);
    }
    currentOperator = opFunc;
    waitingForSecondNumber = true;
    resultDisplayed = false;
}

addButton.onclick = function() {
    if (waitingForSecondNumber) {
        currentOperator = add;
        return;
    }
    handleOperator(add);
};

subtractButton.onclick = function() {
    if (waitingForSecondNumber) {
        currentOperator = subtract;
        return;
    }
    handleOperator(subtract);
};

divideButton.onclick = function() {
    if (waitingForSecondNumber) {
        currentOperator = divide;
        return;
    }
    handleOperator(divide);
};

multiplyButton.onclick = function() {
    if (waitingForSecondNumber) {
        currentOperator = multiply;
        return;
    }
    handleOperator(multiply);
};

equals.onclick = function() {
    if (!currentOperator || waitingForSecondNumber) {
        return;
    }
    secondNumber = parseFloat(display.textContent);
    if (currentOperator === divide && secondNumber === 0) {
        showError("Nice try. Can't divide by zero!");
        return;
    }
    let result = operate(currentOperator, firstNumber, secondNumber);
    result = roundResult(result);
    display.textContent = result;
    firstNumber = result;
    secondNumber = null;
    currentOperator = null;
    resultDisplayed = true;
    waitingForSecondNumber = false;
}










