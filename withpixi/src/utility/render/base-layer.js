/**
 * Created by wizard on 16/3/30.
 */

import Registry from '../registry'

const BaseLayer = ()=> {
  let that = {};

  that.node = new PIXI.Container();
  that.node.zorder = 0;

  that.owner = null;

  that.init = ()=> {
    return true;
  };

  that.destroy = ()=> {
    that.destroyExecute();

  };
  that.update = (dt)=> {
    that.updateExecute(dt);
  };

  that.add2World = (world)=> {
    world.node.addChild(that.node);
    that.owner = world;
    world.updateRegister(that);
    //world.destroyRegister(that);
  };

  that.removeFromWorld = ()=> {
    that.owner.updateUnRegister(that);
    that.owner.node.removeChild(that.node);
    that.destroy();
    that.owner = null;
  };

  Registry(that, ['destroy', 'update']);

  return that;
};

export default BaseLayer;