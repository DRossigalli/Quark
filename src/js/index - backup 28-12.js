const { remote } = require('electron');
var win = remote.getCurrentWindow();
const { BrowserWindow } = require('electron').remote

/* TODO

Exponente
porcentagem
raiz
telas multiplas

MAIS PRA FRENTE
formulas prontas
conversão de bases
Easter egg

*/
function createWindow() {
    let newWin = new BrowserWindow({ 
        width: 800,
        height: 600,
        frame: false,
        resizable: false,
        titleBarStyle: 'customButtonsOnHover',
        show: false,
        backgroundColor: '#1f1f1f',
        minimizable: 'true',
        icon: __dirname + '../Quark.png'
    })
    newWin.on('closed', () => {
        newWin = null
    })
    
    newWin.loadURL(`../index.html`);
}

function closeApp(opt) {
    if (opt == 1) {
        win.close()
    } else {
        win.minimize();
    }
}

let menuActive = false;
function dropdownMenu() {
    const menu = document.querySelector('.dropdown_menu');
    if (menuActive) {
        menu.style.left = '-80vw';
        menuActive = false;
    } else {
        menu.style.left = '0';
        menuActive = true;
    }
}

const bg = document.querySelector('#BG');
const btnNumbers = document.querySelectorAll('.number');
for (var i = 0; i < btnNumbers.length; i++) {
    btnNumbers[i].style.background = localStorage.getItem('keyboardColor');
    btnNumbers[i].style.color = localStorage.getItem('fontColor');
}
bg.style.background = localStorage.getItem('themeOption');

function darkMode(option) {
    if (option == 0) {
        for (var i = 0; i < btnNumbers.length; i++) {
            btnNumbers[i].style.background = 'white';
            btnNumbers[i].style.color = 'black';
        }
        localStorage.setItem('keyboardColor', 'white');
        localStorage.setItem('fontColor', 'black');
    } else {
        for (var i = 0; i < btnNumbers.length; i++) {
            btnNumbers[i].style.background = 'black';
            btnNumbers[i].style.color = 'white';
            localStorage.setItem('keyboardColor', 'black');
            localStorage.setItem('fontColor', 'white');
        }
    }
}
function themeChange(option) {
    if (option == 1) {
        var theme = bg.style.background = 'linear-gradient(90deg, rgb(90, 0, 90) 0%, rgb(145,8,101) 50%, rgb(255,119,0) 100%)';
        localStorage.setItem('themeOption', theme);
    } else if (option == 2) {
        var theme = bg.style.background = 'linear-gradient(90deg, #DA4453 0%, #DA5653 50%, #89216B 100%)';
        localStorage.setItem('themeOption', theme);
    } else if (option == 3) {
        var theme = bg.style.background = 'linear-gradient(90deg, white 0%, #388AB1 50%, #324069 100%)';
        localStorage.setItem('themeOption', theme);
    } else if (option == 4) {
        var theme = bg.style.background = 'linear-gradient(to right, #bc4e9c, #f80759)';
        localStorage.setItem('themeOption', theme);
    } else if (option == 5) {
        var theme = bg.style.background = 'linear-gradient(to right, #ed213a, #93291e)';
        localStorage.setItem('themeOption', theme);

    } else if (option == 'x') {
        var rgbTable = [];
        for (var i = 0; i < 3; i++) {
            rgbTable[i] = [];

            for (var j = 0; j < 3; j++) {
                rgbTable[i][j] = Math.floor(Math.random() * 255);
            }
        }
        rgbOne = 'rgb(' + rgbTable[0][0] + ', ' + rgbTable[0][1] + ', ' + rgbTable[0][2] + ')';
        rgbTwo = 'rgb(' + rgbTable[1][0] + ', ' + rgbTable[1][1] + ', ' + rgbTable[1][2] + ')';
        rgbThree = 'rgb(' + rgbTable[2][0] + ', ' + rgbTable[2][1] + ', ' + rgbTable[2][2] + ')';

        var theme = bg.style.background = 'linear-gradient(90deg, ' + rgbOne + ' 0%, ' + rgbTwo + ' 50%, ' + rgbThree + ' 100%)';
        localStorage.setItem('themeOption', theme);
    }
}

const display = document.querySelector('#result_screen');
const keys = document.querySelector('.grid_container');
const operatorKeys = document.querySelectorAll('.operator');
let firstNum;
let operator;
let secondNum;

function calculate(val1, operator, val2) {
    val1 = parseInt(val1);
    val2 = parseInt(val2);
    var result;
    if (operator == '+') result =  val1 + val2;
    else if (operator == '-') result =  val1 - val2;
    else if (operator == 'x' || operator == '*') result = val1 * val2;
    else if (operator == '÷' || operator == '/') result = val1 / val2;
    
    resultString = result.toString();
    if (resultString.length > 10) {
        display.style.fontSize = '30px';
    }
    //LOG
    console.log('%cO RESULTADO É = ' + result, 'background: black; color: yellow; padding: 2px;');
    console.log('***************************');
    return result;
}

window.addEventListener('keyup', function (event) {
    let key = event.key;
    console.log(key)
    if (display.textContent.toString().length > 10) {
        display.style.fontSize = '30px';
    } else {
        display.style.fontSize = '50px';
    }
    
    if (key == 'f') {
        location.reload();
    }
    
    if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '0' || key == ',') {
        event.preventDefault();
        if (display.textContent == '0') {
            if(key == ',') {
                display.textContent = '0.';
            } else {
                display.textContent = key;
            }
        } else {
            if (key == ',') {
                display.textContent += '.';
            } else {
                display.textContent += key;
            }
        }
        
        //LOG
        console.log('%cÉ um digito', 'background: purple; color: yellow; padding: 2px;');
    }
    if (key == '+' || key == '-' || key == '*' || key == '/') {
        event.preventDefault();
        if (operator != undefined) {
            secondNum = display.textContent;
            display.textContent = '0';
            var result = calculate(firstNum, operator, secondNum);
            firstNum = result;
            operator = key;
            secondNum = undefined;
            console.log(result)
        } else {
            firstNum = display.textContent;
            operator = key;
            display.textContent = '0';
        }
        
        //LOG
        console.log('%cÉ um operador', 'background: purple; color: yellow; padding: 2px;');
    }
    if (key == 'c' || event.keyCode == '8' || event.keyCode == '46') {
        event.preventDefault();
        display.textContent = '0';
        firstNum = undefined;
        operator = undefined;
        secondNum = undefined;
        display.style.fontSize = '50px';
        
        //LOG
        console.log('%cLimpar!', 'background: purple; color: yellow; padding: 2px;');
    }
    if (key == 'e') {
        let displayString = display.textContent.toString();
        if (displayString.length == 1) {
            display.textContent = '0';
        } else {
            displayString = displayString.slice(0, displayString.length - 1);
            display.textContent = displayString;
        }



        //LOG
        console.log(displayString);
    }
    if (event.keyCode == '13' || event.keyCode == '187') {
        event.preventDefault();
        secondNum = display.textContent;
        display.textContent = calculate(firstNum, operator, secondNum);
        firstNum = undefined;
        operator = undefined;
        secondNum = undefined;

        //LOG
        console.log('%cCalcular!', 'background: purple; color: yellow; padding: 2px;');
    }

    //*****LOG*****
    console.log('%cPRIMEIRO NUMERO = ' + firstNum, 'background: blue; color: yellow; padding: 2px;');
    console.log('%cOPERADOR = ' + operator, 'background: black; color: yellow; padding: 2px;');
    console.log('%cSEGUNDO NUMERO = ' + secondNum, 'background: blue; color: yellow; padding: 2px;');
    console.log('***************************');
})

keys.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        display.style.fontSize = '50px';

        let key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        if (display.textContent.toString().length > 10) {
            display.style.fontSize = '30px';
        } else {
            display.style.fontSize = '50px';
        }

        if (!action) {
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            if (display.textContent === '0') {
                display.textContent = keyContent;
            } else {
                display.textContent += keyContent;
            }
            //LOG
            console.log('%cÉ um digito', 'background: purple; color: yellow; padding: 2px;');
        }
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            if (operator != undefined) {
                key.classList.add('active');
                secondNum = display.textContent;
                display.textContent = '0';
                var result = calculate(firstNum, operator, secondNum);
                firstNum = result;
                operator = key.textContent;
                secondNum = undefined;
                console.log(result)
            } else {
                key.classList.add('active');
                firstNum = display.textContent;
                operator = key.textContent;
                display.textContent = '0';
            }
            //LOG
            console.log('%cÉ um operador', 'background: purple; color: yellow; padding: 2px;');
        }
        if (action === 'decimal') {
            display.textContent = display.textContent + '.';
            //LOG
            console.log('%cÉ um decimal', 'background: purple; color: yellow; padding: 2px;');
        }
        if (action === 'clear') {
            display.textContent = '0';
            firstNum = undefined;
            operator = undefined;
            secondNum = undefined;
            //LOG
            console.log('%cLimpar!', 'background: purple; color: yellow; padding: 2px;');
        }
        if (action === 'calculate') {
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            if (secondNum == undefined) {
                secondNum = display.textContent;
                result = calculate(firstNum, operator, secondNum);
                display.textContent = result;
            } else {
                result = calculate(firstNum, operator, secondNum);
                firstNum = result;
                display.textContent = result;
            }
            firstNum = undefined;
            operator = undefined;
            secondNum = undefined;

            //LOG
            console.log('%cCalcular!', 'background: purple; color: yellow; padding: 2px;');
        }
        //*****LOG FINAL*****
        console.log('%cPRIMEIRO NUMERO = ' + firstNum, 'background: blue; color: yellow; padding: 2px;');
        console.log('%cOPERADOR = ' + operator, 'background: black; color: yellow; padding: 2px;');
        console.log('%cSEGUNDO NUMERO = ' + secondNum, 'background: blue; color: yellow; padding: 2px;');
        console.log('***************************');
    }
})