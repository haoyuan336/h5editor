/**
 * Created by wizard on 16/3/30.
 */

import ResourceManager from './resource-manager';
//import Tween from 'tween.js'
import Vec from './math/vec2'
var helper = helper || {};

helper.reorderNode = (node)=> {
  var depthCompare = (a, b)=> {
    var az = a.zorder;
    var bz = b.zorder;
    if (az == undefined) {
      az = 0;
    }
    if (bz == undefined) {
      bz = 0;
    }
    if (az < bz)
      return -1;
    if (az > bz)
      return 1;
    return 0;
  };

  node.children.sort(depthCompare);
};

helper.sleep = (duration)=> {
  return new Promise(function (resolve, reject) {
    let action = new TWEEN.Tween({})
      .to({}, duration)
      .onComplete(()=> {
        resolve();
      })
      .start();
    // setTimeout(()=> {
    //   resolve();
    // }, duration)
  })
};

helper.delay = (duration, cb) => {
  let tween = new TWEEN.Tween();
  tween.delay(duration);
  tween.onComplete(()=> {
    if (cb) {
      cb();
    }
  });
  tween.start();
};

helper.floorToFixed = function (value,count) {
  let num = Math.floor(value * Math.pow(10 ,count)) / Math.pow(10,count);
  // num = parseFloat(num);
  // num.toFixed(2);
  // return num;
  return num.toFixed(count);
  // return (value - 0.5 / Math.pow(10,count)).toFixed(count);
};
helper.isArray = function (obj) {
  return obj && typeof obj == "object" && obj.hasOwnProperty('length') && typeof obj.length == 'number';
}

helper.isObject = function (obj) {
  return obj && typeof obj == "object" && !helper.isArray(obj);
}

helper.cloneObject = function (sourceObj, targetObj) {

  if (helper.isArray(sourceObj)) {
    if (targetObj == undefined) {
      targetObj = [];
    }

    if (!helper.isArray(targetObj)) {
      return;
    }

    for (var i = 0; i < sourceObj.length; ++i) {
      var subTargetObj;
      if (helper.isArray(sourceObj[i]) || helper.isObject(sourceObj[i])) {
        subTargetObj = helper.cloneObject(sourceObj[i]);
      }
      else {
        subTargetObj = sourceObj[i];
      }

      targetObj.push(subTargetObj);
    }
  }

  else if (helper.isObject(sourceObj)) {
    if (targetObj == undefined) {
      targetObj = {};
    }

    if (!helper.isObject(targetObj)) {
      return;
    }

    for (var index in sourceObj) {
      var subTargetObj;
      if (helper.isArray(sourceObj[index]) || helper.isObject(sourceObj[index])) {
        subTargetObj = helper.cloneObject(sourceObj[index]);
      }
      else {
        subTargetObj = sourceObj[index];
      }

      targetObj[index] = subTargetObj;
    }
  }

  return targetObj;
};

helper.arrayFindOne = (list, filter)=> {
  for (let i = 0; i < list.length; i++) {
    if (filter(list[i])) {
      return list[i];
    }
  }
  return null;
};

const _pSub = (v1,v2)=>{
  return {x: v1.x - v2.x, y: v1.y - v2.y};
};


helper.pSub = _pSub;

const _pDistance = (v1,v2)=>{
  let v = _pSub(v1, v2);
  return Math.sqrt(v.x * v.x + v.y * v.y);
};

helper.pDistance = _pDistance;

const _pVec = (x,y)=>{
  return {x: x,y: y};
};
helper.pVec = _pVec;


helper.pAngle = function (v1,v2) {
  let v = Vec(v1.x,v1.y);
  let v3 = Vec(v2.x,v2.y);
  console.log('v3 = ' + JSON.stringify(v3));
  return v.getRadians(v3) * 180 / Math.PI;
};
const getVRadians = function (v1,v2) {
  let v = Vec(v1.x,v1.y);
  let v3 = Vec(v2.x,v2.y);
  return v.getRadians(v3);
};


helper.pRadians = function (v1,v2) {
  return getVRadians(v1,v2);
};
helper.pNormal = function (v1,v2) {
  let distance = _pDistance(v1,v2);
  let vec = _pSub(v2,v1);
  return {x: 1/distance * vec.x , y: 1/distance * vec.y};
};

const _addVec = function (v1,v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  }
};
helper.addVec = _addVec;


const _multVec = function (v,m) {
  ///向量放大
  return {
    x: v.x * m,
    y: v.y * m
  }
};
helper.multVec = _multVec;

helper.randomInt = function (min, max) {
  var range = max - min;
  var random = Math.random();
  var result = min + Math.floor(random * range);
  return result;
};

helper.getQueryString = (name)=> {
  console.log('get data string = ' + window.location.search + ',' + name);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  console.log('reg = ' + reg);
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return decodeURI(r[2]);
  return null;
};
helper.getDataInString = function (url,name) {
  let str = url;
  for (let i = 0 ; i < str.length ; i ++){
    if (str[i] === '?'){
      str = str.substr(i);
    }
  }
  console.log('get data string = ' + str + ',' + name);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  console.log('reg = ' + reg);
  var r = str.substr(1).match(reg);
  if (r!=null)return decodeURI(r[2]);
  return null;
};
helper.getRandomObjInList = function (list) {
  return list[Math.floor(Math.floor(Math.random() * list.length))];
};
helper.getImgUrlWithSize = (url, size)=> {
  console.log('getImgUrlWithSize', url);
  let suffix = "jpg";
  let strings = url.split(".");
  if (strings.length > 0) {
    suffix = strings[strings.length - 1];
  }
  let newUrl = url + "@1e_" + size + "w_" + size + "h_1c_0i_1o_90Q_1x." + suffix;
  let resultUrl = ((url.indexOf("img1") !== -1) || (url.indexOf("@1e_") !== -1)) ? url : newUrl;
  console.log('getImgUrlWithSize', resultUrl);
  return resultUrl;
};
helper.getImgUrlWithRect = (url, rect)=>{
  console.log('getImgUrlWithSize', url);
  let suffix = "jpg";
  let strings = url.split(".");
  if (strings.length > 0) {
    suffix = strings[strings.length - 1];
  }
  let newUrl = url + "@1e_" + rect.width + "w_" + rect.height + "h_1c_0i_1o_90Q_1x." + suffix;
  let resultUrl = ((url.indexOf("img1") !== -1) || (url.indexOf("@1e_") !== -1)) ? url : newUrl;
  console.log('getImgUrlWithSize', resultUrl);
  return resultUrl;
}


String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};
// helper.thing = undefined;

helper.timeCountDown = function (node,value,cb,size,division) {

  let countNum = 0;
  let thing = new PIXI.Graphics();
  thing.beginFill(0xffFF00, 0.5);
  node.addChild(thing);
  let speed = 360 / value;
  console.log('speed =  ' + speed);
  let normalSize = 200;
  let normalDivision = 30;
  if (size){
    normalSize = size;
  }
  if (division){
    normalDivision = division; //细分角度
  }
  let tween = new TWEEN.Tween({value: value})
    .to({value: 0},value)
    .onUpdate(function () {
      if (countNum >10){
        let radio = this.value * speed;
        thing.clear();
        // thing.lineStyle(10, 0xff0000, 1);
        thing.beginFill(0xffFF00, 0.5);

        thing.moveTo(0, 0);
        thing.lineTo(0, normalSize);

        let count = Math.floor(radio / normalDivision);
        let defaultVec = Vec(0,normalSize);
        let endVec = defaultVec;
        for (let i = 1 ; i < count + 1 ; i ++ ){
          endVec = defaultVec.rotateByAngle(Vec(0,0), normalDivision * i / 180 * Math.PI);
          thing.lineTo(endVec.x,endVec.y);
        }
        let normalEndVec = endVec.rotateByAngle(Vec(0,0), (radio - normalDivision * count) / 180 * Math.PI);
        thing.lineTo(normalEndVec.x,normalEndVec.y);
        node.mask = thing;
      }
      countNum ++;
    })
    .onComplete(function () {
      if (cb){
        cb();
      }
    });
  tween.start();
};

export default helper;