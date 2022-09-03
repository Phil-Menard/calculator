const buttons = document.getElementsByTagName('button');
const clearButton = document.getElementById('clear');
const screen = document.getElementById('screen');

const buttonsArray = Array.from(buttons);
const chiffres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "x", "/"];
let lastButtonPressed = "C";
let operatorSelected = "";
let currentOperator = "";
let firstNumber = "";
let secondNumber = "";

// ajoute un event listener pour chaque bouton de la calculatrice
buttonsArray.forEach(button => addEventListener('mousedown', displayText));

// fonction pour afficher les chiffres sur l'écran
function displayText(e)  {

    if (chiffres.includes(e.target.textContent))   {   // si le bouton cliqué est un chiffre
        addNumber(e);
    }
    else if (e.target.textContent == clearButton.textContent)    {  // si le bouton cliqué est le bouton 'clear'
        clearScreen();
    }
    else if (operators.includes(e.target.textContent))  {   // si le bouton cliqué est un opérateur
        setOperator(e);
    }
    else if (e.target.textContent == "=")   {   // si le bouton cliqué est '='
        SetOperation();
    }
}

// fontion pour clear l'écran
function clearScreen()  {
    screen.textContent = "0";
    lastButtonPressed = "C";    
}

// fonction pour ajouter un chiffre
function addNumber(e)    { 
    if (operatorSelected != "") {   // si l'utilisateur a cliqué sur un opérateur ("+", "-", "x", "/") avant de cliquer sur ce bouton
        screen.textContent = e.target.textContent;  // on remplace le nombre actuellement affiché sur l'écran par le nouveau chiffre choisi
        operatorSelected = ""; 
    }
    else    {                               // SINON
        if (screen.textContent == "0")  {   // si l'écran affiche "0", on le remplace par le nouveau chiffre
            screen.textContent = e.target.textContent;
        }
        else    {                           // sinon on ajoute le nouveau chiffre au chiffre déjà affiché sur l'écran
            screen.textContent += e.target.textContent;
        }
    }        
}

// fonction qui lance l'éxécution de l'opération lorsque l'utilisateur clique sur "="
function SetOperation() {
    if (lastButtonPressed != "=")   {
        secondNumber = screen.textContent;
        operate(currentOperator, Number(firstNumber), Number(screen.textContent));    
        lastButtonPressed = "=";
    }
    else    {
        console.log(operatorSelected);
        // - 100 5  95 5
        if (currentOperator == "-" || currentOperator == "/") {
            operate(currentOperator, Number(screen.textContent), Number(secondNumber));   
            console.log("yoooo");
        }
        else    {
            firstNumber = secondNumber;
            operate(currentOperator, Number(firstNumber), Number(screen.textContent));    
        }
    }
}


// fonction qui stocke dans une variable quel opérateur a été choisi
function setOperator(e)  {
    operatorSelected = e.target.textContent;    
    currentOperator = e.target.textContent;
    firstNumber = screen.textContent;
    console.log("first number : " + firstNumber);

}


// crée les fonctions de calcul
function sum(a, b)  {
    screen.textContent = a + b;
}

function subtract(a, b) {
    console.log("premier nombre = " + a);
    console.log("second nombre = " + b);
    screen.textContent = a - b;
}

function multiply (a, b)    {
    screen.textContent = a * b;
}

function divide(a, b)   {
    screen.textContent = a / b;
}

// fonction qui fait l'opération mathématique avec l'opérateur et les deux nombres en arguments
function operate(operator, a, b)    {

    switch(operator)    {
        case "+":
            return sum(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default: 
            console.log("Veuillez choisir +, -, x ou / pour l'opérateur");
    }

}