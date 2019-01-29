const { app, BrowserWindow, autoUpdater, Notification} = require('electron');
const electron = require('electron');
const isDev = require('electron-is-dev');

app.setAppUserModelId("com.squirrel.quark.Quark")

if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}

if (require('electron-squirrel-startup')) return app.quit();
  
let win
  
function perc(percentage, number) {
  return (number / 100) * percentage;
}

function createWindow (width, height) {
  win = new BrowserWindow({
    width: isDev ? Math.ceil(perc(20.833, width)) * 2 : Math.ceil(perc(20.833, width)),
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

  if (isDev) { win.openDevTools() }

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
})