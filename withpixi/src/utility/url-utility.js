/**
 * Created by wizard on 2017/1/10.
 */
const URLUtility = function () {
  let that = {};

  that.ropeParamsString = function (params, isStart) {
    let paramStr = "";
    if (params) {
      let start = (isStart != undefined) ? isStart : true;
      for (let index in params) {
        if (start) {
          start = false;
          paramStr += "?";
        }
        else {
          paramStr += "&";
        }
        paramStr += index + "=" + params[index];
      }
    }

    return paramStr;
  };

  return that;
};

const utilityURL = URLUtility();

export default utilityURL;
