const calculator = {
    currentInput: "",
    dom: {
        screen: document.querySelector('#screen-text'),
        keyboardListener: document.querySelector('#keyboard-listener')
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
    if (b === 0) {
        return "Nice try, bucko.";
    }
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

// if there is already an operator, replace it instead of adding another
function checkOperators(input) {
    switch(input.slice(input.length - 1)) {
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.currentInput = input.slice(0, input.length - 2);
            break;
        case '.':
            calculator.currentInput = input.slice(0, input.length - 1);
        default: 
            break;
    }
}

// reset calculator to blank
function clearInput() {
    calculator.currentInput = "";
    calculator.dom.screen.textContent = "";
}
// remove last value, and space if necessary 
function backspace() {
    if (calculator.currentInput.slice(calculator.currentInput.length - 2, calculator.currentInput.length - 1) === ' ') {
        calculator.currentInput = calculator.currentInput.slice(0, calculator.currentInput.length - 2);
    } else {
        calculator.currentInput = calculator.currentInput.slice(0, calculator.currentInput.length - 1);
    }
    calculator.dom.screen.textContent = calculator.currentInput;
}

// determine operator and operand; then, call proper operate() function 
function parseInput() {
    let inputs = calculator.currentInput.split(' ');

    // this is to fix an issue where negative first operand added another item at the beginning of the array 
    if (inputs.includes("")) {
        inputs.shift();
    }

    let operand1, operand2, operator;

    try {
        operator = inputs[1];

        if (inputs[0].includes('.')) {
            operand1 = parseFloat(inputs[0]);
        } else {
            operand1 = parseInt(inputs[0]);
        }

        if (inputs[2].includes('.')) {
            operand2 = parseFloat(inputs[2]);
        } else {
            operand2 = parseInt(inputs[2]);
        }
    } catch (err) {
        // assign sensible values to missing ones
        if (!operand1) {
            operand1 = 0;
        }
        if (!operator) {
            operator = "+";
        }
        if (!operand2) {
            switch(operator) {
                case '/':
                case '*':
                    operand2 = 1;
                    break;
                default: 
                    operand2 = 0;
            }
        }
    }

    let result = operate(operand1, operand2, operator).toString();

    // update the data and screen with the result
    calculator.dom.screen.textContent = result;
    calculator.currentInput = result;
}

// returns true if there is already an operator in the middle
function tooManyOperators() {
    let parts = calculator.currentInput.split(' ');

    if (parts.length >= 3) {
        return true;
    } else {
        return false;
    }
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
                case '*':
                case '/':
                    appendThis = " " + val.toString(); 
                    break;
                case '-':
                    if (calculator.currentInput.length > 2 && !calculator.currentInput.slice(0, calculator.currentInput.length - 2).includes(" ")) {
                        appendThis = " " + val.toString();
                        break;
                    }
                    switch (calculator.currentInput.slice(calculator.currentInput.length - 2))  {
                        case '+':
                        case '*':
                        case '/':
                        case '-':
                            appendThis = val.toString(); 
                            break;
                        default: 
                            appendThis = " " + val.toString();
                    }
                default:
                    appendThis = val.toString();
            }
            break;
        case '.': 
            checkOperators(calculator.currentInput);
            appendThis = val;
            break;
        case '-':
            if (calculator.currentInput.length === 0) {
                appendThis = val;
            } else if (tooManyOperators()) {
                parseInput();
                appendThis = " " + val;
            } else if (typeof calculator.currentInput[calculator.currentInput.length - 1] !== 'number') {
                appendThis = " " + val;
            } 
            break;
        default:
            if (tooManyOperators()) {
                parseInput();
            }

            checkOperators(calculator.currentInput);
            appendThis = " " + val; 
    }

    // if last calculation was divide by 0, reset the screen before proceeding:
    if (calculator.currentInput === "Nice try, bucko.") {
        calculator.currentInput = "";
    }

    calculator.currentInput += appendThis;

    // display on screen: 
    calculator.dom.screen.textContent = calculator.currentInput;
}

// handle keyboard input 
function handleKeyboard(event) {
    switch(event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            appendValue(parseInt(event.key));
            break;
        case '/':
        case '*':
        case '-':
        case '+':
        case '.':
            appendValue(event.key);
            break;
        case '=':
        case 'Enter':
            parseInput();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'Delete':
            clearInput();
            break;
    }
}

// event listener
document.addEventListener('keydown', handleKeyboard);