/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import {BaseLayer, Inherited} from './../../utility/imports'
const GameUiLayer = function () {
  let that = Inherited(BaseLayer());
  that.inheritOn('init', function () {
    return true;
  });

  return that;
};
export default GameUiLayer;