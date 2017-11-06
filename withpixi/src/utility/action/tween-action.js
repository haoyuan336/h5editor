/**
 * Created by long on 2017/1/16.
 */

import ActionInterface from './action-interface'

var TweenAction = (spec)=> {
  let that = ActionInterface();

  that.action = null;
  let _startData = {};
  let _object = null;

  that.easingType = {
    'None': TWEEN.Easing.Linear.None,
    'BackIn': TWEEN.Easing.Back.In,
    'BackOut':  TWEEN.Easing.Back.Out,
    'BounceIn': TWEEN.Easing.Bounce.In,
    'BounceOut':  TWEEN.Easing.Bounce.Out,
  }

  let _actionMaps = {};

  _actionMaps['actionMove'] = (data)=> {
    let startData = data.startData;
    let endData = data.endData;
    let duration = data.duration;
    let action = new TWEEN.Tween(startData)
      .to(endData, duration)
      .onUpdate(function () {
        for (let i in startData) {
          _object.position[i] = startData[i];
        }
      });
    return action;
  };

  _actionMaps['actionScale']  = (data)=> {
    let startData = data.startData;
    let endData = data.endData;
    let duration = data.duration;
    let action = new TWEEN.Tween(startData)
      .to(endData, duration)
      .onUpdate(function (dt) {
        for (let i in startData) {
          _object.scale[i] = startData[i];
        }
      });
    return action;
  };

  _actionMaps['actionRotation']  = (data)=> {
    let startData = data.startData;
    let endData = data.endData;
    let duration = data.duration;
    let action = new TWEEN.Tween(startData)
      .to(endData, duration)
      .onUpdate(function () {
        _object.rotation = startData.rotation;
      });
    return action;
  };

  _actionMaps['actionFade'] = (data)=> {
    let startData = data.startData;
    let endData = data.endData;
    let duration = data.duration;
    let action = new TWEEN.Tween(startData)
      .to(endData, duration)
      .onUpdate(function () {
        _object.alpha = startData.alpha;

      });
    return action;
  };

  _actionMaps['actionDelay']= (data)=> {
    let duration = data.duration;
    let action = new TWEEN.Tween();
    action.delay(duration);
    return action;
  };

  that.createAction = function (data) {
    _object = data.object;
    if (!_object && data.actionType !== "Delay") {
      console.log('action need object');
      return;
    }
    if (_actionMaps.hasOwnProperty('action' + data.actionType)) {
      console.log('test create action 1' + data.actionType);
      that.action = _actionMaps['action' + data.actionType](data);
      if (data.easing && that.easingType[data.easing]) {
        that.action.easing(that.easingType[data.easing]);
      }
      if (data.repeat) {
        that.action.repeat(data.repeat);
      }
      if (data.delay > 0) {
        that.action.delay(data.delay);
      }
      that.action.onComplete(function () {
        if (data.callBack) {
          data.callBack();
        }
      });
    } else {
      console.log('error action type', data.actionType);
    }

  };

  that.start = function () {
    if (!that.action) {
      console.error('no action can start!');
      return;
    }
    //console.log('action start');
    that.action.start();
  };

  that.stop = function () {
    if (!that.action) {
      console.error('no action stop!');
      return;
    }
    that.action.stop();
    _object = null;
    _startData = {};
  };

  that.createAction(spec);

  return that;
};

export default TweenAction;