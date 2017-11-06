const electron = require("electron");
const url = require("url");
const path = require("path");
const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let addwindow;
//listen for app to be ready;
app.on("ready", function(){
    mainWindow = new BrowserWindow({width: 1024, height: 1024, backgroundColor: 'ff00ff'});
    //Load html window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "mainWindow.html"),
        protocol: 'file:', 
        slashes: true
    }));
    //Close app when 
    mainWindow.on("closed", function(){
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu); 
    // // console.log("create  main menu");÷
    // mainWindow.webContents.openDevTools()
    // const mainMenu = new Menu();

});
//Handle add create window
function createAddWindow(){
    addwindow = new BrowserWindow({width: 200, height: 300, backgroundColor: "#ffffff", title: 'Add Shopping List Item'});
    addwindow.loadURL(url.format({
        pathname: path.join(__dirname, "addWindow.html"),
        protocol: 'file:',
        slashes: true
    }));


}
// Catch item : add
ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
    console.log(item); 
    addwindow.close();
});
// Create menu template
const mainMenuTemplate = [
    {
        label: 'file',
        submenu: [
            {
                label: "add Item",
                click: createAddWindow
            },
            {
                label: "clear item",
                click: function(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label: "Quit",
                accelerator: process.platform == 'darwin'?'Command+Q':'Ctrl+Q',
                click:()=>{
                    app.quit();
                }
            }
        ]
    }
];
if (process.platform === 'darwin'){
    mainMenuTemplate.unshift({});
}
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: "Developer Tools",
        submenu: [
            {
                label: 'Toogle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command + I': 'Ctrl + I',
                click: function(item, focusedWindow){
                    focusedWindow.toggleDevTools();
    
                }
            },
            {
                role: "reload"
            }
        ]
    })
}