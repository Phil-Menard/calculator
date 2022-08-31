const buttons = document.getElementsByTagName('button');
const buttonsArray = Array.from(buttons);
const screenDisplay = document.getElementsByClassName('display');
screenDisplay.textContent = "";
buttonsArray.forEach(button => addEventListener('click', displayText));

// console.log(button.textContent)

// fonction pour display les chiffres

function displayText(e)  {
    screenDisplay.textContent = e.target.textContent;
    console.log(screenDisplay.textContent);
}


// créer les fonctions de calcul

function sum(a, b)  {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b)    {
    return a * b;
}

function divide(a, b)   {
    return a / b;
}

// Create a new function operate that takes an operator and 2 numbers 
// and then calls one of the above functions on the numbers.

function operate(operator, a, b)    {

    switch(operator)    {
        case "+":
            return sum(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default: 
            console.log("Veuillez choisir +, -, * ou / pour l'opérateur");
    }

}