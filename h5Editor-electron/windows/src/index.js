const resources = require("./resources");
const defines = require("./defines");
window.onload = function () {
  console.log('window onload');

  const preload = function () {
    let list = [];
    for (let i in resources){
      list.push(i);
    }

    console.log("defines = " + JSON.stringify(defines));
    for (let i in resources){
      game.load.image(resources[i], resources[i]);//加载资源
    }
    // game.load.image("image","./assets/icon_head_bg.png");


  };
  const create = function () {
    game.stage.backgroundColor = "#0c9fc7";
    game.add.sprite(100,100,resources.icon_head_bg);
    console.log("创建精灵");

  };

  let game = new Phaser.Game(800,800,Phaser.AUTO,"game",{
    preload: preload, create: create,})
};