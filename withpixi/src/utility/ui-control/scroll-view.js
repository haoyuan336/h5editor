/**
 * Created by wizard on 16/5/3.
 */
import UIExtends from './ui-extends'
import defaults from './default-defines'
import Vec2 from './../math/vec2'
const ScrollView = (spec)=> {
  let _uiParts = {
    bounceX: spec.bounceX != undefined ? spec.bounceX: defaults.bounceMax,
    bounceY: spec.bounceY != undefined ? spec.bounceY: defaults.bounceMax,
    bounceSpeed: spec.bounceSpeed != undefined ? spec.bounceSpeed: defaults.bounceSpeed,
    contentBounds: spec.bounds,
    
    _state: null,
    
    //behaviour
    _collideBounds: null,
    _controlMove: null,
    _springMove: null,
    _pushItem: null
  };

  let _scroll_speed = {
    x: 0,
    y: 0
  };
  let _node = null;
  let _mask = null;
  let _contentNode = null;
  (()=>{
    _node = new PIXI.Container();
    _mask = new PIXI.Graphics();
    _mask.filling = true;
    _mask.drawRect(0, 0, spec.width, spec.height);
    _node.addChild(_mask);

    _node.interactive = true;
    _node.hitArea = new PIXI.Rectangle(0,0,spec.width,spec.height);
    
    _contentNode = new PIXI.Container();
    _contentNode.mask = _mask;
    _node.addChild(_contentNode);

    UIExtends(spec.id, _node, _uiParts);
  }) ();

  //debug
  if (defaults.debugMode) {
    (()=>{
      let debug = new PIXI.Graphics();
      debug.lineStyle(1, 0x0000FF, 1);
      debug.drawRect(0, 0, spec.width, spec.height);
      _node.addChild(debug);
    })();
  }

  const MovingState = {
    auto: 0,
    touching: 1,
  };

  const _setState = (newState) => {
    if(_uiParts._state === newState) {
      return;
    }
    switch (newState){
      case MovingState.auto:

        break;
      defaults:
      break;
    }

    _uiParts._state = newState;
  };

  _uiParts._controlMove = (x, y)=> {
    _contentNode.position.x += x;
    _contentNode.position.y += y;

    _contentNode.position.x = Math.min(_contentNode.position.x, _uiParts.contentBounds.right + _uiParts.bounceX);
    _contentNode.position.x = Math.max(_contentNode.position.x, _uiParts.contentBounds.left - _uiParts.bounceX);

    _contentNode.position.y = Math.min(_contentNode.position.y, _uiParts.contentBounds.bottom + _uiParts.bounceY);
    _contentNode.position.y = Math.max(_contentNode.position.y, _uiParts.contentBounds.top - _uiParts.bounceY);
  };

  let _lastPos = null;
  let _touchBeginPos = null;
  const _onTouchBegin = (event)=> {
    _lastPos = {
      x: event.data.global.x,
      y: event.data.global.y
    };

    _touchBeginPos = _lastPos;
    _setState(MovingState.touching);
  };

  const _onTouchMove = (event)=> {
    if(!_lastPos) {
      return;
    }

    let pos = event.data.global;

    _uiParts._controlMove(pos.x -_lastPos.x, pos.y -_lastPos.y);

    _lastPos = {
      x: pos.x,
      y: pos.y
    };
  };

  const _onTouchEnd = (event) => {
    //console.log('touch end : '+ JSON.stringify(event.data) );
    let pos = event.data.global;
    _scroll_speed = {
      x: _touchBeginPos.x - pos.x,
      y: _touchBeginPos.y - pos.y
    };
    _lastPos = null;

    _setState(MovingState.auto);
  };

  (()=>{
    _node.on('touchstart', _onTouchBegin)
      .on('mousedown', _onTouchBegin);


    _node.on('mouseup', _onTouchEnd)
      .on('touchend', _onTouchEnd)
      .on('mouseupoutside', _onTouchEnd)
      .on('touchendoutside', _onTouchEnd);

    _node.on('touchmove', _onTouchMove)
    .on('mousemove', _onTouchMove);
  })();

  _uiParts._pushItem = (item) => {
    _contentNode.addChild(item);
  };

  _uiParts._collideBounds = (dt)=> {
    let isCollide = false;
    if(_contentNode.position.x < _uiParts.contentBounds.left) {
      _contentNode.position.x += dt * _uiParts.bounceSpeed / 1000;
      if(Math.abs(_contentNode.position.x - _uiParts.contentBounds.left) <= 5 ) {
        _contentNode.position.x = _uiParts.contentBounds.left;
      }
      isCollide = true;
    }

    if(_contentNode.position.x > _uiParts.contentBounds.right) {
      _contentNode.position.x -= dt * _uiParts.bounceSpeed / 1000;
      if(Math.abs(_contentNode.position.x - _uiParts.contentBounds.right) <= 5 ) {
        _contentNode.position.x = _uiParts.contentBounds.right;
      }
      isCollide = true;
    }

    if(_contentNode.position.y < _uiParts.contentBounds.top) {
      _contentNode.position.y += dt * _uiParts.bounceSpeed / 1000;
      if(Math.abs(_contentNode.position.y - _uiParts.contentBounds.top) <= 5 ) {
        _contentNode.position.y = _uiParts.contentBounds.top;
      }
      isCollide = true;
    }

    if(_contentNode.position.y > _uiParts.contentBounds.bottom) {
      _contentNode.position.y -= dt * _uiParts.bounceSpeed / 1000;
      if(Math.abs(_contentNode.position.y - _uiParts.contentBounds.bottom) <= 5 ) {
        _contentNode.position.y = _uiParts.contentBounds.bottom;
      }
      isCollide = true;
    }

    return isCollide;
  };


  _uiParts._springMove = (dt)=> {
    // console.log('自动滑动');
    if (Math.abs(_scroll_speed.x) > 5){
      _scroll_speed.x -= _scroll_speed.x / Math.abs(_scroll_speed.x) * 5;
    }else {
      _scroll_speed.x = 0;
    }
    if (Math.abs(_scroll_speed.y) > 5){
      _scroll_speed.y -= _scroll_speed.y / Math.abs(_scroll_speed.y) * 5;
    }else {
      _scroll_speed.y = 0;
    }
    // console.log('scroll speed = ' + JSON.stringify(_scroll_speed));

    let vec = Vec2(_scroll_speed.x, _scroll_speed.y);
    let dis = vec.getDistance(Vec2(0,0)) * 0.05;
    // console.log("dis = " + dis);
    let normal = vec.getNormal();
    _uiParts._controlMove(normal.x * -dis, normal.y * -dis);
  };

  _uiParts.update = (dt)=> {
    if(_uiParts._state != MovingState.auto) {
      return;
    }



    if(_uiParts._collideBounds(dt) ) {

      // _old_scroll_speed = {
      //   x: _scroll_speed.x,
      //   y: _scroll_speed.y
      // };
      // console.log("old scroll speed" + JSON.stringify(_old_scroll_speed));

      _scroll_speed = {
        x: 0,
        y: 0
      };
      return;
    }


    _uiParts._springMove(dt);
  };

  PIXI.ticker.shared.add(()=> {
    // console.log('delta time: ' + PIXI.ticker.shared.deltaTime);
    _uiParts.update(PIXI.ticker.shared.deltaTime * PIXI.ticker.shared.minFPS);
  });

  // _setState(MovingState.auto);

  Object.defineProperty(_node, 'contentNode', {
    get: ()=> {
      return _contentNode;
    }
  });

  Object.defineProperty(_node, 'pushItem', {
    get: ()=> {
      return _uiParts._pushItem;
    }
  });
  Object.defineProperty(_node, "index",{
    set: function (index) {

    }
  });

  return _node;
};

export default ScrollView;