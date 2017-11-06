/**
 * Created by chuhaoyuan on 2017/8/29.
 */
import {Graphics, UIControl} from './../../utility/imports'
const Button = function (rect,labelText, cb) {
  var that = {};
  that.node = new PIXI.Container();
  var _graphics = Graphics();
  var _flaging = false;

  that.node.addChild(_graphics.node);
  _graphics.drawRect(rect.x - rect.width * 0.5 , rect.y - rect.height * 0.5,rect.width, rect.height, {color: 0xFFFFFF});


  var _mainNode = UIControl.create({
    id: 'mainNode',
    component: UIControl.Type.Label,
    text: labelText === undefined?"Button":labelText,
    style: {
      fontFamily: "Arial",
      // fill: "#ffffff"
    },
    position: {
      x: rect.x,
      y: rect.y
    }
  });
  that.node.addChild(_mainNode.node);


  const changeColor = function (color) {
    _graphics.clear();
    _graphics.drawRect(rect.x - rect.width * 0.5 , rect.y - rect.height * 0.5,rect.width, rect.height, {color: color});


  };




  const touchStart = function () {
    changeColor(0x3cff00);
  };
  const touchMove = function () {

  };
  const touchEnd = function () {
    changeColor(0xFFFFFF);
    if (cb){
      cb();
    }

  };
  that.node.interactive = true;


  that.node
    .on('pointerdown', touchStart)
    .on('pointerup', touchEnd)
    .on('pointerupoutside', touchEnd)
    .on('pointermove', touchMove);
    // UIControl.create({});
  that.setFlag = function (valye) {
    _flaging = valye;
    if (_flaging === true){
      changeColor(0x3cff00);
    }else {
      changeColor(0xFFFFFF);
    }
  };
  return that;
};
export default Button;