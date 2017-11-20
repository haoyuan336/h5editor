const electron = require("electron");
const {app ,BrowserWindow, ipcMain} = electron;
const url = require("url");
const path = require('path');
let mainWindow;
let smallWindo;
app.on("ready", function(){
    mainWindow = new BrowserWindow({x: 0, y: 0, width: 600, height: 400});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: 'file:',
        slashes: true
    }));
    // mainWindow.webContents.openDevTools();
    ipcMain.on("open_dev_tool", function(){
        console.log("receive ipc msg");
        mainWindow.webContents.openDevTools();
    });
});
