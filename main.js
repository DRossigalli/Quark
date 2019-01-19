const { app, BrowserWindow} = require('electron');
const electron = require('electron');

if (require('electron-squirrel-startup')) return app.quit();

let win

function perc(percentage, number) {
  return (number / 100) * percentage;
}

function createWindow (width, height) {
  //  if (width == 1600 && height == 900) {
  //   win = new BrowserWindow({
  //     width: 400,
  //     height: 600,
  //     frame: false,
  //     resizable: false,
  //     titleBarStyle: 'customButtonsOnHover',
  //     show: false,
  //     backgroundColor: '#1f1f1f',
  //     minimizable: 'true',
  //     icon: __dirname + '/Quark.ico',
  //     acceptFirstMouse: true
  //   })
  //   //1600x900
  // } else if (width == 1366 && height == 768) {
  //   win = new BrowserWindow({
  //     width: 325,
  //     height: 500,
  //     frame: false,
  //     resizable: false,
  //     titleBarStyle: 'customButtonsOnHover',
  //     show: false,
  //     backgroundColor: '#1f1f1f',
  //     minimizable: 'true',
  //     icon: __dirname + '/Quark.ico',
  //     acceptFirstMouse: true
  //   })
  //   //1366x720
  // } else if (width == 1270 && height == 720) {
  //   win = new BrowserWindow({
  //     width: 400,
  //     height: 600,
  //     frame: false,
  //     resizable: false,
  //     titleBarStyle: 'customButtonsOnHover',
  //     show: false,
  //     backgroundColor: '#1f1f1f',
  //     minimizable: 'true',
  //     icon: __dirname + '/Quark.ico',
  //     acceptFirstMouse: true
  //   })
  //   //720p
  // } else {
  //   win = new BrowserWindow({
  //     width: 400,
  //     height: 600,
  //     frame: false,
  //     resizable: false,
  //     titleBarStyle: 'customButtonsOnHover',
  //     show: false,
  //     backgroundColor: '#1f1f1f',
  //     minimizable: 'true',
  //     icon: __dirname + '/Quark.ico',
  //     acceptFirstMouse: true
  //   })
  //   //1080p
  // }
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

  //win.openDevTools();

  win.once('ready-to-show', () => {
    win.show()
  })

  win.loadFile('src/index.html')

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', () => {
  const electronScreen = electron.screen.getPrimaryDisplay().size;
  const screenHeight = electronScreen.height;
  const screenWidth = electronScreen.width;
  console.log(screenWidth, screenHeight);
  createWindow(screenWidth, screenHeight);
});

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