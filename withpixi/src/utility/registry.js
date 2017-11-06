/**
 * Created by wizard on 16/5/30.
 */
const Registry = (obj, handleNames)=> {

  let _listenerMap = {};

  obj.addHandleType = (handles)=> {
    for(let i=0; i<handles.length; ++i) {
      let handleName = handles[i];
      let list = _listenerMap[handleName];
      if(!list) {
        _listenerMap[handleName] = list = [];
      }
      obj[ handleName + 'Register'] = (target)=> {
        if(list.indexOf(target) !== -1) {
          return;
        }
        list.push(target);
      };

      obj[ handleName + 'UnRegister'] = (target)=> {
        let index = list.indexOf(target);
        if(index === -1) {
          return;
        }
        list.splice(index, 1);
      };

      obj[ handleName + 'Execute'] = function () {
        for(let i=0; i<list.length; ++i) {
          list[i][handleName].apply(null, arguments);
        }
      };
    }
  };

  obj.addHandleType(handleNames);

  return obj;
};

export default Registry;