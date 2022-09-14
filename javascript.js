// ajoute un event listener pour récupérer les inputs clavier
document.addEventListener('keydown', getInput);

const buttons = document.getElementsByTagName('button');
const clearButton = document.getElementById('clear');
const screen = document.getElementById('screen');
const littleScreen = document.getElementById('little-screen');

const buttonsArray = Array.from(buttons);
const chiffres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "x", "/", "%"];
let previousOperatorPressed = "C";
let currentOperator = "";
let lastButtonPressed = "";
let firstNumber = "";
let secondNumber = "";

// ajoute un event listener pour chaque bouton de la calculatrice
for (let i = 0; i < buttonsArray.length; i++)   {
    buttonsArray[i].addEventListener('mousedown', displayText);
}

// fonction pour afficher les calculs sur l'écran lorsque l'utilisateur clique sur un bouton
function displayText(e)  {

    if (chiffres.includes(e.target.textContent) || e.target.textContent == ".")   {   // si le bouton cliqué est un chiffre
        addNumber(e.target.textContent);
    }
    else if (e.target.textContent == clearButton.textContent)    {  // si le bouton cliqué est le bouton 'clear'
        clearScreen();
    }
    else if (operators.includes(e.target.textContent))  {   // si le bouton cliqué est un opérateur
        setOperator(e.target.textContent);
    }
    else if (e.target.textContent == "=")   {   // si le bouton cliqué est '='
        setOperation();
    }
    else if (e.target.textContent == "del") {
        removeLastNumber();
    }
    else if (e.target.textContent == "+/-") {
        changeSign();    }
}

function changeSign()  {
    if (Math.sign(Number(screen.textContent)) == 1) {   // si le nombre affiché à l'écran est positif
        screen.textContent = -Math.abs(Number(screen.textContent));
    }
    else if (Math.sign(Number(screen.textContent)) == -1) {   // si le nombre affiché à l'écran est négatif
        screen.textContent = Math.abs(Number(screen.textContent));
    }
}

// fonction pour afficher les calculs sur l'écran lorsque l'utilisateur appuie sur un bouton du clavier
function getInput(e)    {
    if (e.key == "Enter")   {
        setOperation();
    }
    else if (chiffres.includes(e.key))  {
        addNumber(e.key);
    }
    else if (operators.includes(e.key) || e.key == "*") {
        if (e.key == "*")   {   
            setOperator("x");
        }
        else    {
            setOperator(e.key);
        }            
    }
    else if (e.key == "Escape") {
        clearScreen();
    }
    else if (e.key == "Backspace") {
        removeLastNumber();
    }
     else if (e.key == ".") {
         addNumber(e.key);
     }
}

function removeLastNumber() {
    if (chiffres.includes(lastButtonPressed))   {
        let str = screen.textContent;
        screen.textContent = str.slice(0, -1);
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
function addNumber(value)    { 
    secondNumber = "";

    if (operators.includes(lastButtonPressed)) {   // si l'utilisateur a cliqué sur un opérateur ("+", "-", "x", "/") avant de cliquer sur ce bouton
        screen.textContent = value;  // on remplace le nombre actuellement affiché sur l'écran par le nouveau chiffre choisi
    }
    else    { 
        if (screen.textContent.includes('.')) {
            if (value != ".")   {
                screen.textContent += value;
            }
        }
        else    {
            if (screen.textContent == "0")  {   // si l'écran affiche "0", on le remplace par le nouveau chiffre
                screen.textContent = value;
            }
            else    {                           // sinon on ajoute le nouveau chiffre au chiffre déjà affiché sur l'écran
                if (value == "+/-") {
                    changeSign();
                }
                else    {
                    screen.textContent += value;
                }
            }
        }                      
    }        
    lastButtonPressed = value;
}

// fonction qui lance l'éxécution de l'opération lorsque l'utilisateur clique sur "="
function setOperation() {

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
function setOperator(value)  { 
    previousOperatorPressed = currentOperator;
    currentOperator = value;
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
    lastButtonPressed = value;
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

function modulo(a, b)   {
    screen.textContent = a % b;
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
        case "%":
            return modulo(a, b);
        default: 
            console.log("Veuillez choisir +, -, x ou / pour l'opérateur");
    }

}