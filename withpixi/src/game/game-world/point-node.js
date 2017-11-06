/**
 * Created by chuhaoyuan on 2017/8/28.
 */
import {Graphics, Director} from './../../utility/imports'
import Node from './node'
var PointNode = function (x, y,event) {
  let that = Node();
  let _graphics = Graphics();
  let _isTouching = true;
  let _event = event;
  let _deleteFlag = false;
  that.node.addChild(_graphics.node);
  let _centerPos = {
    x: x,
    y: y
  };
  _graphics.drawCircle({x: x, y: y}, 10, {color: 0xFF0000});

  const touchStart = function (event) {
    console.log("touch start");


    _isTouching = true;

  };
  const touchMove = function (event) {
    // console.log("touch move" + _isTouching);
    var data = event.data.getLocalPosition(that.node);
    var p = new SAT.Vector(data.x, data.y);
    var box = new SAT.Box(new SAT.Vector(0,0), Director.sharedDirector().width,  Director.sharedDirector().height - 200).toPolygon();

    var isInBox =  SAT.pointInPolygon(p, box);
    // console.log("is in box = " + JSON.stringify(isInBox));
    if (_isTouching && isInBox){
      that.position = event.data.getLocalPosition(that.node);
    }


  };
  const touchEnd = function () {
    // console.log("touch end");
    _isTouching = false;
    if (_deleteFlag === true){
      // that.removeFromParent();
      _event.fire("delete_point_node", that);
    }
  };

  // _graphics.node.interactive = true;


  that.node.interactive = true;
  that.node.on('pointerdown', touchStart)
    .on('pointerup', touchEnd)
    .on('pointerupoutside', touchEnd)
    .on('pointermove', touchMove);






  Object.defineProperty(that, "position", {
    set: function (pos) {

      // console.log("position = " + JSON.stringify(pos));
      _centerPos = pos;
      _graphics.clear();
      _graphics.drawCircle(_centerPos, 10,{color: 0xFF0000});
    },
    get: function () {
      return _centerPos;
    }
  });
  _event.on("delete_flag", function (value) {
    console.log("开启了删除点的操作");
    _deleteFlag = value;
  });
  return that;
};
export default PointNode;