/**
 * Created by wizard on 16/5/20.
 */
import UIExtends from './ui-extends'

const BMLabel = (spec)=> {

  let _node = null;
  let _label = null;
  let _anchor  = new PIXI.Point();
  let _uiParts = {};
  (()=> {
    _node = new PIXI.Container();
    //const resolution = spec.resolution ? spec.resolution : 1;
    spec.style.font = spec.style.font ? spec.style.font : '20px font_yao';
    console.log('font: ' + JSON.stringify(spec.style.font));
    spec.style.align = 'left';
    _label = new PIXI.extras.BitmapText(spec.text, spec.style);

    _label.tint = spec.style.fill!== undefined ? spec.style.fill : 0xffffff;
    _node.addChild(_label);
    UIExtends(spec.id, _node, _uiParts);

    //todo(yuchenl): PIXI  BitmapText bug, need call these
    if(spec.style.maxWidth) {
      _label.maxWidth = spec.style.maxWidth;
      _label.updateText();
    }
  }) ();

  Object.defineProperty(_node, 'text', {
    get: ()=> {
      return _label.text;
    },
    set: (val)=> {
      _label.text = val;
      _label.updateText();
      //console.log('label anchor: ' + JSON.stringify(_node.anchor) );
      //console.log('label size: ' + _label.textWidth  + " : " + _label.textHeight);
      _label.x  = -_label.textWidth * _node.anchor.x;
      _label.y  = -_label.textHeight * _node.anchor.y;
    }
  });

  Object.defineProperty(_node, 'anchor', {
    get: ()=> {
      return _anchor;
    },
    set: (val)=> {
      _anchor.set(val.x, val.y);
      _label.x  = -_label.textWidth * _node.anchor.x;
      _label.y  = -_label.textHeight * _node.anchor.y;
    }
  });

  return _node;
};

export default BMLabel;