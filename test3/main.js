const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const url = require('url');
const path = require('path');
let mainWindow;
app.on("ready", function(){
    console.log('ready');
    mainWindow = new BrowserWindow({width: 800, height: 800});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWorld2.html'),
        protocol: 'file',
        slashes: true
    }));

    // mainWindow.webContents.openDevTools()
    let _isOpenDevtool = false;
    ipcMain.on("open_dev_tool", function(){
        console.log('open dev tool');
        if (_isOpenDevtool){
            _isOpenDevtool = false;
            mainWindow.webContents.closeDevTools();    
        }else{
            mainWindow.webContents.openDevTools();        
            _isOpenDevtool = true;
        }
    })
})