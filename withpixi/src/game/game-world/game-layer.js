/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import {BaseLayer, Inherited,Bezier, Director, Vec2, Graphics,Eventuality} from './../../utility/imports'
import resources from './../../resources'
import Node from './node'
import PointNode from './point-node'
import Button from './button'
const GameLayer = function () {
  let that = Node();
  let _pointList = [];
  var _graphics = Graphics();
  var _event = Eventuality({});
  that.node.addChild(_graphics.node);
  _graphics.drawRect(0,0, Director.sharedDirector().width , Director.sharedDirector().height - 100,{color: 0x59442f});
  var _lineGraphics = Graphics();
  that.node.addChild(_lineGraphics.node);

  const touchStart = function (event) {
    console.log("touch start");
    let data = event.data.getLocalPosition(that.node);
    console.log("data = " + JSON.stringify(data));
    var point = PointNode(data.x, data.y,_event);
    that.addChild(point);
    _pointList.push(point);
  };
  const touchMove = function (event) {
    // console.log("touch move");

  };
  const touchEnd = function () {
    // console.log("touch end");
  };

  _graphics.node.interactive = true;


  _graphics.node.on('pointerdown', touchStart)
    .on('pointerup', touchEnd)
    .on('pointerupoutside', touchEnd)
    .on('pointermove', touchMove);




  let _button = Button({x: Director.sharedDirector().width - 100, y : Director.sharedDirector().height - 60, width: 100, height : 40}, "clear", function () {
    console.log("clear button click");
    for (var i in _pointList){
      _pointList[i].removeFromParent();
    }
    _pointList = [];
  });
  that.node.addChild(_button.node);

  let _button2 = Button({x: 100, y: Director.sharedDirector().height - 60, width : 100, height: 40}, "print", function () {


    const pointList = [];

    for (var i = 0 ; i < _pointList.length ; i ++){
      pointList.push(_pointList[i].position);
    }
    console.log("controller point list = " + JSON.stringify(pointList));

  });
  that.node.addChild(_button2.node);

  let _button3 = Button({x: Director.sharedDirector().width * 0.5, y: Director.sharedDirector().height - 60, width: 100, height: 40},"delete", function () {
    //delete


    if (_pointList.length != 0){
      _button3.setFlag(true);
      _event.fire("delete_flag", true);
    }
  });


  that.node.addChild(_button3.node);


  that.update = function (dt) {

    var plist = [];
    if (_pointList.length >= 4) {

      for (let i = 0; i < Math.floor(_pointList.length / 3); i++) {
        // console.log("i = " + i);
        var pointList = [];
        for (let j = 0; j < 4; j++) {
          let index = j + i * 3;
          if (index < _pointList.length){
            var pointNode = _pointList[j + i * 3];
            pointList.push(pointNode.position);
          }

        }
        if (pointList.length === 4) {
          var bezierList = Bezier(pointList, 20);
          for (var h = 0; h < bezierList.length; h++) {
            plist.push(bezierList[h]);
          }
        }
      }
    }
    _lineGraphics.clear();
    for (var i = 0; i < plist.length; i++) {
      _lineGraphics.drawCircle(plist[i], 5, {color: 0xFF00FF});
    }

  };
  _event.on("delete_point_node", function (node) {
    for (var i = 0 ; i < _pointList.length ; i ++){
     var pointNode = _pointList[i];
      if (pointNode === node){
        _pointList.splice(i, 1);
        that.removeChild(pointNode);
      }
    }
    _button3.setFlag(false);
    _event.fire("delete_flag", false);
  });


  return that;
};
export default GameLayer;