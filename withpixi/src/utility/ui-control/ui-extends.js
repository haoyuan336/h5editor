/**
 * Created by wizard on 16/5/20.
 */

import Inherited from '../inherited'

const UIExtends = (uid, obj, uiObj) => {
  Object.defineProperty(obj, 'node', {
    get: ()=> {
      return obj;
    }
  });

  if(uiObj) {
    Inherited(uiObj);
    Object.defineProperty(obj, 'uiController', {
      get: ()=> {
        return uiObj;
      }
    });
  }

  if(uid || uid ===0) {
    const _uid = uid;
    Object.defineProperty(obj, 'id', {
      get: ()=> {
        return _uid;
      }
    });
  }
};

export default UIExtends;
