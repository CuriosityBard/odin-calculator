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