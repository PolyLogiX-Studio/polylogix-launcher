'use strict'
import child_process from 'child_process'
import { app, protocol, BrowserWindow, ipcMain, dialog, Menu, Tray ,Notification} from 'electron'
import {autoUpdater} from 'electron-updater'
import isDev from 'electron-is-dev'
import path from 'path'
console.log(process.platform)
import {
  createProtocol,
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
import fetch from "node-fetch";
import Store from "electron-store";
import fs from "fs";
const store = new Store({
  fileExtension: "",
  name: "dat",
  migrations: require("./db_migrations"),
});
import VDF from "./vdfParser";
var neosDir = store.get("NeosDir");
if (!neosDir) {
  checkNeosDir();
} else {
  if (!fs.existsSync(neosDir)) {
    checkNeosDir();
  }
}
const iconpath = './src/assets/logo.png'
function checkNeosDir() {
  if (process.platform == "win32") {
    if (
      fs.existsSync("C:/Program Files (x86)/Steam/steamapps/libraryfolders.vdf")
    ) {
      const steamfolders = VDF.parse(
        fs
          .readFileSync(
            "C:/Program Files (x86)/Steam/steamapps/libraryfolders.vdf"
          )
          .toString()
      );
      var neosdir = null;
      for (var [key, value] of Object.entries(steamfolders.LibraryFolders)) {
        if (parseInt(key)) {
          if (fs.existsSync(`${value}//steamapps//common//NeosVR`)) {
            neosdir = `${value}//steamapps//common//NeosVR`;
            break;
          }
        }
      }
      if (!neosdir) {
          if (  fs.existsSync(
              `C://Program Files (x86)//Steam//steamapps//common//NeosVR/`
          )) {
            neosdir = `C://Program Files (x86)//Steam//steamapps//common//NeosVR/`;
            console.log("Found Neos at " + neosdir);
            neosDir = neosdir;
            store.set("NeosDir", neosdir);
          }else{
            console.log("Neos Not Found");
          }
      } else {
        console.log("Found Neos at " + neosdir);
        neosDir = neosdir;
        store.set("NeosDir", neosdir);
      }
    }
  }
}
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 1600,
    minHeight: 800,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      "web-security": false,
    },
  });

  //create listeners
  createListeners(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  //Create Listeners

  createWindow();
  createMenu()
  // Integrate this into UI
  if (isDev) {
    dialog.showMessageBox({
      title: "Dev Build!",
      message: "This is a Dev Build and I like Trains",
    });
    console.log("Running in development");
  } else {
    let updater;
    autoUpdater.autoDownload = false;
    (autoUpdater.fullChangelog = true),
      autoUpdater.on("error", (error) => {
        dialog.showMessageBox({
          type: "error",
          message: JSON.stringify(error.stack),
        });
        //dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
      });

    autoUpdater.on("update-available", () => {
      dialog.showMessageBox(
        {
          type: "info",
          title: "Found Updates",
          message: "Found updates, do you want update now?",
          buttons: ["Sure", "No"],
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            autoUpdater.downloadUpdate();
          } else {
            updater.enabled = true;
            updater = null;
          }
        }
      );
    });

    autoUpdater.on("update-not-available", () => {
      dialog.showMessageBox({
        title: "No Updates",
        message: "Current version is up-to-date.",
      });
      updater.enabled = true;
      updater = null;
    });

    autoUpdater.on("update-downloaded", () => {
      dialog.showMessageBox(
        {
          title: "Install Updates",
          message: "Updates downloaded, application will be quit for update...",
        },
        () => {
          setImmediate(() => autoUpdater.quitAndInstall());
        }
      );
    });
    autoUpdater.checkForUpdatesAndNotify();
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.on("lauchable", (event) => {
  event.reply("lauchable", neosDir != null)
});

function createListeners(win) {
  ipcMain.on("LAUNCH-NEOS", (event) => {
    LaunchNeos(event);
  });
  ipcMain.on("windowCommand", (e, cmd) => {
    switch (cmd) {
      case "minimize":
        return win.minimize();

      case "maximize":
        if (win.isMaximized()) return win.unmaximize();
        else return win.maximize();

      case "exit":
        return win.close();
    }
  });
  let intervalStore = [];
  ipcMain.on("fetch-server-list-async", (event, interval) => {
    if (!intervalStore.includes(interval) && interval != null) {
      intervalStore.push(interval);
    }

    fetch("https://www.neosvr-api.com/api/sessions", { method: "GET" })
      .then((res) => res.json())
      .then((json) => {
        event.reply("server-list-update-async", json, intervalStore);

        if (intervalStore.length != 1) {
          intervalStore = [interval];
        }
      });
  });
  ipcMain.on("fetch-world-list-async", (event, interval, query = {}) => {
    if (!intervalStore.includes(interval) && interval != null) {
      intervalStore.push(interval);
    }

    fetch("https://www.neosvr-api.com/api/records/search", {
      method: "POST",
      body: JSON.stringify(query),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        event.reply("world-list-update-async", json, intervalStore);

        if (intervalStore.length != 1) {
          intervalStore = [interval];
        }
      });
  });
  var Neos = null;
  function LaunchNeos(event) {
    if (process.platform == "win32") {
      Neos = child_process.spawn(
        path.join(store.get("NeosDir"), "Neos.exe"),
        [],
        { detached: true }
      );
    } else {
      Neos = child_process.spawn(
        "mono",
        [path.join(store.get("NeosDir"), "Neos.exe")],
        { detached: true }
      );
    }
    event.reply("running", true)
    win.minimize();
    Neos.on("close", () => {
      win.maximize();
      console.log('neos close')
      event.reply("running", false)
    });
  }

  win.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    let JoinWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        "web-security": false,
      },
    });
    JoinWindow.loadURL(url);
    setTimeout(() => {
      JoinWindow.close();
      JoinWindow = null;
    }, 5000);
  });
}



function createMenu() {
    
  if(process.platform === 'darwin') {

      // Extend default included application menu to continue support for quit keyboard shortcut
      let applicationSubMenu = {
          label: 'Application',
          submenu: [{
              label: 'About Application',
              selector: 'orderFrontStandardAboutPanel:'
          }, {
              type: 'separator'
          }, {
              label: 'Quit',
              accelerator: 'Command+Q',
              click: () => {
                  app.quit()
              }
          }]
      }

      // New edit menu adds support for text-editing keyboard shortcuts
      let editSubMenu = {
          label: 'Edit',
          submenu: [{
              label: 'Undo',
              accelerator: 'CmdOrCtrl+Z',
              selector: 'undo:'
          }, {
              label: 'Redo',
              accelerator: 'Shift+CmdOrCtrl+Z',
              selector: 'redo:'
          }, {
              type: 'separator'
          }, {
              label: 'Cut',
              accelerator: 'CmdOrCtrl+X',
              selector: 'cut:'
          }, {
              label: 'Copy',
              accelerator: 'CmdOrCtrl+C',
              selector: 'copy:'
          }, {
              label: 'Paste',
              accelerator: 'CmdOrCtrl+V',
              selector: 'paste:'
          }, {
              label: 'Select All',
              accelerator: 'CmdOrCtrl+A',
              selector: 'selectAll:'
          }]
      }

      // Bundle submenus into a single template and build a menu object with it
      let menuTemplate = [applicationSubMenu, editSubMenu]
      let menuObject = Menu.buildFromTemplate(menuTemplate)

      // Assign it to the application
      Menu.setApplicationMenu(menuObject)

  }

}

let apcon = null
app.on('ready', () => {
  var conextMenu = Menu.buildFromTemplate([
      {
          label: 'Exit',
          click: () => {
              app.quit()
          },
          type: 'normal'

      }
      
  ]);
  apcon = new Tray(iconpath);
  apcon.setContextMenu(conextMenu)
  apcon.setToolTip("Polylogix Launcher");
  apcon.on('click', () => {
      
          if (win.isMinimized()){ win.restore()
          win.focus()}
       else {
              win.show()
      }
  })
})



const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        } else {
            if (win == null) {
                createMenu()
                createWindow()
            }
        }
    }
    )
}

