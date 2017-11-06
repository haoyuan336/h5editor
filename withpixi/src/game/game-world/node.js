/**
 * Created by chuhaoyuan on 2017/8/29.
 */
import {Director} from './../../utility/imports'
const Node = function () {
  var that = {};
  that.node = new PIXI.Container();
  that.removeFromParent = function () {
    that.parent.node.removeChild(that.node);
  };
  that.addChild = function (node) {
    that.node.addChild(node.node);
    node.parent = that;
  };
  that.removeChild = function (child) {
    that.node.removeChild(child.node);
  };



  that.update = function (dt) {
    // console.log("update");
  };

  Director.sharedDirector().updateRegister(that);


  return that;
};
export default Node;