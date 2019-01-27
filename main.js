const { app, BrowserWindow, BrowserView } = require('electron');
const electron = require('electron');

if (require('electron-squirrel-startup')) return app.quit();


let win

function perc(percentage, number) {
  return (number / 100) * percentage;
}

function createWindow (width, height) {
  win = new BrowserWindow({
    title: 'Quark',
    width: 400, //Math.ceil(perc(20.833, width)),
    height: 660, //Math.ceil(perc(61.111111, height)),
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

  win.loadFile('src/menu/index.html')
  console.log(win.getPosition())

  win.on('closed', () => {
    win = null
  })
}

function createView () {
  let view = new BrowserView({})
  win.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 400, height: 600 });
  view.webContents.loadFile('src/main/index.html');
}

app.on('ready', () => {
  const electronScreen = electron.screen.getPrimaryDisplay().size;
  var screenHeight = electronScreen.height;
  var screenWidth = electronScreen.width;
  createWindow(screenWidth, screenHeight);
  createView();
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
