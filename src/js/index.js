const { remote } = require('electron');
const electron = require('electron');
const win = remote.getCurrentWindow();
const { BrowserWindow } = require('electron').remote;

const electronScreen = electron.screen.getPrimaryDisplay().size;
var screenHeight = electronScreen.height;
var screenWidth = electronScreen.width;

/* TODO

Exponente
porcentagem
raiz
regra de três
menu rodapé
telas multiplas --done

MAIS PRA FRENTE
formulas prontas
conversão de bases
Easter egg

*/

function perc(percentage, number) {
    return (number / 100) * percentage;
}

let easterQ = document.querySelector('.easter_egg');
easterQ.addEventListener('click', () => {
    easterQ.innerHTML = 'Escondi outro Easter Egg, já achou?'
})
function createWindow(width, height) {
    let win;

    win = new BrowserWindow({
        width: Math.ceil(perc(20.833, width)),
        height: Math.ceil(perc(55.555, height)),
        frame: false,
        resizable: false,
        titleBarStyle: 'customButtonsOnHover',
        show: false,
        backgroundColor: '#1f1f1f',
        minimizable: 'true',
        icon: __dirname + '/Quark.ico',
        acceptFirstMouse: true
    })

    //  win.openDevTools();

    win.loadFile('src/index.html')

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        win = null
    })
}


function windowSize() {
    console.log(screenHeight, screenWidth)
    createWindow(screenWidth, screenHeight);
    // createWindow(1366, 768);
}

function closeApp(opt) {
    if (opt == 1) {
        win.close()
    } else {
        win.minimize();
    }
}
