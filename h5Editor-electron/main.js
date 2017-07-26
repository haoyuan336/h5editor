const defines = require('./defines');
const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
let window = null;
const createWindow = function () {
  window = new BrowserWindow({x: 42, y: 0, width: 800 , height: 800,backgroundColor:"#ffffff" });

  window.loadURL(url.format({
    pathname: path.join(__dirname, "./windows/src/index.html"),
    protocol: "file:",
    slashes: true
  }));
  window.openDevTools();
};


app.on("ready",()=>{
  createWindow();
});