/**
 * Created by chuhaoyuan on 2017/1/11.
 */
const Action = function () {
  let that = {};
  that.moveTo = function (node,position,time,easing) {
    return new Promise(function (resolve,reject) {
      let nowPosition = node.position;
      let action = new TWEEN
        .Tween(nowPosition)
        .to(position,time)
        .onUpdate(function () {
          node.position = {
            x: this.x,
            y: this.y
          }
        })
        .onComplete(function () {
          resolve();
        });
        if (easing){
          action.easing(easing);
        }
      action.start();
    });
  };

  that.alphaTo = function (node,alpha, time,easing) {
    return new Promise(function (resolve,regect) {
      let nowAlpha = node.alpha;
      let action = new TWEEN
        .Tween({alpha: nowAlpha})
        .to({alpha: alpha},time)
        .onUpdate(function () {
          node.alpha = this.alpha
        })
        .onComplete(function () {
          resolve();
        });
      if (easing){
        action.easing(easing)
      }
      action.start();
    })
  };


  that.scaleTo = function (node,scale,time,easing) {
    return new Promise(function (resolve,regect) {
      let  nowScale = node.scale;
      let action = new TWEEN
        .Tween(nowScale)
        .to(scale,time)
        .onUpdate(function () {
          node.scale = {
            x: this.x,
            y: this.y
          }
        })
        .onComplete(function () {
          resolve();
        });
      if (easing){
        action.easing(easing);
      }
      action();
    })
  };
  
  
  return that;
};
export default Action;