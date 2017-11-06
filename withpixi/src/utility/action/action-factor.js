/**
 * Created by long on 2017/1/16.
 */

import TweenAction from './tween-action'
var ActionFactor = function () {
  let that = {};

  that.createAction = function (actionData) {
    return TweenAction(actionData);
  };

  return that;
};

export default ActionFactor;