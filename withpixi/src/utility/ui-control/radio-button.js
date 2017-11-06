/**
 * Created by wizard on 16/5/5.
 */

import UIExtends from './ui-extends'

const RadioButton = (spec)=> {

  const RadioState = {
    unchecked: 0,
    checked: 1
  };

  let _sprite = null;
  let _uiParts = {
    //texture
    checkedTexture: null,
    uncheckedTexture: null,

    _state: null,
    group: null,

    //events
    onCheckOn: null,
    onCheckOff: null,
    onCheckChange: null,

    //behaviour
    _onClick: ()=> {
      _sprite.checked = true;
    }
  };

  (()=>{

    _uiParts.checkedTexture = PIXI.Texture.fromImage(spec.bg_on);
    _uiParts.uncheckedTexture = PIXI.Texture.fromImage(spec.bg_off);

    _sprite = new PIXI.Sprite();
    _sprite.anchor.set(0.5);
    _sprite.interactive = true;

    //_onClick may be override later
    _sprite.on('click', ()=>_uiParts._onClick() )
      .on('tap', ()=>_uiParts._onClick() );

    UIExtends(spec.id, _sprite, _uiParts);
  })();

  const _setState = (newState)=> {
    if(_uiParts._state == newState) {
      return;
    }

    switch (newState) {
    case RadioState.checked:
      if (_uiParts.group) {
        _uiParts.group.fire('ui_control:check_on', _sprite);
      }
      _sprite.texture = _uiParts.checkedTexture;
      if(_uiParts.onCheckOn) {
        _uiParts.onCheckOn.call(this, _sprite);
      }
      break;
    case RadioState.unchecked:
      _sprite.texture = _uiParts.uncheckedTexture;
      if(_uiParts.onCheckOff) {
        _uiParts.onCheckOff.call(this, _sprite);
      }
      break;
    default:
      console.log('wrong radio state' + newState);
      break;
    }
    _uiParts._state = newState;
    if(_uiParts.onCheckChange) {
      _uiParts.onCheckChange.call(this, _sprite);
    }
  };

  _setState(RadioState.unchecked);

  Object.defineProperty(_sprite, 'checked', {
    get: ()=> {
      return _uiParts._state == RadioState.checked ? true : false;
    },
    set: (val)=> {
      if(val) {
        _setState(RadioState.checked);
      }
      else {
        _setState(RadioState.unchecked);
      }
    }
  });

  (()=>{
    const handlerNames = ['group', 'onCheckOn', 'onCheckOff', 'onCheckChange'];
    for(let i=0; i<handlerNames.length; ++i) {
      Object.defineProperty(_sprite, handlerNames[i], {
        get: ()=> {
          return _uiParts[handlerNames[i] ];
        },
        set: (val)=> {
          _uiParts[handlerNames[i] ] = val;
        }
      });
    }
  })();

  return _sprite;
};

export default RadioButton;