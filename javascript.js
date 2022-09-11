const buttons = document.getElementsByTagName('button');
const clearButton = document.getElementById('clear');
const screen = document.getElementById('screen');
const littleScreen = document.getElementById('little-screen');

const buttonsArray = Array.from(buttons);
const chiffres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "x", "/"];
let previousOperatorPressed = "C";
let currentOperator = "";
let lastButtonPressed = "";
let firstNumber = "";
let secondNumber = "";

// ajoute un event listener pour chaque bouton de la calculatrice
buttonsArray.forEach(addEventListener('mousedown', displayText));

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

// fonction pour clear l'écran
function clearScreen()  {
    screen.textContent = "0";
    littleScreen.textContent = "";
    previousOperatorPressed = "C";    
    lastButtonPressed = "C";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
}

// fonction pour ajouter un chiffre
function addNumber(e)    { 
    secondNumber = "";

    if (operators.includes(lastButtonPressed)) {   // si l'utilisateur a cliqué sur un opérateur ("+", "-", "x", "/") avant de cliquer sur ce bouton
        screen.textContent = e.target.textContent;  // on remplace le nombre actuellement affiché sur l'écran par le nouveau chiffre choisi
        lastButtonPressed = e.target.textContent;
    }
    else    {                               // SINON
        if (screen.textContent == "0")  {   // si l'écran affiche "0", on le remplace par le nouveau chiffre
            screen.textContent = e.target.textContent;
            lastButtonPressed = e.target.textContent;
        }
        else    {                           // sinon on ajoute le nouveau chiffre au chiffre déjà affiché sur l'écran
            screen.textContent += e.target.textContent;
            lastButtonPressed = e.target.textContent;
        }
    }        
}

// fonction qui lance l'éxécution de l'opération lorsque l'utilisateur clique sur "="
function SetOperation() {
    console.log("first number : " + firstNumber);
    console.log("second number : " + secondNumber);

    if (secondNumber == "") {
        secondNumber = screen.textContent;
    }

    if (firstNumber == "")   {
        littleScreen.textContent = "0 =";
    }
    else if (previousOperatorPressed != "=")   {        
        littleScreen.textContent = firstNumber + " " + currentOperator + " " + secondNumber;
        operate(currentOperator, Number(firstNumber), Number(secondNumber));   
        firstNumber = screen.textContent;
    }
    else    {    
        littleScreen.textContent = firstNumber + " " + currentOperator + " " + secondNumber;
        operate(currentOperator, Number(firstNumber), Number(secondNumber));    
        firstNumber = screen.textContent;
    }
    previousOperatorPressed = "=";
    lastButtonPressed = "=";
}


// fonction qui stocke dans une variable quel opérateur a été choisi
function setOperator(e)  { 
    previousOperatorPressed = currentOperator;
    currentOperator = e.target.textContent;
    secondNumber = "";
    
    if (firstNumber == "")  {   // si le premier nombre n'a pas encore été choisi 
        firstNumber = screen.textContent;
        littleScreen.textContent = screen.textContent + " " + currentOperator;
    }
    else if (lastButtonPressed == '=')  {
        littleScreen.textContent = firstNumber + " " + currentOperator;
    }
    else    {   // si l'utilisateur a déjà choisi un premier nombre (s'il clique directement sur un opérateur le premier nombre devient '0')
        if (operators.includes(lastButtonPressed))  {
            littleScreen.textContent = firstNumber + " " + currentOperator;
        }
        else    {
            secondNumber = screen.textContent;
            operate(previousOperatorPressed, Number(firstNumber), Number(secondNumber));    
            firstNumber = screen.textContent;
            littleScreen.textContent = firstNumber + " " + currentOperator;
            secondNumber = ""; 
        }
    }
    lastButtonPressed = e.target.textContent;
}


// crée les fonctions de calcul
function sum(a, b)  {
    screen.textContent = a + b;
}

function subtract(a, b) {
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