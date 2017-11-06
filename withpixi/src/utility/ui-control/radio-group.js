/**
 * Created by wizard on 16/5/5.
 */

import Eventuality from '../eventuality'

const RadioGroup = ()=> {
  let that = Eventuality({});

  let _radioList = [];

  that.addChild = (radio) => {
    _radioList.push(radio);
    radio.group = that;
  };

  that.on('ui_control:check_on', (radio)=> {
    for(let i=0; i<_radioList.length; ++i) {
      if(radio.id === _radioList[i].id) {
        continue;
      }

      _radioList[i].checked = false;
    }
  });

  return that;
};

export default RadioGroup;