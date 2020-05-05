'use strict'
import child_process from 'child_process'
import { app, protocol, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import path from 'path'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
import fetch from 'node-fetch'
import Store from 'electron-store'
import fs from 'fs'
const store = new Store({fileExtension:"", name:"dat", migrations:require("./db_migrations")});
import VDF from './vdfParser'
var neosDir = store.get("NeosDir")
if (!neosDir) {
  checkNeosDir()
} else {
  if (!fs.existsSync(neosDir)) {
    checkNeosDir()
  }

}
function checkNeosDir() {
  if (fs.existsSync("C:/Program Files (x86)/Steam/steamapps/libraryfolders.vdf")) {
    const steamfolders = VDF.parse(fs.readFileSync("C:/Program Files (x86)/Steam/steamapps/libraryfolders.vdf").toString())
    var neosdir = null
    for (var [key, value] of Object.entries(steamfolders.LibraryFolders)) {
      if (parseInt(key)) {
        if (fs.existsSync(`${value}\\steamapps\\common\\NeosVR`)) {
          neosdir = `${value}\\steamapps\\common\\NeosVR`
          break
        }
      }
    }
    if (!neosdir) {
      console.log("Neos Not Found")
    } else {
      console.log("Found Neos at " + neosdir)
      neosDir = neosdir
      store.set("NeosDir", neosdir);
    }
  }

}
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    'minWidth': 1600, 'minHeight': 800, resizable: true, frame: false, webPreferences: {
      nodeIntegration: true,
      "web-security": false
    }
  })

  //create listeners
  createListeners(win)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  //Create Listeners

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
function createListeners(win) {
  ipcMain.on("LAUNCH-NEOS", ()=>{
    LaunchNeos()
  })
  ipcMain.on("windowCommand", (e, cmd) => {
    switch (cmd) {
      case "minimize":
        return win.minimize()

      case "maximize":
        if (win.isMaximized())
          return win.unmaximize()
        else
          return win.maximize()

      case "exit":
        return win.close()

    }
  })
  let intervalStore = []
  ipcMain.on("fetch-server-list-async", (event, interval) => {
    if (!intervalStore.includes(interval) && interval != null) {
      intervalStore.push(interval)
    }

    fetch("https://www.neosvr-api.com/api/sessions", { method: "GET" })
      .then(res => res.json())
      .then(json => {
        event.reply("server-list-update-async", json, intervalStore)

        if (intervalStore.length != 1) {
          intervalStore = [interval]
        }
      })
  })
var Neos = null
function LaunchNeos(){
  Neos = child_process.spawn(path.join(store.get("NeosDir"),"Neos.exe"),[],{detached:true})
  win.minimize()
  win.hide();
  Neos.on('close', ()=>{
    win.maximize()
  })
}


  win.webContents.on("new-window", function (event, url) {
    event.preventDefault();
    let JoinWindow = new BrowserWindow({
      show: false, webPreferences: {
        nodeIntegration: true,
        "web-security": false
      }
    });
    JoinWindow.loadURL(url)
    setTimeout(() => {
      JoinWindow.close()
      JoinWindow = null
    }, 5000)
  })
}
var contextMenu = Menu.buildFromTemplate([
  { label: 'Show App', click:  function(){
      win.show();
  } },
  { label: 'Quit', click:  function(){
      app.isQuiting = true;
      app.quit();
  } }
]);