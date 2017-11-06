const electron = require("electron");
const app = electron.app;
const path = require('path');
const url = require("url");
const BrowserWindows = electron.BrowserWindow;
var mainWindow;
app.on("ready", function(){
  mainWindow = new BrowserWindows({width: 1024, height: 1024, backgroundColor: "#000000"});
//   mainWindow.loadURL('https://github.com');
  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "test.html"),
      protocol: "file:",
      slashes: true
  }))  
});