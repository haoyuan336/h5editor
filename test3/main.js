const electron = require("electron");
const {app, BrowserWindow} = electron;
let mainWindow;
const createMainWindow = function(){
    mainWindow = new BrowserWindow({width: 400, height: 400, backgroundColor: "#ffffff"});
};
app.on("ready", function(){
    createMainWindow();
});