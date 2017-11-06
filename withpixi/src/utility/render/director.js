/**
 * Created by wizard on 16/3/30.
 */

const fpsLimits = 1000 / 60;
//import TWEEN from 'tween.js'
import Registry from '../registry'
import ScreenWidthAligner from './screen-width-aligner'
const Director = function (width, height, resolution, direction) {
  let that = {};

  let _worldList = [];
  that.root = null;

  that.width = width;
  that.height = height;

  //that.renderer = new PIXI.CanvasRenderer(width, height,{resolution: resolution});
  that.renderer = PIXI.autoDetectRenderer(width , height , {resolution: resolution});
  document.body.appendChild(that.renderer.view);


  that.widthAlginer = ScreenWidthAligner(that, direction);

  that.root = new PIXI.Container();

  const _getTopWorld = ()=> {
    if(_worldList.length > 0) {
      return _worldList[_worldList.length - 1];
    }
    return null;
  };

  const _removeWorld = (world)=> {
    if (world) {
      world.onPause();
      world.destroy();
      that.root.removeChild(world.node);
    }
  };

  const _pauseWorld = (world)=> {
    if (world) {
      world.onPause();
      that.root.removeChild(world.node);
    }
  };

  const _resumeWorld = (world)=> {
    if (world) {
      that.root.addChild(world.node);
      world.onResume();
      window.dispatchEvent(new Event('resize'));
    }
  };

  let _lastTime = 0;//performance.now();
  var stepOnce = (timestamp)=> {
    requestAnimationFrame(stepOnce);

    //
    //if(_lastTime === 0) {
    //  _lastTime = timestamp;
    //}

    // that.audio.update();
    var dt = timestamp - _lastTime;
    //console.log("dt : " + dt);
    if(dt <= 0) {
      return
    }

    var tmpTime = _lastTime;
    ////todo(yuchenl): for slow render in Android
    //while (dt > fpsLimits) {
    //  tmpTime += fpsLimits;
    //  PIXI.ticker.shared.update(tmpTime);
    //  TWEEN.update(tmpTime);
    //
    //  that.updateExecute(fpsLimits);
    //  dt -= fpsLimits;
    //}


    tmpTime += dt;
    PIXI.ticker.shared.update(tmpTime);
    TWEEN.update(tmpTime);
    that.updateExecute(dt);

    that.renderer.render(that.root);

    if(that.onLoopEnd) {
      that.onLoopEnd.call(this)
    }

    _lastTime = timestamp;
  };

  Registry(that,['update']);
  
  that.popWorld = ()=> {
    let lastWorld = _worldList.pop();
    _removeWorld(lastWorld);

    let topWorld = _getTopWorld();
    _resumeWorld(topWorld);
  };

  that.replaceWorld = (newWorld)=> {
    let topWorld = _worldList.pop();
    _removeWorld(topWorld);

    _worldList.push(newWorld);
    _resumeWorld(newWorld);

  };

  that.startWorld = (newWorld)=> {
    let topWorld = _getTopWorld();
    _pauseWorld(topWorld);

    _worldList.push(newWorld);
    _resumeWorld(newWorld);
  };

  that.screenShot = function () {
    // let content = that.renderer.plugins.extract.image(that.runningWorld.node);
    let dataUrl = that.renderer.plugins.extract.base64(that.runningWorld.node);
    // window.open(dataUrl);
    return dataUrl;
  };


  Object.defineProperties(that, {
    'runningWorld': {
      get: ()=> {
        return _getTopWorld();
      }
    }
  });

  document.addEventListener('visibilitychange', function() {
    var isHidden = document.hidden;
    if (isHidden) {
      console.log('hidden');
      if (that.onHide) {
        that.onHide();
      }
    } else {
      // 动画开始
      console.log('not hidden');
      _lastTime = performance.now();
      if (that.onShow) {
        that.onShow();
      }
    }
  });

  _lastTime = performance.now();
  requestAnimationFrame(stepOnce);

  return that;
};


let SharedDirector = SharedDirector || (()=> {
    let that = {};
    let sharedDirector = null;
    that.create = function (width, height, resolution, direction) {
      sharedDirector = Director(width, height, resolution, direction);
      return sharedDirector;
    };

    that.sharedDirector = function () {
      return sharedDirector;
    };

    return that;

  })();

export  default SharedDirector;


