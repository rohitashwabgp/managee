//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  return;
}

const electron = require('electron')
// Module to control application life.
const app = electron.app
const {ipcMain} = require('electron')
var path = require('path')

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
let facebookwindow ;
let twitterwindow ;
let instawindow ;
let googlewindow ;
let youtubewindow ;
let openwindows = [];
ipcMain.on('open-second-window', (event, arg)=> {
  if(arg==="http://www.facebook.com") {
    if(!facebookwindow || facebookwindow.isDestroyed()) {
    facebookwindow = getWindow();
    openwindows.push(facebookwindow);
    facebookwindow.loadURL(arg);
    facebookwindow.show();
    } else {
      facebookwindow.destroy()
    }
  } else if(arg === "http://www.google.com") {
    if(!googlewindow || googlewindow.isDestroyed()) {
    googlewindow = getWindow();
    openwindows.push(googlewindow)
    googlewindow.loadURL(arg)
    googlewindow.show()
    } else{
      googlewindow.destroy()
    }
  } else if(arg === "http://www.instagram.com") {
    if(!instawindow  || instawindow.isDestroyed()) {
    instawindow = getWindow();   
    openwindows.push(instawindow)
    instawindow.loadURL(arg)
    instawindow.show()
    } else{
    instawindow.destroy()
    }
  } else if(arg === "http://www.twitter.com") {
    if(!twitterwindow  || twitterwindow.isDestroyed()) {
    twitterwindow = getWindow();
    openwindows.push(twitterwindow)
    twitterwindow.loadURL(arg)
    twitterwindow.show()
    } else{
    twitterwindow.destroy()
    }
  } else {
    if(!youtubewindow || youtubewindow.isDestroyed()) {
    youtubewindow = getWindow();
    openwindows.push(youtubewindow)
    youtubewindow.loadURL(arg)
    youtubewindow.show()
    } else{
    youtubewindow.destroy() 
    }
  }
})



ipcMain.on('close-second-window', (event, arg)=> {
  openwindows.forEach(window=>{
   if(!window.isDestroyed()) {
    window.destroy();
   } 
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


function getWindow() {
  return new BrowserWindow({
    frame: true,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: false,
    backgroundColor: '#312450',
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true
    }
  })
}