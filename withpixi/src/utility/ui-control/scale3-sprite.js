/**
 * Created by wizard on 16/4/29.
 */
import UIExtends from './ui-extends'

const Scale3Sprite = (spec)=> {

  let _baseTexture = null;
  let _leftTexture = null;
  let _centerTexture = null;
  let _rightTexture = null;

  let _node = new PIXI.Container();

  UIExtends(spec.id, _node, {});

  (()=> {

    _baseTexture = PIXI.Texture.fromImage(spec.bg);

    let x = _baseTexture.frame.x;
    let y = _baseTexture.frame.y;

    _leftTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(x, y, spec.offsetX, _baseTexture.frame.height) );
    _centerTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + x, y, spec.tilingWidth, _baseTexture.frame.height) );
    _rightTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + spec.tilingWidth + x, y, _baseTexture.frame.width - spec.offsetX - spec.tilingWidth, _baseTexture.frame.height) );

    let leftSprite = new PIXI.Sprite(_leftTexture);
    //leftSprite.width = spec.offsetX;

    let centerSprite = new PIXI.Sprite(_centerTexture);
    centerSprite.width = spec.width - spec.offsetX  * 2;
    centerSprite.position.x = spec.offsetX;

    let rightSprite = new PIXI.Sprite(_rightTexture);
    //rightSprite.width = rightWidth;

    rightSprite.position.x = spec.width - spec.offsetX;
    console.log('right pos: ' + rightSprite.position.x);

    _node.addChild(leftSprite);
    _node.addChild(centerSprite);
    _node.addChild(rightSprite);

    const _centerPosition = (spriteList)=> {
      for(let i=0; i<spriteList.length; ++i) {
        spriteList[i].position.x -= spec.width /2;
        spriteList[i].position.y -= _baseTexture.height / 2;
      }

    };

    _centerPosition([leftSprite, centerSprite, rightSprite]);

  })();
  return _node;
};

export default Scale3Sprite;