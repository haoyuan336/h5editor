/**
 * Created by chuhaoyuan on 2017/8/30.
 */
let Node = function () {
  let that = {};
  that.node = new PIXI.Container();
  that.addChild = function (child) {
    that.node.addChild(child.node);
    child.parent = that;
  };
  that.removeFromParent = function (cb) {
    that.parent.removeChild(that);
    if (cb){
      cb();
    }
  };
  that.removeChild = function (child) {
    that.node.removeChild(child.node);
  };
  Object.defineProperty(that, "position", {
    set: function (pos) {
      that.node.position = pos;
    },
    get: function () {
      return that.node.position;
    }
  });
  return that;
};
export default Node;