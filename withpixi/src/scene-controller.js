/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import {Director} from './utility/imports'
import EditorWorld from './editor-world/editor-world'
const SceneController = function () {
  var that = {};


  that.enterEditorWorld = function () {
    var editorWorld = EditorWorld();
    Director.sharedDirector().startWorld(editorWorld);
  };

  return that;
};
export default SceneController;