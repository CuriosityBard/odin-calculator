const calculator = {
    currentInput: "",
    dom: {
        screen: document.querySelector('#screen-text'),
    }
}

// basic arithmetic functions 
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

// to handle values from the calculator
function operate(a, b, op) {
    switch(op) {
        case '/': 
            return divide(a, b);
        case '*':
            return multiply(a, b);
        case '-':
            return subtract(a, b);
        case '+':
            return add(a, b);
    }
}

// if there are two spaces in a string, we want to operate before using the next operator
function checkStringForSpaces(input) {
    let spaceCounter = 0;

    for (char of input) {
        if (char === " ") {
            spaceCounter++
        } 

        if (spaceCounter === 2) {
            parseInput(calculator.currentInput);
        }
    }
}

// reset calculator to blank
function clearInput() {
    calculator.currentInput = "";
    calculator.dom.screen.textContent = "";
}

// determine operator and operand; then, call proper operate() function 
function parseInput() {
    let inputs = calculator.currentInput.split(' ');

    let operand1 = parseInt(inputs[0]);
    let operand2 = parseInt(inputs[2]);

    let operator = inputs[1];

    let result = operate(operand1, operand2, operator).toString();

    // update the data and screen with the result
    calculator.dom.screen.textContent = result;
    calculator.currentInput = result;
}

// to take values from the buttons and add them to the screen
function appendValue(val) {
    let appendThis;
    switch(val) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7: 
        case 8:
        case 9: 
        case 0:
            switch (calculator.currentInput.slice(calculator.currentInput.length - 1)) {
                case '+':
                case '-':
                case '*':
                case '/':
                    appendThis = " " + val.toString(); 
                    break;
                default:
                    appendThis = val.toString();
            }
            break;
        default:
            appendThis = " " + val.toString(); 
    }
    calculator.currentInput += appendThis;

    // display on screen: 
    calculator.dom.screen.textContent = calculator.currentInput;
}