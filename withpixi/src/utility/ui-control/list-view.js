/**
 * Created by wizard on 16/5/3.
 */

import ScrollView from './scroll-view'
import defaults from './default-defines'

const ListItem = (item, length) => {
  return {
    item: item,
    length: length
  };
};

const ListView = (spec)=> {
  spec.type = spec.type ? spec.type : "vertical";
  spec.bounds = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  if(spec.type == 'horizontal') {
    spec.bounceY = 0;
  }
  else {
    spec.bounceX = 0;
  }

  let that = ScrollView(spec);

  let _itemList = [];
  const _uiParts = that.uiController;

  _uiParts._pushItem = (child, customLength)=>{

    let length = customLength ? customLength : spec.itemLength;
    let spacing = spec.itemSpacing != undefined ? spec.itemSpacing : defaults.itemSpacing;

    that.contentNode.addChild(child);

    let start = 0;
    for(let i=0; i< _itemList.length; ++i) {
      start += _itemList[i].length + spacing;
    }

    if(spec.type == 'horizontal') {

      child.position = {
        x: start + length / 2,
        y: spec.height / 2
      };
      _uiParts.contentBounds.left = Math.min(0, spec.width - start - length);
      //console.log('list horizontal add child: ' + length);
    }
    else if(spec.type == 'vertical') {
      //console.log('list  vertical add child: ' + length);
      child.position = {
        x: spec.width / 2,
        y: start + length / 2
      };
      _uiParts.contentBounds.top = Math.min(0, spec.height - start - length);
    }

    _itemList.push(ListItem(child, length) );
  };

  const _clearItems = ()=> {
    for(let i=0; i<_itemList.length; ++i) {
      that.contentNode.removeChild(_itemList[i].item);
    }

    _itemList = [];
    _uiParts.contentBounds = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };

    that.contentNode.position.set(0,0);
  };

  const _deleteItems = (child, customLength)=> {
    let n =0;
    for(let i = 0; i<_itemList.length; ++i) {
      if(_itemList[i].item == child){
        that.contentNode.removeChild(_itemList[i].item);
        n = i + 1;
      }
    }
    if(n !== 0){
      for(n; n <_itemList.length; ++n){
        if(spec.type == 'horizontal') {
          _itemList[n].item.position.x -= customLength;
        }
        else if(spec.type == 'vertical') {
          _itemList[n].item.position.y -= customLength;
        }
      }
    }
  };

  Object.defineProperty(that, 'clearItems', {
    get: ()=> {
      return _clearItems;
    }
  });

  Object.defineProperty(that, 'deleteItems', {
    get: ()=> {
      return _deleteItems;
    }
  });

  return that;
};

export default ListView;
