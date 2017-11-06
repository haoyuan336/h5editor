/**
 * Created by wizard on 16/5/28.
 */
const DelayEvent = (obj)=> {

  let registry = {};

  let _delayList = [];
  let _working = false;

  obj.fire = function (event) {
    if(!_working) {
      _delayList.push(arguments);
      return;
    }

    let handler = null;

    if (registry.hasOwnProperty(event)) {
      let event_list = registry[event];
      for (let i = 0; i < event_list.length; ++i) {
        handler = event_list[i];
        let args = [];

        //not including event
        for (let n = 1; n < arguments.length; ++n) {
          args.push(arguments[n]);
        }
        handler.apply(this, args);
      }
    }

    return this;
  };

  obj.on = function (type, method) {
    if (registry.hasOwnProperty(type)) {
      registry[type].push(method);
    }
    else {
      registry[type] = [method];
    }

    return this;
  };

  obj.off = obj.removeListener = function (type, method) {
    if (!registry.hasOwnProperty(type)) {
      return false;
    }
    let index = registry[type].indexOf(method);
    if (index >= 0) {
      registry[type].splice(index, 1);
    }
  };

  obj.removeAllListeners = function () {
    registry = {};
  };

  obj.switchOn = ()=> {
    console.log("switchOn");
    _working = true;
    for(let i=0; i<_delayList.length; ++i) {

      let params = _delayList[i];
      let event = params[0];
      let handler = null;

      if (registry.hasOwnProperty(event)) {
        let event_list = registry[event];
        for (let i = 0; i < event_list.length; ++i) {
          handler = event_list[i];
          let args = [];

          //not including event
          for (let n = 1; n < params.length; ++n) {
            args.push(params[n]);
          }
          handler.apply(this, args);
        }
      }
    }
  };


  return obj;
};

export default DelayEvent;