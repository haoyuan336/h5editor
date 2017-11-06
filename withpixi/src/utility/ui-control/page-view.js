/**
 * Created by wizard on 16/5/12.
 */
import ScrollView from './scroll-view'

const PageView = (spec)=> {
  spec.type = spec.type ? spec.type : "vertical";
  spec.bounds = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  };
  spec.bounceY = 0;
  spec.bounceX = 0;

  let that = ScrollView(spec);
  let _uiParts = that.uiController;

  let _pageList = [];
  _uiParts.currentIndex = 0;

  _uiParts._pushItem = (child)=>{
    console.log('page push item');
    that.contentNode.addChild(child);

    let start = 0;

    if(spec.type == 'horizontal') {
      start = _pageList.length * spec.width;
      child.position = {
        x: start + spec.width / 2,
        y: spec.height / 2
      };
      _uiParts.contentBounds.left = - _pageList.length * spec.width;
    }
    else if(spec.type == 'vertical') {
      start = _pageList.length * spec.height;
      child.position = {
        x: spec.width / 2,
        y: start + spec.height / 2
      };
      _uiParts.contentBounds.top =  - _pageList.length * spec.height;
    }

    _pageList.push(child);
  };

  _uiParts._springMove = (dt)=>{
    if(_pageList.length <= 0) {
      return;
    }

    switch (spec.type) {
    case 'horizontal':
      let targetX = -_uiParts.currentIndex * spec.width;

      if(Math.abs(that.contentNode.position.x - targetX) <= 10) {
        that.contentNode.position.x = targetX;
      }
      else {
        that.contentNode.position.x += targetX > that.contentNode.position.x ? dt * 0.5 : dt * -0.5;
      }
      break;
    case 'vertical':
      let targetY = -_uiParts.currentIndex * spec.height;
      if(Math.abs(that.contentNode.position.y - targetY) <= 10) {
        that.contentNode.position.y = targetY;
      }
      else {
        that.contentNode.position.y += targetY > that.contentNode.position.y ? dt * 0.5 : dt * -0.5;
      }
      break;
    default:
      break;
    }

  };

  _uiParts.inheritOn('_controlMove', (x, y)=> {
    switch (spec.type) {
    case 'horizontal':
      _uiParts.currentIndex = Math.floor( (-that.contentNode.position.x + spec.width / 2) / spec.width );
      break;
    case 'vertical':
      _uiParts.currentIndex = Math.floor( (-that.contentNode.position.y + spec.height / 2) / spec.height );
      break;
    default:
      break;
    }
  });

  Object.defineProperty(that, 'pageCount', {
    get: ()=> {
      return _pageList.length;
    }
  });

  Object.defineProperty(that, 'length', {
    set: (val)=> {
      spec.width = val;
    }
  });

  Object.defineProperty(that, 'currentIndex', {
    get: ()=> {
      return _uiParts.currentIndex;
    },
    set: (val)=> {
      _uiParts.currentIndex = val;
    }
  });

  return that;
};

export default PageView;