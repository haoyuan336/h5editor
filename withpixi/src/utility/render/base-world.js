/**
 * Created by wizard on 16/3/30.
 */

import Helper from "../helper.js"
import Director  from './director'
import Registry from '../registry'


const BaseWorld = function () {
  let that = {};

  that.node = new PIXI.Container();

  that.init = function () {
    return true;
  };

  that.destroy = ()=> {
    that.destroyExecute();
  };

  that.update = function (dt) {
    that.updateExecute(dt);
  };

  that.onResume = ()=> {
    //console.log('world on resume');
    Director.sharedDirector().updateRegister(that);
  };

  that.onPause = ()=> {
    //console.log('world on pause');
    Director.sharedDirector().updateUnRegister(that);
  };

  let _modelList = [];

  that.lock2Layer = function (layer) {

    Helper.reorderNode(that.node);

    for (let i = 0; i < that.node.children.length; ++i) {
      if (that.node.children[i] === layer.node) {
        break;
      }
      that.node.children[i].interactiveChildren = false;
    }

    _modelList.push(layer);
    _modelList.sort(_sortByZorder);
  };

  that.popModelLayer = ()=> {
    if (that.getModelNum() === 0)return;
    let layer = _modelList[that.getModelNum() - 1];
    if (layer) {
      layer.removeFromWorld();
      layer = null;
    }
  };
  that.getModelNum = ()=> {
    return _modelList.length;
  };

  that.unlock2Layer = function (layer) {
    let index = _modelList.indexOf(layer);
    if (index === -1) {
      console.log('error: no dialog to pop');
      return;
    }

    _modelList.splice(index, 1);
    that.node.removeChild(layer.node);

    let lastNode = null;
    if (_modelList.length > 0 && _modelList[index - 1]) {
      lastNode = _modelList[index - 1].node;
    }

    (()=> {
      let zorder = (lastNode !== null ? lastNode.zorder : -1);
      console.log('dialog remove to zorder: ' + zorder);
    })();

    //that.node.interactiveChildren = true;
    for (let i = that.node.children.length - 1; i >= 0; --i) {
      that.node.children[i].interactiveChildren = true;
      if (that.node.children[i] === lastNode) {
        break;
      }
    }
  };

  const _sortByZorder = (a, b)=> {
    return a.node.zorder > b.node.zorder;
  };

  Registry(that, ['destroy', 'update']);

  return that;
}
export default BaseWorld;