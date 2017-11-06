/**
 * Created by wizard on 16/3/31.
 */

import Inherited from "../inherited.js"
import BaseLayer from "./base-layer.js"
import Director from  "./director.js"
import Helper from "../helper"

const ModelLayer = function (blackArea) {
  let that = Inherited(BaseLayer());

  let _blackBg = null;

  if (blackArea) {
    let x, y, width, height;
    const director = Director.sharedDirector();
    if (blackArea === true) {
      x = 0;
      y = 0;
      width = director.width;
      height = director.height;
    }
    else {
      x = blackArea.x;
      y = blackArea.y;
      width = blackArea.width;
      height = blackArea.height;
    }

    // x -= director.screen.left;
    // y -= director.screen.top;
    x -= 0;
    y -= 0;

    _blackBg = new PIXI.Graphics();
    _blackBg.lineStyle(2, 0x000000, 0.5);
    _blackBg.beginFill(0x000000, 0.4);
    _blackBg.drawRect(x, y, width, height * 1.2);
    _blackBg.hitArea = new PIXI.Rectangle(x, y, Director.sharedDirector().width, Director.sharedDirector().height);

    _blackBg.zorder = -1;
    that.blackBg = _blackBg;
    that.node.addChild(_blackBg);
  }

  that.inheritOn('init', ()=> {
    _blackBg.interactive = true;
    _blackBg.on('tap', that.onExit)
      .on('click', that.onExit);
  });

  that.inheritOn('add2World', function (world) {
    world.lock2Layer(that);
    return true;
  });

  that.onExit = ()=> {
    console.log('model layer on exit');
  };

  that.removeFromWorld = function () {
    that.owner.unlock2Layer(that);
    that.owner.updateUnRegister(that);
    that.owner.node.removeChild(that.node);

    that.destroy();
    that.owner = null;
  };

  return that;
};

export default ModelLayer