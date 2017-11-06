/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import {BaseWorld, Inherited, Director} from './../../utility/imports'
import resources from './../../resources'
import GameLayer from './game-layer'
import GameUiLayer from './game-ui-layer'
const GameWorld = function () {
  var that = Inherited(BaseWorld());
  that.inheritOn('init', function () {
    return true;
  });

  //进入游戏






  // var gameLayer = GameLayer();
  // // gameLayer.init();
  // // gameLayer.add2World(that);
  // that.node.addChild(gameLayer.node);
  // var gameUiLayer = GameUiLayer();
  // gameUiLayer.init();
  // gameUiLayer.add2World(that);



  return that;
};
export default GameWorld;