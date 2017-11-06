/**
 * Created by wizard on 16/5/9.
 */

import Button from './button'
import Scale3Sprite from './scale3-sprite'
import Scale9Sprite from './scale9-sprite'
import ScrollView from './scroll-view'
import ListView from './list-view'
import ProgressBar from './progress-bar'
import PageView from './page-view'
import RadioGroup from './radio-group'
import RadioButton from './radio-button'
import CheckBox from './check-box'
import BMLabel from './bm-label'
import UIExtends from './ui-extends'
import Input from './input'
import ProgressTouchBar from './progress-touch-bar'
const Create = ()=> {
  let that = {};

  let _factor = {};

  const _handleGroup = (group, groupID, obj)=> {
    if (!groupID && groupID !== 0) {
      return;
    }

    let groupObj = group[groupID];
    if (!groupObj) {
      groupObj = RadioGroup();
      group[groupID] = groupObj;
    }

    groupObj.addChild(obj);
  };
  let _inputList = [];

  const create = (parent, json, owner) => {
    let creatorName = 'create' + json.component;
    if (!_factor.hasOwnProperty(creatorName)) {
      console.log('ui control cont create ' + json.component, JSON.stringify(json));
      json.component = 'Node';
      creatorName = 'createNode';
      //return null;
    }

    if (!json.bg && json.image) {
      json.bg = json.image;
    }

    let obj = _factor[creatorName].call(this, json);

    if (parent) {
      parent.addChild(obj.node);
    }

    if (json.id != undefined) {
      owner[json.id] = obj;
    }

    const addChildren = (oneObj, oneJson)=> {
      if (!oneJson.children) {
        return;
      }
      for (let i = 0; i < oneJson.children.length; ++i) {
        create(oneObj.node, oneJson.children[i], owner);
      }
    };

    const pushChildren = (oneObj, oneJson)=> {
      if (!oneJson.children) {
        return;
      }

      for (let i = 0; i < oneJson.children.length; ++i) {
        let child = create(null, oneJson.children[i], owner);
        oneObj.pushItem(child.node, oneJson.children[i].length);
      }
    };

    switch (json.component) {
      case 'List':
      case 'ListView':
      case 'ScrollView':
      case 'PageView':
        pushChildren(obj, json);
        break;
      case 'Radio':
      case 'CheckBox':
        _handleGroup(owner.group, json.group, obj);
        obj.checked = json.check;
        addChildren(obj, json);
        break;
      case 'Input':
        _inputList.push(json.id);
        break;
      case 'Button':
        obj.onClick = owner.onClick;
        addChildren(obj, json);
        break;
      default:
        addChildren(obj, json);
        break;
    }

    return obj;
  };

  const _alignComponent = (node, json) => {
    if (json.anchor != undefined) {
      node.anchor = json.anchor;
    }
    else {
      node.anchor = {
        x: 0.5,
        y: 0.5
      }
    }

    if (json.position != undefined) {
      node.position = json.position;
    }

    if (json.scale != undefined) {
      node.scale = json.scale;
    }
    if (json.rotation != undefined){
      node.rotation = json.rotation
    }
    if (json.alpha != undefined){
      node.alpha = json.alpha
    }
    if (json.visible != undefined){
      node.visible = json.visible
    }
    if (json.name != undefined){
      node.name = json.name;
    }
    if (json.color != undefined){
      node.tint = json.color;
    }
  };

  _factor.createLayout = _factor.createNode = (json) => {
    let node = new PIXI.Container();
    UIExtends(json.id, node);
    _alignComponent(node, json);
    return node;
  };

  _factor.createSprite = (json) => {
    let sprite = json.bg ? PIXI.Sprite.fromImage(json.bg) : new PIXI.Sprite();
    UIExtends(json.id, sprite);
    _alignComponent(sprite, json);
    return sprite;
  };


  _factor.createLabel = (json)=> {
    json.style = json.style ? json.style : {fontFamily: 'Arial', fontSize: '20px'};

    let label = null;
    if (json.style.bmfont) {
      label = BMLabel(json);
    }
    else {
      let resolution = json.resolution ? json.resolution : 1;
      label = new PIXI.Text(json.text, json.style, resolution);
      UIExtends(json.id, label);
    }
    _alignComponent(label, json);
    return label;
  };

  that.addTemplete = (name, func)=> {
    _factor['create' + name] = (json)=> {
      let layout = func(json);
      _alignComponent(layout.node, json);
      return layout;
    };
  };

  that.addTemplete('Button', Button);
  that.addTemplete('Scale3Sprite', Scale3Sprite);
  that.addTemplete('Scale9Sprite', Scale9Sprite);
  that.addTemplete('ScrollView', ScrollView);
  that.addTemplete('ListView', ListView);
  that.addTemplete('List', ListView);
  that.addTemplete('ProgressBar', ProgressBar);
  that.addTemplete('ProgressTouchBar',ProgressTouchBar);
  that.addTemplete('Progress', ProgressBar);
  that.addTemplete('PageView', PageView);
  that.addTemplete('Radio', RadioButton);
  that.addTemplete('CheckBox', CheckBox);
  that.addTemplete('BMLabel', BMLabel);
  that.addTemplete('Input', Input);

  that.create = (json, onClick)=> {
    let obj = {
      group: {},   //for radio group
      onClick: onClick
    };
    _inputList = [];
    obj.node = create(null, json, obj).node;
    Object.defineProperty(obj, 'components', {
      get: ()=> {
        return obj;
      }
    });

    obj.node.on('added', (parent)=> {
      for (let i = 0; i < _inputList.length; i++) {
        obj[_inputList[i]].registerUpdate(parent);
      }
    });

    obj.node.on('removed', (parent)=> {
      for (let i = 0; i < _inputList.length; i++) {
        obj[_inputList[i]].destroy();
      }
    });


    return obj;
  };


  return that;
};

let creater = Create();

export default creater;
