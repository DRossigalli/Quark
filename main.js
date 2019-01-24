const { app, BrowserWindow, autoUpdater} = require('electron');
const electron = require('electron');

if (require('electron-squirrel-startup')) return app.quit();

let win

function perc(percentage, number) {
  return (number / 100) * percentage;
}

function createWindow (width, height) {
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

  // win.openDevTools();

  win.once('ready-to-show', () => {
    win.show();
  })

  win.loadFile('src/index.html')

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  const electronScreen = electron.screen.getPrimaryDisplay().size;
  var screenHeight = electronScreen.height;
  var screenWidth = electronScreen.width;
  createWindow(screenWidth, screenHeight);
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }

  app.setAppUserModelId("com.squirrel.quark.Quark")
})
