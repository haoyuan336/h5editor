/**
 * Created by chuhaoyuan on 2016/10/11.
 */
const Vec2 = (x, y) => {
  let that = {x: x, y: y};
  that.getDistance = (object) => {
    //两点之间距离
    let a = ( that.x - object.x ) * (that.x - object.x) + (that.y - object.y) * (that.y - object.y);
    let l = Math.sqrt(a);
    let w = parseInt(l);
    if (l - w < 0.00001) {
      return w;
    }

    return l;
  };
  that.getNormal = () => {
    //获取单位向量
    let n = that.x * that.x + that.y * that.y;
    if (n === 1) {
      return that;
    }
    n = Math.sqrt(n);
    if (n < Number.MIN_VALUE) {
      return that;
    }
    n = 1 / n;
    let x = that.x * n;
    let y = that.y * n;
    return Vec2(x, y);
  };
  that.normal = () => {
    //转换成单位向量
    return that.getNormal();
  };
  that.add = (object) => {
    //向量加

    let x = that.x + object.x;
    let y = that.y + object.y;
    return Vec2(x, y);
  };
  that.sub = (object) => {
    //向量减

    let x = that.x - object.x;
    let y = that.y - object.y;
    return Vec2(x, y);
  };
  that.multValue = (value) => {
    let x = that.x * value;
    let y = that.y * value;
    return Vec2(x, y);
  };
  that.addValue = (value) => {
    let x = that.x + value;
    let y = that.y + value;
    return Vec2(x, y);
  };
  that.cross = (object) => {
    //向量积
    return that.x * object.y - that.y * object.x;
  };
  that.dot = (object) => {
    //点积
    return that.x * object.x + that.y * object.y;
  };
  that.getRadians = (object) => {
    //得到向量弧度
    let a = that.getNormal();
    let b = object.getNormal();

    let angle = Math.atan2(a.cross(b), a.dot(b));
    // console.log('angle = ' + angle);
    if (Math.abs(angle) < Number.MIN_VALUE) {
      return 0
    }
    return angle;
  };

  that.equals = (object) => {
    //判断向量是否绝对相等
    return (Math.abs(that.x - object.x) < Number.MIN_VALUE) && (Math.abs(that.y - object.y) < Number.MIN_VALUE);
  };

  that.getAngle = (object) => {
    //得到向量角度
    return that.getRadians(object) * 180 / Math.PI;
  };


  that.isZero = () => {
    return (Math.abs(that.x) < Number.MIN_VALUE) && (Math.abs(that.y) < Number.MIN_VALUE);
  };

  that.rotateByAngle = (object, angle) => {
    //向量转一个角度
    let sinAngle = Math.sin(angle);
    let cosAngle = Math.cos(angle);
    let x = 0;
    let y = 0;
    if (object.isZero()) {
      //console.log('旋转点是0');
      let tempX = that.x * cosAngle - that.y * sinAngle;
      y = that.y * cosAngle + that.x * sinAngle;
      x = tempX;
    } else {
      let tempX = that.x - object.x;
      let tempY = that.y - object.y;
      x = tempX * cosAngle - tempY * sinAngle + object.x;
      y = tempY * cosAngle + tempX * sinAngle + object.y;
    }

    return Vec2(x, y);

  };


  return that;
};
export default Vec2;