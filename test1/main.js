/**
 * Created by chuhaoyuan on 2017/9/22.
 */
const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
let win
function createWindow() {
  win = new BrowserWindow({width: 1080, height: 720});
  win.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: 'file',
    slashes: true
  }))
  win.webContents.openDevTools();
  win.on("closed", ()=>{
    win =null;
  })
}
app.on("ready", createWindow);

