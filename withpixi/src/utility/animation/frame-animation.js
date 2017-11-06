/**
 * Created by wizard on 16/3/29.
 */
import AnimationInterface from "./animation-interface.js"
var FrameAnimation = function (spec) {
  var that = AnimationInterface();

  that.animates = {};

  that.node = new PIXI.Container();

  var _movieClip = null;

  for (var index in spec.animates) {
    var oneAnimate = spec.animates[index];
    var frames = [];
    for (var i = oneAnimate.start; i <= oneAnimate.end; ++i) {
      frames.push(oneAnimate.pre + "_" + i + ".png");
    }

    that.animates[index] = {};
    that.animates[index].frames = frames;
    if (spec.animates[index].speed != undefined) {
      that.animates[index].animationSpeed = spec.animates[index].speed;
    }
    else {
      that.animates[index].animationSpeed = 1;
    }
    //console.log("frame animation:" + JSON.stringify(that.animates) );
  }

  (()=> {
    if (spec.default) {
      _movieClip = new PIXI.Sprite.fromFrame(spec.default);
      that.node.addChild(_movieClip);
      if(spec.anchor){
        _movieClip.anchor = spec.anchor;
      }else{
        _movieClip.anchor = {x: 0.5, y: 0.5};
      }

    }
  })();

  var setupMovieClip = function (frames, speed, isLoop, cb) {

    if (_movieClip) {
      that.node.removeChild(_movieClip);
    }

    _movieClip = new PIXI.extras.AnimatedSprite.fromFrames(frames);
    _movieClip.animationSpeed = speed;
    _movieClip.loop = isLoop;
    _movieClip.gotoAndPlay(0);

    if (!isLoop) {
      _movieClip.onComplete = function () {
        if (cb) {
          cb.call(this);
        }
      }
    }

    that.node.addChild(_movieClip);
    if(spec.anchor){
      _movieClip.anchor = spec.anchor;
    }else{
      _movieClip.anchor = {x: 0.5, y: 0.5};
    }
  }

  that.getAnimationNode = function () {
    console.log('error: virtual getAnimationNode function');
  };

  that.stop = function (applyCb) {
    //if (applyCb) {
    //
    //}
  };

  that.playOnce = function (actionName, cb) {
    that.playTimes(actionName, 1, cb);
  };

  that.playTimes = function (actionName, times, cb) {

    if (!that.animates[actionName]) {
      console.log('error: wrong action name' + actionName);
      return;
    }

    var frames = [];
    for (var i = 0; i < times; ++i) {
      frames = frames.concat(that.animates[actionName].frames)
    }

    setupMovieClip(frames, that.animates[actionName].animationSpeed, false, cb);
  };

  that.playList = function (actionList, cb) {
    console.log('error: virtual function');
  };

  that.playLoop = function (actionName) {
    if (!that.animates[actionName]) {
      console.log('error: wrong action name' + actionName);
      return;
    }

    setupMovieClip(that.animates[actionName].frames, that.animates[actionName].animationSpeed, true);
  };

  that.reset = function () {
    console.log('error: virtual reset function');
  };

  that.setVisible = function (isVisible) {
    that.node.visible = isVisible;
  };

  that.turnAround = function (faceTo) {
    console.log('error: virtual  turnAround function');
  };

  that.setSlotVisible = function (slotName, isVisible) {
    console.log('error: virtual setSlotVisible function');
  };

  that.setTimeScale = function (timeScale) {
    that.node.animationSpeed = timeScale;
  };

  that.setSkin = function (name) {
    console.log('error: virtual setSkin function');
  };

  return that;
}

export default FrameAnimation;
