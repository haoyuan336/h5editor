/**
 * Created by hewenlong on 16-3-15.
 */
import AnimationInterface from "./animation-interface.js";
//const Spine = require('pixi-spine').Spine;
var SpineAnimation = function (spec) {
  var that = AnimationInterface(spec);

  var _spine = null;
  var _actionList = [];
  var _faceTo = 1;
  that.zOrder = 0;
  var spineData = spec.spineData;

  that.setSkin = function (skin) {
    //if(skin === null || skin === undefined) {
    //  _spine.skeleton.setSkin(null);
    //  return
    //}
    _spine.skeleton.setSkin(null);
    _spine.skeleton.setSkinByName(skin);
  };
  that.hackTextureBySlotName = (name,image,size)=>{
    // image is resource path
    // exchange texture size
    // size = {
    //   width: 100,
    //   height: 100
    // }
    let texture = PIXI.Texture.fromImage(image);
    if (size){
      _spine.hackTextureBySlotName(name,texture,size);
    }else {
      // console.log('texture size = ' + JSON.stringify(texture.orig));
      _spine.hackTextureBySlotName(name,texture,texture.orig);
    }
  };
  that.setTimeScale = function (timeScale) {
    _spine.state.timeScale = timeScale;
  };

  that.turnAround = function (dir) {
    var scaleX = _spine.scale.x;
    _faceTo *= dir;
    _spine.scale.x = scaleX * _faceTo;
  };

  that.playLoop = function (action, isSoft) {
    if (!isSoft) {
      applyAllCallBack();
      _spine.skeleton.setToSetupPose();
      _spine.state.setAnimation(0, action, true);
    } else {
      _spine.state.addAnimation(0, action, true, 0);
    }

  };

  var applyAllCallBack = function () {
    while (_actionList.length > 0) {
      var action = _actionList.shift();
      if (action.cb) {
        action.cb();
      }
    }
  };

  that.getAnimationNode = function () {
    return _spine;
  };

  that.playTimes = function (action, times, callBack, isSoft) {
    var list = [];
    for (var i = 0; i < times; i++) {
      list.push(action);
    }
    that.playList(list, callBack, isSoft);
  };

  that.playList = function (list, callBack, isSoft) {
    if (list.length === 0) {
      if (callBack) {
        callBack();
      }
    }
    _spine.skeleton.setToSetupPose();
    var track;

    if (!isSoft) {
      applyAllCallBack();
      track = _spine.state.setAnimation(0, list[0], false);
    } else {
      track = _spine.state.addAnimation(0, list[0], false, 0);
    }
    if (!track) {
      if (callBack) {
        callBack();
      }
      return;
    }
    for (var i = 1; i < list.length; i++) {
      _spine.state.addAnimation(0, list[i], false, 0);
    }

    if (callBack) {
      var data = {
        waitingCount: list.length,
        cb: callBack
      };
      _actionList.push(data);
    }

  };

  that.reset = function () {
    _spine.skeleton.setBonesToSetupPose();
    _spine.skeleton.setSlotsToSetupPose();
    _spine.skeleton.clearTracks();
    _actionList = [];
  };

  var _onComplete = function () {
    if (_actionList <= 0) {
      return;
    }

    var data = _actionList[0];
    data.waitingCount--;
    if (data.waitingCount === 0) {
      _actionList.shift();
      data.cb();
    }
  };

  var createSpine = function () {
    _spine = new PIXI.spine.Spine(spineData);

    if (spec.dir) {
      that.turnAround(spec.dir);
    }
    if (spec.skin) {
      that.setSkin(spec.skin);
    }

    //_spine.state.onComplete = _onComplete;

    _spine.state.addListener({
      complete: _onComplete,
      start: function (entry) {
        console.log('animation is set at ' + entry.trackIndex)
      },
      end: function (entry) {
        console.log('animation was ended at ' + entry.trackIndex)
      }
    });


    that.node = _spine;
  };
  createSpine();

  return that;
};

export default SpineAnimation;