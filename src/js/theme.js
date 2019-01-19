/*
 TODO

 salvar tema aleatorio

 //Green 
#3F537B #35A26A #7AAC80
 
*/
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
    } else if (option == 6) {
        var theme = bg.style.background = 'linear-gradient(90deg, #3F537B 0%, #35A26A 50%, #7AAC80 100%)';
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