/**
 * Created by wizard on 16/5/5.
 */

import RadioButton from './radio-button'

const CheckBox = (spec)=> {
  let that = RadioButton(spec);

  that.uiController._onClick = ()=> {
    that.checked = !that.checked;
  };

  return that;
};

export default CheckBox;