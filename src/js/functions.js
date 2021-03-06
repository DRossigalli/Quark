const mainDisplay = document.querySelector('#result_screen');
const secondDisplay = document.querySelector('.result_top');
const keys = document.querySelector('.grid_container');
const operatorKeys = document.querySelectorAll('.operator');
let firstNum;
let operator;
let secondNum;
let result;
let enterPressed = false;
let smileyCounter = 0;
let backspaceCount = 0;

function clearEverything() {
    mainDisplay.style.fontSize = '50px';
    firstNum = undefined;
    operator = undefined;
    secondNum = undefined;
    result = undefined;
    enterPressed = false;
}

window.addEventListener('keyup', function (event) {
    let key = event.key;
    console.log(key)

    //Controla o tamanho da letra
    if (mainDisplay.textContent.toString().length > 10) {
        mainDisplay.style.fontSize = '30px';
    } else {
        mainDisplay.style.fontSize = '50px';
    }

    //Recarrega a calculadora
    if (key == 'f' || key == 'F') {
        location.reload();
    }
    //Ao apertar algum digito
    if (key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9' || key == '0' || key == ',' || key == '.') {
        event.preventDefault();
        //Verifica se tem ou não um "0" na tela
        if (mainDisplay.textContent == '0') {
            //Se tiver "0" e um decimal for pressionado
            if (key == ',' || key == '.') {
                mainDisplay.textContent = '0.';
                secondDisplay.textContent += '0.'
            } else { //Nenhum decimal foi pressionado
                mainDisplay.textContent = key;
                secondDisplay.textContent += key;
            }
        } else { //Não tem "0" na tela
            //Se não tiver "0" e um decimal for pressionado
            if (key == ',' || key == '.') {
                if (mainDisplay.textContent.indexOf('.') == -1) {
                    mainDisplay.textContent += '.';
                    secondDisplay.textContent += '.';
                }
            } else { //Nenhum decimal foi pressionado
                mainDisplay.textContent += key;
                secondDisplay.textContent += key;
            }
        }
    }
    //Ao apertar um operador
    if (key == '+' || key == '-' || key == '*' || key == '/') {
        event.preventDefault();
        //Manipulação do secondDisplay
        //Verifica se tem ou não um resultado
        if (result == undefined) { //Não tem resultado
            if (key == '*') {
                secondDisplay.textContent += ' × ';
            } else if (key == '/') {
                secondDisplay.textContent += ' ÷ ';
            } else {
                secondDisplay.textContent += ' ' + key + ' ';
            }
        } else  { //Tem resultado
            //Se tiver resultado e enter tiver sido pressionado
            if (enterPressed) { //Enter pressionado
                enterPressed = false;
                if (key == '*') {
                    secondDisplay.textContent += result + ' × ';
                } else if (key == '/') {
                    secondDisplay.textContent += result + ' ÷ ';
                } else {
                    secondDisplay.textContent += result + ' ' + key + ' ';
                }
            } else { //Enter não pressionado
                if (key == '*') {
                    secondDisplay.textContent += ' × ';
                } else if (key == '/') {
                    secondDisplay.textContent += ' ÷ ';
                } else {
                    secondDisplay.textContent += ' ' + key + ' ';
                }
            }
        }

        //Verifica se o operador foi definido
        if (operator != undefined) { //Operador definido
            secondNum = mainDisplay.textContent;
            mainDisplay.textContent = '0';
            result = calculate(firstNum, operator, secondNum);
            firstNum = result;
            operator = key;
            secondNum = undefined;
        } else { //Operador não definido
            firstNum = mainDisplay.textContent;
            operator = key;
            mainDisplay.textContent = '0';
        }
    }
    //Limpa tudo
    if (key == 'c' || key == 'Delete') {
        for (var i = 0; i < operatorKeys.length; i++) {
            operatorKeys[i].classList.remove('active');
        }
        event.preventDefault();
        mainDisplay.textContent = '0';
        secondDisplay.textContent = '';
        clearEverything();
        mainDisplay.style.fontSize = '50px';
    }
    //Deleta o último digito
    if (key == 'Backspace') {
        let mainDisplayString = mainDisplay.textContent.toString();
        let secondDisplayString = secondDisplay.textContent.toString();
        backspaceCount = mainDisplayString.length;
        
        //Verifica se tem resultado
        if (enterPressed) { //Tem resultado
            secondDisplay.textContent = ' ';
            mainDisplay.textContent = '0';
            clearEverything();
        } else {
            //Verifica se é o ultimo digito na tela
            if (mainDisplayString.length == 1) { //É o ultimo digito
                mainDisplay.textContent = '0';
            } else { //Não é o útimo digito
                mainDisplayString = mainDisplayString.slice(0, mainDisplayString.length - 1);
                mainDisplay.textContent = mainDisplayString;
            }

            if (backspaceCount > 0 && mainDisplayString != 0) {
                secondDisplayString = secondDisplayString.slice(0, secondDisplayString.length - 1);
                secondDisplay.textContent = secondDisplayString;
                backspaceCount -= 1;
            }
        }

        
    }
    //Calcula
    if (key == 'Enter') {
        event.preventDefault();
        smileyCounter++;

        for (var i = 0; i < operatorKeys.length; i++) {
            operatorKeys[i].classList.remove('active');
        }
        //Easter Egg
        if (smileyCounter >= 10 && smileyCounter < 50) {
            mainDisplay.textContent = ':)';
        }
        
        //Verifica se tem operador definido
        if (operator != undefined) {
            secondNum = mainDisplay.textContent;
            result = calculate(firstNum, operator, secondNum);
            mainDisplay.textContent = result;
            secondDisplay.textContent += ' = ';
        }

        enterPressed = true;
        firstNum = undefined;
        operator = undefined;
        secondNum = undefined;
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

keys.addEventListener('click', function (event) {
    if (event.target.matches('button') || event.target.matches('i')) {
        mainDisplay.style.fontSize = '50px';

        let key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        if (mainDisplay.textContent.toString().length > 10) {
            mainDisplay.style.fontSize = '30px';
        } else {
            mainDisplay.style.fontSize = '50px';
        }

        //Se for um número
        if (!action) {
            //Remove .active do operador
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }

            //Se tiver "0" no display
            if (mainDisplay.textContent === '0') {
                mainDisplay.textContent = keyContent;
                if (keyContent != '0') {
                    secondDisplay.textContent += keyContent;
                }
            } else { //Se não tiver "0" no display
                mainDisplay.textContent += keyContent;
                secondDisplay.textContent += keyContent;
            }
        }
        //Se for um operador
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            //Remove .active do operador
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            //Adiciona .active no operador sendo clicado
            key.classList.add('active');

            //Manipulação do secondDisplay
            //Se não tiver um resultado
            if (result == undefined) {
                if (keyContent == '*') {
                    secondDisplay.textContent += ' × ';
                } else if (keyContent == '/') {
                    secondDisplay.textContent += ' / ';
                } else {
                    secondDisplay.textContent += ' ' + keyContent + ' ';
                }
            } else if (result != undefined) { //Se tiver um resultado
                if (enterPressed) { //Se o enter foi pressionado
                    if (keyContent == '*') {
                        secondDisplay.textContent += result +  ' × ';
                    } else if (keyContent == '/') {
                        secondDisplay.textContent += result + ' / ';
                    } else {
                        secondDisplay.textContent += result + ' ' + keyContent + ' ';
                    }
                } else { //Se o enter não foi pressionado
                    if (keyContent == '*') {
                        secondDisplay.textContent += ' × ';
                    } else if (keyContent == '/') {
                        secondDisplay.textContent += ' / ';
                    } else {
                        secondDisplay.textContent += ' ' + keyContent + ' ';
                    }
                }
            }

            //Se não for a primeira vez clicando no operador
            if (operator != undefined) {
                secondNum = mainDisplay.textContent;
                mainDisplay.textContent = '0';
                result = calculate(firstNum, operator, secondNum);
                firstNum = result;
                operator = key.textContent;
                secondNum = undefined;
            } else { //Se for a primeira vez clicando no operador
                firstNum = mainDisplay.textContent;
                operator = key.textContent;
                mainDisplay.textContent = '0';
            }
        }
        //Se for um decimal
        if (action === 'decimal') {
            //Verifica se tem um "0" no display
            if (mainDisplay.textContent == '0') {
                secondDisplay.textContent += '0.';
            }
            mainDisplay.textContent = mainDisplay.textContent + '.';
        }
        //Se for o botão clear
        if (action === 'clear') {
            // for (var i = 0; i < operatorKeys.length; i++) {
            //     operatorKeys[i].classList.remove('active');
            // }
            // mainDisplay.textContent = '0';
            // secondDisplay.textContent = '';
            // clearEverything();

            let mainDisplayString = mainDisplay.textContent.toString();
            let secondDisplayString = secondDisplay.textContent.toString();
            backspaceCount = mainDisplayString.length;

            //Verifica se tem resultado
            if (enterPressed) { //Tem resultado
                secondDisplay.textContent = ' ';
                mainDisplay.textContent = '0';
                clearEverything();
            } else {
                //Verifica se é o ultimo digito na tela
                if (mainDisplayString.length == 1) { //É o ultimo digito
                    mainDisplay.textContent = '0';
                } else { //Não é o útimo digito
                    mainDisplayString = mainDisplayString.slice(0, mainDisplayString.length - 1);
                    mainDisplay.textContent = mainDisplayString;
                }

                if (backspaceCount > 0 && mainDisplayString != 0) {
                    secondDisplayString = secondDisplayString.slice(0, secondDisplayString.length - 1);
                    secondDisplay.textContent = secondDisplayString;
                    backspaceCount -= 1;
                }
            }
        }
        //Botão de "="
        if (action === 'calculate') {
            //Inicio do contador do Easter Egg
            smileyCounter++;
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            if (smileyCounter >= 10) {
                mainDisplay.textContent = ':)'
            }
            //Fim do Easter Egg

            //Se tiver um operador definido
            if (operator !=  undefined) {
                secondNum = mainDisplay.textContent;
                result = calculate(firstNum, operator, secondNum);
                secondDisplay.textContent += ' ' + key.textContent + ' ';
                mainDisplay.textContent = result;
            }

            firstNum = undefined;
            operator = undefined;
            secondNum = undefined;
            enterPressed = true;
            console.log(result);
        }
    }
})