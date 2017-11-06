/**
 * Created by chuhaoyuan on 2017/8/22.
 */
import {ResourceManager, Director, Helper} from './utility/imports'
import SceneController from './scene-controller'
import resources from './resources'
import defines from './defines'
window.onload = function () {

  // console.log("nats" + JSON.stringify(nats));



  const _getResolution = ()=> {
    let resolutionStr = Helper.getQueryString('resolution');
    let resolution = 2;
    if(resolutionStr) {
      resolution = parseInt(resolutionStr);
    }
    // resolution = 2;

    return resolution >= 2 ? 2 : 1;
  };

  var resList = [];
  for(var index in resources){
    resList.push(resources[index]);
  }

  (async()=>{
    await ResourceManager.loadList(resList);
    await ResourceManager.loadFontList(defines.fontList);
    // await Director.create(defines.Canvas.width, defines.Canvas.height , _getResolution(), defines.direction.align);
    // SceneController().enterEditorWorld();


    let render = PIXI.autoDetectRenderer(defines.Canvas.width, defines.Canvas.height);


    document.body.appendChild(render.view);

  })()

};