const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const url = require('url');
const path = require('path');
let mainWindow;
app.on("ready", function(){
   mainWindow = new BrowserWindow({
       width: 800,
       height: 800,
       minWidth: 600,
       minHeight: 400
   });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './view/index.html'),
        protocol: "file:",
        slashes: true
    }));
  mainWindow.webContents.openDevTools();


});