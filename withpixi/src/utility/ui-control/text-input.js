/**
 * Created by wizard on 16/5/30.
 */

import UIExtends from './ui-extends'

const TextInput = function (spec) {
  //
  //let input = new CanvasInput({
  //  canvas: document.getElementById('canvas_input'),
  //  x: 240,
  //  y: 300
  //});

  let _node = null;

  let _label = null;
  let _bg = null;

  let _domInput = null;

  let _anchor = new PIXI.Point(0.5,0.5);

  (()=>{
    _node = new PIXI.Container();
    //_node.interactive = true;
    //_node.hitArea = new PIXI.Rectangle(0,0,1000,1000);

    _bg = PIXI.Sprite.fromImage(spec.bg);
    _bg.anchor.set(0.5, 0.5);
    _node.addChild(_bg);

    let resolution = spec.resolution ? spec.resolution : 1;
    _label = new PIXI.Text(spec.text, spec.style, resolution);
    _label.anchor.set(0.5,0.5);
    _node.addChild(_label);

    _domInput = document.createElement("input");
    _domInput.id = "input_" + spec.id;
    _domInput.style.position = 'absolute';
    _domInput.style.top = '-100px';
    document.body.appendChild(_domInput);

    _domInput.addEventListener('input', function (event) {
      var cpos = getCaretPosition();
      var str = _domInput.value;
      setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
      setTextWithCaret(str, true);
    });
    _domInput.addEventListener('keydown', function (event) {
      var cpos = getCaretPosition();
      var str = _domInput.value;
      setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
    });
    _domInput.addEventListener('keyup', function (event) {
      var cpos = getCaretPosition();
      var str = _domInput.value;
      setTextWithCaret(str.substr(0, cpos) + '|' + str.substr(cpos));
    });

    //_domInput.focus();
    //_domInput.addEventListener("focus",function(){
    //  //whatever you want to do with the input value
    //  console.log('focus input');
    //});
    //
    //_domInput.addEventListener("blur",function(){
    //  //whatever you want to do with the input value
    //  console.log('blur input');
    //});

    //_domInput.focus();
  })();

  (()=>{
    const _onClick = function () {
      //console.log('click input');
      //_domInput.style.top = '50px';
      //_domInput.focus();
      _domInput.focus();
    };
    _bg.interactive = true;
    _bg.on('tap', _onClick)
      .on('click', _onClick);

    _label.interactive = true;
    _label.on('tap', _onClick)
      .on('click', _onClick);
  })();

  Object.defineProperties(_node, {
    anchor: {
      get: function () {
        return _anchor;
      },
      set: function (val) {
        _anchor.set(val.x, val.y);
        _bg.anchor.set(val.x, val.y);
        _label.anchor.set(val.x, val.y);
      }
    }
  });


  const getCaretPosition = function () {
    var ctrl = _domInput;
    if (!ctrl)
      return 0;
    var CaretPos = 0;
    // IE Support
    if (document['selection']) {
      ctrl.focus();
      var Sel = document['selection'].createRange();
      Sel.moveStart('character', -ctrl.value.length);
      CaretPos = Sel.text.length;
    }
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
      CaretPos = ctrl.selectionStart;
    return (CaretPos);
  };

  const setCaretPosition = function (pos) {
    var ctrl = _domInput;
    if (!ctrl)
      return 0;
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  const setTextWithCaret = function (val, event) {
    if (event === void 0) {
      event = null;
    }
    if (_label) {
      _label.text = val;
    }
  };

  //input.focus();

  return _node;
};

export default TextInput;