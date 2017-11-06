/**
 * Created by chuhaoyuan on 2017/5/9.
 */
import ProgressBar from './progress-bar'
const ProgressTouchBar = function (spec) {

  let that = ProgressBar(spec);

  let _slide = PIXI.Sprite.fromImage(spec.slide);
  _slide.interactive = true;
  that.addChild(_slide);
  _slide.anchor.set(0.5);
  that.percent = 50;

  let _isTouch = false;

  const touchStatr = function (event) {
      _isTouch = true;
  };

  const touchEnd = function () {
    _isTouch = false;
  };
  const dragMoving = function (event) {
    if (_isTouch===false){
      return;
    }
    let data = event.data;
    let pos = data.getLocalPosition(that);
    _slide.position.x = pos.x;

    if (_slide.position.x >= spec.width * 0.5){
      _slide.position.x = spec.width * 0.5;
    }
    if (_slide.position.x <= spec.width * -0.5){
      _slide.position.x = spec.width * -0.5;
    }
    // console.log('spec width =' + spec.width * -0.5);
    // console.log('slide position x' + pos.x);
    offsetProgressValue((_slide.position.x - spec.width * - 0.5) / spec.width * 100);
  };
  const offsetProgressValue = function (percent) {
    that.percent = percent;
  };
  // _slide.on('pointerdown',dragStart);

  _slide.on('mousedown',touchStatr);
  _slide.on('mousemove', dragMoving);
  _slide.on('mouseout', touchEnd);
  _slide.on('touchstart',touchStatr);
  _slide.on('touchmove',dragMoving);
  _slide.on('touchend',touchEnd);
  // _slide.on('mouseupoutside',touchEnd);
  // _slide.on('touchendoutside',touchEnd);



  // _sprite.on("mousedown", _touchBegin)
  //   .on("mousemove", _touchMoved)
  //   .on("mouseout", _touchCancel)
  //   .on("mouseup", _touchEnd)
  //   .on("touchstart", _touchBegin)
  //   .on("touchmove", _touchMoved)
  //   .on("touchendoutside", _touchCancel)
  //   .on("touchend", _touchEnd)
  //   .on("click", _onClick)
  //   .on("tap", _onClick);
  //

  return that;
};
export default  ProgressTouchBar;