/**
 * Created by chuhaoyuan on 2017/8/22.
 */
const Bezier = function (controllerPoints, count) {


  function Point2D(x,y){
    this.x=x||0.0;
    this.y=y||0.0;
  }

  function PointOnCubicBezier( cp, t )
  {
    var   ax, bx, cx;
    var   ay, by, cy;
    var   tSquared, tCubed;
    var   result = new Point2D ;

    /*計算多項式係數*/

    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;

    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    /*計算位於參數值t的曲線點*/

    tSquared = t * t;
    tCubed = tSquared * t;

    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;

    return result;
  }


  function ComputeBezier( cp, numberOfPoints, curve )
  {
    var   dt;
    var   i;

    dt = 1.0 / ( numberOfPoints - 1 );

    for( i = 0; i < numberOfPoints; i++)
      curve[i] = PointOnCubicBezier( cp, i*dt );
  }
  var curve=[];

  ComputeBezier(controllerPoints , count, curve );


  return curve;
};
export default Bezier;