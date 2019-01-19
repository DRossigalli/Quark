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

let easterQ = document.querySelector('.easter_egg');
easterQ.addEventListener('click', () => {
    easterQ.innerHTML = 'Escondi outro Easter Egg, já achou?'
})
function createWindow(width, height) {
    let win;
     if (width == 1600 && height == 900) {
        win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            resizable: false,
            titleBarStyle: 'customButtonsOnHover',
            show: false,
            backgroundColor: '#1f1f1f',
            minimizable: 'true',
            icon: __dirname + '/Quark.ico',
            acceptFirstMouse: true
        })
        //1600x900
    } else if (width == 1366 && height == 768) {
        win = new BrowserWindow({
            width: 325,
            height: 500,
            frame: false,
            resizable: false,
            titleBarStyle: 'customButtonsOnHover',
            show: false,
            backgroundColor: '#1f1f1f',
            minimizable: 'true',
            icon: __dirname + '/Quark.ico',
            acceptFirstMouse: true
        })
        //1366x720
    } else if (width == 1270 && height == 720) {
        win = new BrowserWindow({
            width: 400,
            height: 600,
            frame: false,
            resizable: false,
            titleBarStyle: 'customButtonsOnHover',
            show: false,
            backgroundColor: '#1f1f1f',
            minimizable: 'true',
            icon: __dirname + '/Quark.ico',
            acceptFirstMouse: true
        })
        //720p
    } else {
        win = new BrowserWindow({
            width: 400,
            height: 600,
            frame: false,
            resizable: false,
            titleBarStyle: 'customButtonsOnHover',
            backgroundColor: '#1f1f1f',
            minimizable: 'true',
            icon: '../Quark.ico',
            acceptFirstMouse: true
        })
        //1080p >
    }

    // win.openDevTools();

    win.loadFile('src/index.html')

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        win = null
    })
}


function windowSize() {
    console.log('ta funcionando');
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
