/**
 * Created by chuhaoyuan on 2017/7/10.
 */
var Defines = function () {
  let that = {};
  that.windowViewMap = {
    "node_controller": 0,
    "scene_editor": 1,
    "target_library": 2,
    "prototype": 3
  };


  that.windowViewsNameList = [
    'node_controller','scene_editor','target_library','prototype'
  ];
  that.windowViewsDataList = [
    {
      name: that.windowViewsNameList[0],
      size: {
        x: 20,
        y: 0,
        width: 400,
        height: 500
      },
      index: "windows/node-controller.html"
    },
    {
      name: that.windowViewsNameList[1],
      size: {
        x: 420,
        y: 0,
        width: 400,
        height: 500
      },
      index: "windows/scene-editor.html"
    },
    {
      name: that.windowViewsNameList[1],
      size: {
        x: 840,
        y: 0,
        width: 400,
        height: 500
      },
      index: "windows/scene-editor.html"
    }


  ];

  return that;
};


//
//
const defines = Defines();
module.exports = defines;
