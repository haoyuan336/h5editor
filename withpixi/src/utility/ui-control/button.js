/**
 * Created by hewenlong on 16-5-3.
 */

import UIExtends from './ui-extends'

const Button = (spec) => {

  let _uiParts = {
    normalTexture: null,
    disableTexture: null,
    enable: true,
    onClick: null
  };

  let _sprite = null;
  let _label = null;

  (()=> {
    _uiParts.normalTexture = PIXI.Texture.fromImage(spec.bg);
    if (spec.bg_disable) {
      _uiParts.disableTexture = PIXI.Texture.fromImage(spec.bg_disable);
    }

    _sprite = new PIXI.Sprite();
    _sprite.texture = _uiParts.normalTexture;

    _sprite.anchor.set(0.5);


    _sprite.interactive = true;

    UIExtends(spec.id, _sprite, _uiParts);
  })();


  const _setTitle = (content)=> {
    if (content == undefined || content == null) {
      return;
    }

    if (!_label) {
      let style = spec.style ? spec.style : {fontFamily: 'Arial', fontSize: "16px"};
      let resolution = spec.resolution ? spec.resolution : 1;
      _label = new PIXI.Text('', style, resolution);
      if (spec.textAnchor) {
        _label.anchor = spec.textAnchor;
      } else {
        _label.anchor.set(0.5);
      }
      _label.position.set(0);
      _sprite.addChild(_label);
    }

    _label.text = content;
  };
  _setTitle(spec.text);


  let _oriScale = null;

  const _playClickDownAction = ()=> {
    if (!_uiParts.enable) {
      return;
    }

    //_oriPosY = that.node.position.y;
    //that.node.position.y += 1;

    _oriScale = {
      x: _sprite.scale.x,
      y: _sprite.scale.y
    };

    _sprite.scale = {
      x: _oriScale.x * 0.98,
      y: _oriScale.y * 0.98
    };

    _sprite.tint = 0xAAAAAA;

    if (_sprite.touchStart && _uiParts.enable) {
      _sprite.touchStart.call(this, _sprite);
    }

  };

  const _playClickUpAction = ()=> {
    if (!_uiParts.enable) {
      return;
    }

    _sprite.tint = 0xFFFFFF;

    if (!_oriScale) {
      return;
    }

    _sprite.scale = _oriScale;

    //
    //if (!_oriPosY) {
    //  return;
    //}
    //that.node.position.y = _oriPosY;
    //_oriPosY = null;
    if (_sprite.touchOver && _uiParts.enable) {
      _sprite.touchOver.call(this, _sprite);
    }
  };

  const _touchBegin = (event, target)=> {
    //console.log("touch Begin");
    _playClickDownAction();
    if (_uiParts.down){
      _uiParts.down.call(this,event);
    }
  };

  const _touchMoved = (event, target)=> {

  };

  const _touchCancel = (event, target)=> {
    //console.log("touch Cancel");
    _playClickUpAction();
  };

  const _touchEnd = (event, target)=> {
    //console.log("touch end");
    _playClickUpAction();
    if (_uiParts.up){
      _uiParts.up.call();
    }
  };

  const _onClick = ()=> {
    //console.log("btn click");
    if (_uiParts.onClick && _uiParts.enable) {
      _uiParts.onClick.call(this, _sprite);
    }
  };

  (()=> {
    _sprite.on("mousedown", _touchBegin)
      .on("mousemove", _touchMoved)
      .on("mouseout", _touchCancel)
      .on("mouseup", _touchEnd)
      .on("touchstart", _touchBegin)
      .on("touchmove", _touchMoved)
      .on("touchendoutside", _touchCancel)
      .on("touchend", _touchEnd)
      .on("click", _onClick)
      .on("tap", _onClick);
  })();

  Object.defineProperty(_sprite, "enable", {
    get: () => {
      return _uiParts.enable;
    },
    set: (val) => {
      _uiParts.enable = val;
      console.log('enable btn: ' + _uiParts.enable);
      if (_uiParts.enable) {
        _sprite.texture = _uiParts.normalTexture;
        _sprite.tint = 0xFFFFFF;
      }
      else{
        if (_uiParts.disableTexture) {
          _sprite.texture = _uiParts.disableTexture;
        }else{
          _sprite.tint = 0xAAAAAA;
        }
      }
    }
  });

  Object.defineProperty(_sprite, "text", {
    get: () => {
      return _label ? _label.text : '';
    },
    set: (val) => {
      _setTitle(val);
    }
  });

  Object.defineProperty(_sprite, "onClick", {
    get: () => {
      return _uiParts.onClick;
    },
    set: (val) => {
      _uiParts.onClick = val;
    }
  });

  Object.defineProperty(_sprite, "down",{
    set: (val)=>{
      _uiParts.down = val;
    }
  });
  Object.defineProperty(_sprite, "up", {
    set: (val)=>{
      _uiParts.up = val;
    }
  });



  return _sprite;
};

export default Button;
