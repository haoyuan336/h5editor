/**
 * Created by wizard on 16/5/3.
 */

import Scale3Sprite from './scale3-sprite'
import Scale9Sprite from './scale9-sprite'
import ScrollView from './scroll-view'
import ListView from './list-view'
import PageView from './page-view'
import Button from './button'
import ProgressBar from './progress-bar'
import RadioButton from './radio-button'
import RadioGroup from './radio-group'
//import UIManager from './ui-manager'
import CheckBox from './check-box'
import creater from './creater'
import BMLabel from './bm-label'

export default {
  Scale3Sprite,
  Scale9Sprite,
  ScrollView,
  ListView,
  PageView,
  ProgressBar,
  RadioButton,
  RadioGroup,
  Button,
  CheckBox,
  BMLabel,
  UIManager: creater,
  create: creater.create,
  addComponent: creater.addTemplete,
  Type: {
    Layout: "Layout",
    Sprite: "Sprite",
    Label: "Label",
    Scale3Sprite: "Scale3Sprite",
    Scale9Sprite: "Scale9Sprite",
    ScrollView: "ScrollView",
    ListView: "ListView",
    PageView: "PageView",
    ProgressBar: "ProgressBar",
    RadioButton: "RadioButton",
    RadioGroup: "RadioGroup",
    Button: "Button",
    CheckBox: "CheckBox",
    BMLabel: "BMLabel"
  }
}