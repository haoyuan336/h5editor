/**
 * Created by hewenlong on 16-5-4.
 */

import UIExtends from './ui-extends'

const ProgressBar = (spec)=> {

  let _uiParts = {
    direction : spec.direction ?  spec.direction : 'left',
    percent : 0
  };

  let _node = new PIXI.Container();

  let _frontSprite = null;
  let _backSprite = null;
  let _label = null;
  let _mask = null;

  (()=>{
    UIExtends(spec.id, _node, _uiParts);
    
    if(spec.bg) {
      _backSprite = PIXI.Sprite.fromImage(spec.bg);
      _backSprite.anchor = {
        x: 0.5,
        y: 0.5
      };
      _node.addChild(_backSprite);
      if(spec.width) {
        _backSprite.width = spec.width;
      }
    }

    _frontSprite = PIXI.Sprite.fromImage(spec.fg);
    if(spec.width) {
      _frontSprite.width = spec.width;
    }
    if (spec.tint) {
      _frontSprite.tint = spec.tint;
    }


    _frontSprite.anchor.set(0.5);

    _mask = new PIXI.Graphics();
    _mask.clear();
    _mask.beginFill();
    _mask.drawRect(0,0,0,0);
    _mask.endFill();
    _frontSprite.mask = _mask;
    _node.addChild(_mask);

    _mask.position = {
      x: - _frontSprite.width / 2,
      y: - _frontSprite.height / 2
    };

    _node.addChild(_frontSprite);
  })();

  const _setContent = (content)=> {
    if (content == undefined || content == null) {
      return;
    }

    if(!_label) {
      let textStyle = spec.style ? spec.style : {font:'12px Arial', fill: '#FFFFFF'};
      let resolution = spec.resolution ? spec.resolution : 1;
      _label = new PIXI.Text('', textStyle, resolution);
      _label.anchor.set(0.5);
      _node.addChild(_label);
    }

    _label.text = content;
  };
  _setContent(spec.text);

  //percent from 0 to 100
  const _setPercent = (percent)=> {
    _uiParts.percent = percent;
    const realPercent = percent / 100;
    let x,y,width,height;
    switch (_uiParts.direction) {
    case 'left':
      x=0;
      y=0;
      width = _frontSprite.width * realPercent;
      height = _frontSprite.height;
      break;
    case 'right':
      x=_frontSprite.width * (1-realPercent);
      y=0;
      width = _frontSprite.width * realPercent;
      height = _frontSprite.height;
      break;
    case 'up':
      x=0;
      y=0;
      width = _frontSprite.width;
      height = _frontSprite.height * realPercent;
      break;
    case 'down':
      x=0;
      y=_frontSprite.height * (1- realPercent);
      width = _frontSprite.width;
      height = _frontSprite.height * realPercent;
      break;
    default:
      console.log('wrong progress direction: ' + _uiParts.direction + '\n only support left|right|up|down');
      break;
    }

    _mask.clear();
    _mask.beginFill();
    _mask.drawRect(x,y,width,height);
    _mask.endFill();
  };


  Object.defineProperty(_node, "percent", {
    get: () => {
      return _uiParts.percent;
    },
    set: (val) => {
      _setPercent(val);
    }
  });

  Object.defineProperty(_node, "text", {
    get: () => {
      return _label ? _label.text : '';
    },
    set: (val) => {
      _setContent(val);
    }
  });

  Object.defineProperty(_node, "tint", {
    set: (val) => {
      _frontSprite.tint = val;
    }
  });
  Object.defineProperty(_node,"height",{
    get: ()=>{
      return _backSprite.height;
    }
  });
  Object.defineProperty(_node,"width",{
    get: ()=>{
      return _backSprite.width;
    }
  });


  return _node;
};

export default ProgressBar;