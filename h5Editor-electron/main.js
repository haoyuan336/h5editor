const defines = require('./defines')
const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
let window = null;
const createWindow = function () {
  window = new BrowserWindow({width: 800, height: 600,backgroundColor: "#2e2c29"});
  window.on("closed", ()=>{

  });
  window.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: 'file',
    slashes: true
  }));
  window.setBounds({x: 0,y: 0,})



};
app.on("ready",()=>{
  createWindow();
});