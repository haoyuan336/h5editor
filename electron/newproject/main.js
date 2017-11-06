const electron = require("electron");
const {app, BrowserWindow} = electron;
const url = require("url");
const path = require("path");
let win;
const createWindow = function(){
    win = new BrowserWindow({width: 800, height: 600, icon: __dirname + "/img/", backgroundColor: "#ffffff"});
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on("closed", ()=>{
        win = null;
    });
};
//run create window function
app.on("ready", createWindow);
//quit whtin all windows are closed
app.on("window-all-closed", ()=>{
    if (process.platform !== 'drawin'){
        app.quit();
    }
});