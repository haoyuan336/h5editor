/**
 * Created by chuhaoyuan on 2017/8/28.
 */
const Graphics = function () {
  let that = {};
  that.node = new PIXI.Container();
  var _graphics = new PIXI.Graphics();
  that.node.addChild(_graphics);
  that.drawRect = function (x, y , width, height,style) {
    if (style){
      // that.lineStyle(style.width, style.color, style.);
      updateStyle(style);

    }else {
      _graphics.lineStyle(1, 0xFF0000, 1);
    }
    _graphics.drawRect(x , y , width, height);
  };
  that.drawPolyShape = function () {
    var  firstPos = arguments[0];
    _graphics.moveTo(firstPos.x, firstPos.y);

    for (var i = 1 ; i < arguments.length ; i ++){
      _graphics.lineTo(arguments[i].x, arguments[i].y);
    }
  };
  
  
  that.drawCircle = function (points, radius,style) {
    // console.log('draw circle = ' + JSON.stringify(points));
    if (style){
      updateStyle(style);
    }
    _graphics.drawCircle(points.x, points.y, radius);
  };
  that.clear = function () {
    _graphics.clear();
  };

  const updateStyle = function (style) {
    let  lineWidth = 1;
    let  lineColor = 0xFF0000;
    let lineAlpha = 1;
    if (style.hasOwnProperty("color")){
      lineColor = style.color;
    }
    if (style.hasOwnProperty("width")){
      lineWidth = style.width;
    }
    if (style.hasOwnProperty("alpha")){
      lineAlpha = style.alpha;
    }
    _graphics.lineStyle(lineWidth, lineColor, lineAlpha);
    _graphics.beginFill(lineColor);
  };

  return that;
};
export default Graphics