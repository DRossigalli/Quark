const { app, BrowserWindow, autoUpdater, Notification} = require('electron');
const electron = require('electron');
const isDev = require('electron-is-dev');

app.setAppUserModelId("com.squirrel.quark.Quark")

function notTest() {
  if (Notification.isSupported) {
    let not = new Notification({
      title: 'App init'
    })
    not.show();
  }
}


if (isDev) {
  console.log('Running in development');
} else {
  console.log('Running in production');
}

const server = 'hazel-2wl8zeexe.now.sh';
// const feed = `${server}/update/${process.platform}/${app.getVersion()}`
const feed = `${server}/download/${process.platform}`
  
if (isDev) {
   autoUpdater.setFeedURL(feed)
   console.log(autoUpdater.getFeedURL())

  autoUpdater.on('error', (ev, err) => {

  })

  autoUpdater.once('checking-for-update', (ev, err) => {
 
  })

  autoUpdater.once('update-available', (ev, err) => {

  })

  autoUpdater.once('update-not-available', (ev, err) => {

  })


  autoUpdater.once('update-downloaded', (ev, err) => {

  })


  autoUpdater.checkForUpdates()
}
  
if (require('electron-squirrel-startup')) return app.quit();
  
let win
  
function perc(percentage, number) {
  return (number / 100) * percentage;
}

function createWindow (width, height) {
  if (isDev) {
    width = 800;
  } else {
    width = Math.ceil(perc(20.833, width))
  }

  win = new BrowserWindow({
    width: width,
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
  notTest();
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

