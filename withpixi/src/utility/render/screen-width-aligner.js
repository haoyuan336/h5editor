/**
 * Created by wizard on 2017/1/1.
 */

const ScreenWidthAligner = function (director, direction) {
  let that = {};

  let _alignList = [];
  let _screenSize = {
    width: 100,
    height: 100
  }

  that.init = function () {

  };

  that.getScreenSize = function () {
    return _screenSize;
  };

  //todo(yuchenl): only for portrait and align width
  that.alignDirector = function () {
    console.log("alignDirector ")
    let realScale = window.innerWidth / director.width;

    //var endWidth = that.width * realScale;
    var endHeight = director.height * realScale;

    var canvas = director.renderer.view;
    canvas.style.padding = 0;
    canvas.style.margin = 0;


    console.log('test size alignDirector: ', window.innerWidth, window.innerHeight, realScale, director.width);

    var offsetBottom = (window.innerHeight - endHeight) / 2;

    let resolution = director.renderer.resolution;
    director.renderer.resize(Math.ceil(window.innerWidth / resolution), Math.ceil(window.innerHeight / resolution) );
    director.root.scale.set(realScale / resolution, realScale / resolution);
    director.root.position.set(0, Math.ceil(offsetBottom / resolution) );
    _screenSize = {
      width: Math.ceil(window.innerWidth / resolution) / (realScale / resolution) ,
      height: Math.ceil(window.innerHeight / resolution) / (realScale / resolution)
    };

    that.resortAlign();
  };
  
  that.portraitDirector = function () {
    //横屏显示
    console.log("portrait ");
    if ( window.innerWidth >= window.innerHeight) {
      // 屏幕为宽屏，不需要翻转
      director.root.rotation = 0;
      that.alignDirector();
      return;
    }
    // 旋转屏幕，交换宽高
    let directorW = director.width;
    let directorH = director.height;
    let realScale = window.innerHeight / directorW;

    //var endWidth = that.width * realScale;
    var endHeight = directorH * realScale;

    var canvas = director.renderer.view;
    canvas.style.padding = 0;
    canvas.style.margin = 0;


    console.log('test size portrait : ', window.innerWidth, window.innerHeight, realScale, director.width);

    var offsetBottom = (window.innerWidth - endHeight) / 2;

    let resolution = director.renderer.resolution;
    _screenSize = {
      width: Math.ceil(window.innerHeight / resolution) / (realScale / resolution) ,
      height: Math.ceil(window.innerWidth / resolution) / (realScale / resolution)
    };
    director.renderer.resize(Math.ceil(window.innerWidth / resolution), Math.ceil(window.innerHeight / resolution) );
    director.root.scale.set(realScale / resolution, realScale / resolution);
    director.root.position.set(window.innerWidth / resolution - Math.ceil(offsetBottom / resolution), 0 );
    console.log('directorH', window.innerWidth, _screenSize.width , offsetBottom, Math.ceil(offsetBottom / resolution));
    director.root.rotation = Math.PI / 180 * 90;

    that.resortPortrait();
  };

  //pixi node,  side: "top"/"bottom", distance for side
  that.registerAlign = function (node, side, distance) {
    _alignList.push({
      node: node,
      side: side,
      distance: distance
    });
  };

  that.unRegisterAlign = function (node) {
    for(let i=0; i<_alignList.length; ++i) {
      if(_alignList[i].node === node) {
        _alignList.splice(i,1);
        break;
      }
    }
  };

  that.resortAlign = function () {
    let item, rootPos, nodePos;
    let resolution = director.renderer.resolution;
    for (let i=0; i<_alignList.length; ++i) {
      item = _alignList[i];
      switch (item.side) {
      case 'top':
        rootPos = director.root.toLocal({x:0, y: item.distance});
        break;
      case 'bottom':
        rootPos = director.root.toLocal({x:0, y: Math.ceil( (window.innerHeight - item.distance) / resolution ) });
        break;
      default:
        continue;
        break;
      }
      nodePos = item.node.toLocal(rootPos, director.root);
      item.node.position.y += nodePos.y;
    }
  };

  that.resortPortrait = function () {
    let item, rootPos, nodePos;
    let resolution = director.renderer.resolution;
    for (let i=0; i<_alignList.length; ++i) {
      item = _alignList[i];
      switch (item.side) {
        case 'top':
          rootPos = director.root.toLocal({x:Math.ceil( (window.innerWidth - item.distance) / resolution ), y: 0});
          break;
        case 'bottom':
          rootPos = director.root.toLocal({x:item.distance, y: 0 });
          break;
        default:
          continue;
          break;
      }
      nodePos = item.node.toLocal(rootPos, director.root);
      item.node.position.y += nodePos.y;
    }
  };



  window.addEventListener('resize', function () {
    // if (direction === "portrait") {
    //   that.portraitDirector();
    // } else {
    //   that.alignDirector();
    // }
  });

  return that;
};

export default ScreenWidthAligner;
