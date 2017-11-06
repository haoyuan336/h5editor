const electron = require("electron");
const {app ,BrowserWindow} = electron;
const url = require("url");
const path = require('path');
let mainWindow;
let smallWindo;
app.on("ready", function(){
    mainWindow = new BrowserWindow({x: 0, y: 0, width: 400, height: 400});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools();
});
