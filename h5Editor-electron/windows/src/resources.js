const defines = require('./defines.js');
const resources =
{
  "icon_head_bg": "icon_head_bg.png", 
  "icon_nb0": "icon_nb0.png", 
  "icon_nb1": "icon_nb1.png", 
  "icon_nb2": "icon_nb2.png", 
  "icon_nb3": "icon_nb3.png", 
  "icon_nb4": "icon_nb4.png", 
  "icon_nb5": "icon_nb5.png", 
  "icon_nb6": "icon_nb6.png", 
  "icon_nb7": "icon_nb7.png", 
  "icon_nb8": "icon_nb8.png", 
  "icon_nb9": "icon_nb9.png"
}
for (let i in resources) {resources[i] = defines.resPath+resources[i];}
module.exports = resources;