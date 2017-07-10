const defines = require('./defines')
const {app, BrowserWindow} = require("electron");
const path = require("path");
const url = require("url");
let window = null;
const createWindow = function () {
  // window = new BrowserWindow({width: 800, height: 600,backgroundColor: "#2e2c29"});
  // window.on("closed", ()=>{
  //
  // });
  // window.loadURL(url.format({
  //   pathname: path.join(__dirname, "index.html"),
  //   protocol: 'file',
  //   slashes: true
  // }));

  // for (let i = 0 ; i < defines.windowViewsDataList.length ; i ++){
  //   let data = defines.windowViewsDataList[i];
  //   let windwo
  // }
  window = new BrowserWindow({x: 42, y: 0, width: 1000, height: 500,backgroundColor:"#2e2c29" });




};

const createChildView = function (parent, data) {
  let view = new BrowserWindow({parent: parent,model: true,x: data.size.x,y: data.size.y, width: data.size.width , height: data.size.height, backgroundColor: "#2e2c29"});
  view.show();
  view.loadURL(url.format({
    pathname: path.join(__dirname, data.index),
    protocol: "file",
    slashes: true
  }));
  window.setMinimumSize(data.size.width, data.size.height);

};

app.on("ready",()=>{


  // let winviewDataList = defines.windowViewsDataList;
  // console.log("win view data list = " + JSON.stringify(winviewDataList));

  createWindow();

  for (let i = 0 ; i < defines.windowViewsDataList.length ; i ++){
    createChildView(window,defines.windowViewsDataList[i]);
  }
  // console.log('window view data length =' + defines.windowViewsDataList.length);
});