/**
 * Created by long on 2017/1/16.
 */

var ActionInterface = function() {
  let that = {};

  let actionData = {
    object: null,
    actionType: '',
    easing: "",
    duration: 0,
    delay: 0,
    repeat: 0,
    startData: {},
    endData: {},
    callBack: null
  };

  that.createAction = function (actionData) {
    console.log('error: virtual createAction function');
  };

  that.start = function () {
    console.log('error: virtual start function');
  };
  
  that.stop = function () {
    console.log('error: virtual stop function');
  };

  return that;
};

export default ActionInterface;