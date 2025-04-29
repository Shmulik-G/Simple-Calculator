let currentInput = '';
let operator = '';
let firstNumber = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById('result').value = currentInput;
}

function performOperation(op) {
    if (currentInput === '') return;
    firstNumber = currentInput;
    operator = op;
    currentInput = '';
}

async function calculateResult() {
    if (firstNumber === '' || currentInput === '' || operator === '') return;

    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstNumber,
            operator,
            secondNumber: currentInput,
        }),
    });

    const data = await response.json();
    if (data.result !== undefined) {
        document.getElementById('result').value = data.result;
        currentInput = data.result.toString();
        firstNumber = '';
        operator = '';
    } else {
        alert(data.error);
    }
}


function clearResult() {
    currentInput = '';
    operator = '';
    firstNumber = '';
    document.getElementById('result').value = '';
}
