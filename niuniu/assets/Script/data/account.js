import SRequest from './simple-request'
import PlayerData from './player-data'
import defines from './defines'
var myMD5 = require('my-md5');
const Account = function(){
    let that = {};
    that.playerData = PlayerData();
    let _callback = function (response, cb) {
        if (response.status !== 'ok') { //非正常回调
          console.error('requestData,Failed!', response.detail);
          if (cb && typeof cb == "function") {    //错误的回调
            cb(response, null);
          }
          return
        }
        if (cb && typeof cb == "function") {    //正常回调
          cb(null, response.res);
        }
      };
    
    let _request = function (path, queryParam, body, cb) {
        queryParam = queryParam || {};
        if (body) {
          SRequest.post(defines.gameUrl, path, queryParam, body, data=> {
              console.log("post req");
            _callback(data, cb);
          });
        }
        else {
          SRequest.get(defines.gameUrl, path, queryParam, data=> {
              console.log("get req" + JSON.stringify(data));
            _callback(data, cb);
          })
        }
      };


    that.getUserInfo = function(uid, cb){
        _request("/login/", {uid: uid} , null ,cb);
    }
    that.login = function(uid, pass, cb){
      console.log('md5 = ' + md5(uid));
        _request("/login", {uid: uid, password: pass}, null, cb);
    }

    
    function md5(text) {
        /*
        var crypto = require('crypto');
        //
        return crypto.createHash('md5').update(text).digest('hex');
        */
    
        return cc.md5Encode(text).toLowerCase();
    };


    return that;
}
export default Account;