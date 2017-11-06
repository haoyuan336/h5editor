/**
 * Created by wizard on 16/4/29.
 */
import UIExtends from './ui-extends'

const Scale9Sprite = (spec)=> {
  let _baseTexture = null;
  
  let _leftUpTexture = null;
  let _upTexture = null;
  let _rightUpTexture = null;

  let _leftTexture = null;
  let _centerTexture = null;
  let _rightTexture = null;

  let _leftDownTexture = null;
  let _downTexture = null;
  let _rightDownTexture = null;

  let _node = new PIXI.Container();

  UIExtends(spec.id, _node, {});

  (()=>{
    _baseTexture = PIXI.Texture.fromImage(spec.bg);

    let x = _baseTexture.frame.x;
    let y = _baseTexture.frame.y;

    let rightWidth = _baseTexture.frame.width - spec.offsetX - spec.tilingWidth;
    let bottomHeight = _baseTexture.frame.height - spec.offsetY - spec.tilingHeight;

    _leftUpTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(x, y, spec.offsetX, spec.offsetY) );
    _upTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + x, y, spec.tilingWidth, spec.offsetY ) );
    _rightUpTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + spec.tilingWidth + x, y, rightWidth, spec.offsetY ) );

    _leftTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(x, spec.offsetY + y, spec.offsetX, spec.tilingHeight) );
    _centerTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + x, spec.offsetY + y, spec.tilingWidth, spec.tilingHeight) );
    _rightTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + spec.tilingWidth + x, spec.offsetY + y, rightWidth, spec.tilingHeight) );

    _leftDownTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(x, spec.offsetY + spec.tilingHeight + y, spec.offsetX, bottomHeight) );
    _downTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + x, spec.offsetY + spec.tilingHeight + y, spec.tilingWidth, bottomHeight) );
    _rightDownTexture = new PIXI.Texture(_baseTexture, new PIXI.Rectangle(spec.offsetX + spec.tilingWidth + x, spec.offsetY + spec.tilingHeight + y, rightWidth, bottomHeight) );


    //up
    let leftUpSprite = new PIXI.Sprite(_leftUpTexture);
    leftUpSprite.width = spec.offsetX;
    leftUpSprite.height = spec.offsetY;

    let upSprite = new PIXI.Sprite(_upTexture);
    upSprite.width = spec.width - spec.offsetX - rightWidth;
    upSprite.height = spec.offsetY;

    let rightUpSprite = new PIXI.Sprite(_rightUpTexture);
    rightUpSprite.width = rightWidth;
    rightUpSprite.height = spec.offsetY;

    //middle
    let leftSprite = new PIXI.Sprite(_leftTexture);
    leftSprite.width = spec.offsetX ;
    leftSprite.height = spec.height - spec.offsetY - bottomHeight;

    let centerSprite = new PIXI.Sprite(_centerTexture);
    centerSprite.width = spec.width - spec.offsetX - rightWidth;
    centerSprite.height = spec.height - spec.offsetY - bottomHeight;

    let rightSprite = new PIXI.Sprite(_rightTexture);
    rightSprite.width = rightWidth;
    rightSprite.height = spec.height - spec.offsetY - bottomHeight;

    //down
    let leftDownSprite = new PIXI.Sprite(_leftDownTexture);
    leftDownSprite.width = spec.offsetX;
    leftDownSprite.height = bottomHeight;

    let downSprite = new PIXI.Sprite(_downTexture);
    downSprite.width = spec.width - spec.offsetX - rightWidth;
    downSprite.height = bottomHeight;

    let rightDownSprite = new PIXI.Sprite(_rightDownTexture);
    rightDownSprite.width = rightWidth;
    rightDownSprite.height = bottomHeight;

    upSprite.position.x = spec.offsetX;
    rightUpSprite.position.x = spec.width - rightWidth;

    leftSprite.position = {
      x: 0,
      y: spec.offsetY
    };
    centerSprite.position = {
      x: spec.offsetX,
      y: spec.offsetY
    };
    rightSprite.position = {
      x: spec.width - rightWidth,
      y: spec.offsetY
    };

    leftDownSprite.position = {
      x: 0,
      y: spec.height - bottomHeight
    };
    downSprite.position = {
      x: spec.offsetX ,
      y: spec.height - bottomHeight
    };
    rightDownSprite.position = {
      x: spec.width - rightWidth,
      y: spec.height - bottomHeight
    };


    const _putSprites = (spritesList)=> {
      for(let i=0; i<spritesList.length; ++i) {
        spritesList[i].position.x -= spec.width / 2;
        spritesList[i].position.y -= spec.height / 2;

        _node.addChild(spritesList[i]);
      }
    };

    _putSprites([leftUpSprite, upSprite, rightUpSprite, leftSprite, centerSprite, rightSprite, leftDownSprite, downSprite, rightDownSprite]);

  })();

  return _node;
};

export default Scale9Sprite;