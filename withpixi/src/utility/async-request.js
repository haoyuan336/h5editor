/**
 * Created by wizard on 2016/12/26.
 */
import utilityURL from './url-utility'

const timeoutLimit = 30 * 1000;

const AsyncRequest = function () {
  let that = {};
  let uid = '';
  let auth = '';

  that.get = (url, params, body) => {

    return new Promise(function (resolve, reject) {

      let xhr = new XMLHttpRequest();

      let getURL =  url + utilityURL.ropeParamsString(params);
      console.log("get string: " + getURL);

      xhr.open("GET", getURL + '&f=1', true);
      // if (uid !== '') {
      //   console.log('set uid', uid);
      //   xhr.setRequestHeader('uid', uid);
      // }
      // if (auth !== '') {
      //   console.log('set auth', auth);
      //   xhr.setRequestHeader('Cookie', "auth=95637571%09941d769067ff240e39afe57920f0247e;");
      // }
      xhr.timeout = timeoutLimit;
      xhr.onload = () => {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      };
      xhr.ontimeout = ()=> {
        reject(Error('timeout') )
      };
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.send();
    });
  };

  that.post = (url, params, body) => {

    return new Promise(function (resolve, reject) {

      let xhr = new XMLHttpRequest();   // new HttpRequest instance
      if(params) {
        params['f'] = 1;
      }
      let postUrl = url + utilityURL.ropeParamsString(params);
      console.log('post', postUrl);

      xhr.open("POST", postUrl, true);

      xhr.setRequestHeader("Content-Type","application/json");
      console.log('test uid auth: ', uid, auth);
      xhr.timeout = timeoutLimit;
      xhr.onload = ()=> {
        console.log('xhr.onload',xhr.responseText);
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      };
      xhr.ontimeout = ()=> {
        reject(Error('timeout') )
      };

      if (!body) {
        body = {};
      }
      console.log('xhr.onload 1',params, JSON.stringify(body));
      const bodyContent = JSON.stringify(body);
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.send(bodyContent);
    });
  };

  that.jump = (url, params)=> {
    let paramStr = utilityURL.ropeParamsString(params);
    console.log("jump to url: " + url + paramStr);
    window.location.href = url + paramStr;
  };

  that.setHeader = (_uid, _auth)=> {
    uid = _uid;
    auth = _auth;
  };

  return that;
};

const asyncRequest = AsyncRequest();

export default asyncRequest;
