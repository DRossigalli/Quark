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

/* TODO

backspace

*/

window.addEventListener('keyup', function (event) {
    let key = event.key;

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
                if (mainDisplay.textContent.search('.') == -1) {
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
        firstNum = undefined;
        operator = undefined;
        secondNum = undefined;
        result = undefined;
        mainDisplay.style.fontSize = '50px';
    }
    //Deleta o último digito
    if (key == 'Backspace') {
        let mainDisplayString = mainDisplay.textContent.toString();
        //Verifica se tem resultado
        if (result == undefined) { //Não tem resultado
            //Verifica se é o ultimo digito na tela
            if (mainDisplayString.length == 1) { //É o ultimo digito
                mainDisplay.textContent = '0';
            } else { //Não é o útimo digito
                mainDisplayString = mainDisplayString.slice(0, mainDisplayString.length - 1);
                mainDisplay.textContent = mainDisplayString;
            }
        } else { //Tem resultado
            mainDisplay.textContent = '0';
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
        } else if (smileyCounter >= 50 && smileyCounter < 100) {
            mainDisplay.textContent = ':O';
        } else if (smileyCounter > 100) {
            mainDisplay.textContent = 'Chega :(';
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
    if (event.target.matches('button')) {
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
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }

            if (mainDisplay.textContent === '0') {
                mainDisplay.textContent = keyContent;
                secondDisplay.textContent += keyContent;
            } else {
                mainDisplay.textContent += keyContent;
                secondDisplay.textContent += keyContent;
            }
        }
        //Se for um operador
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            key.classList.add('active');

            if (result == undefined) {
                if (keyContent == '*') {
                    secondDisplay.textContent += ' × ';
                } else if (keyContent == '/') {
                    secondDisplay.textContent += ' / ';
                } else {
                    secondDisplay.textContent += ' ' + keyContent + ' ';
                }
            } else if (result != undefined) {
                if (enterPressed) {
                    if (keyContent == '*') {
                        secondDisplay.textContent += result +  ' × ';
                    } else if (keyContent == '/') {
                        secondDisplay.textContent += result + ' / ';
                    } else {
                        secondDisplay.textContent += result + ' ' + keyContent + ' ';
                    }
                } else {
                    if (keyContent == '*') {
                        secondDisplay.textContent += ' × ';
                    } else if (keyContent == '/') {
                        secondDisplay.textContent += ' / ';
                    } else {
                        secondDisplay.textContent += ' ' + keyContent + ' ';
                    }
                }
            }

            if (operator != undefined) {
                mainDisplay.textContent = '0';
                var result = calculate(firstNum, operator, secondNum);
                firstNum = result;
                operator = key.textContent;
                secondNum = undefined;
            } else {
                firstNum = mainDisplay.textContent;
                operator = key.textContent;
                mainDisplay.textContent = '0';
            }
        }
        //Se for um decimal
        if (action === 'decimal') {
            if (mainDisplay.textContent == '0') {
                secondDisplay.textContent += '0.';
            }
            mainDisplay.textContent = mainDisplay.textContent + '.';
        }
        //Se for o botão clear
        if (action === 'clear') {
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            mainDisplay.textContent = '0';
            secondDisplay.textContent = '';
            firstNum = undefined;
            operator = undefined;
            secondNum = undefined;
            result = undefined;
        }
        //Botão de "="
        if (action === 'calculate') {
            smileyCounter++;
            for (var i = 0; i < operatorKeys.length; i++) {
                operatorKeys[i].classList.remove('active');
            }
            if (smileyCounter >= 10) {
                mainDisplay.textContent = ':)'
            }

            if (operator !=  undefined) {
                secondNum = mainDisplay.textContent;
                const result = calculate(firstNum, operator, secondNum);
                secondDisplay.textContent += ' ' + key.textContent + ' ';
                mainDisplay.textContent = result;
            }
            firstNum = undefined;
            operator = undefined;
            secondNum = undefined;
            enterPressed = true;
        }
    }
})