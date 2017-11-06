/**
 * Created by guolei on 16/6/2.
 */

//todo(yuchenl): not finish yet
const Input = (spec)=> {
  let that = {};
  //only vase
  that.node = new PIXI.Container();
  let sprite = new PIXI.Sprite.fromImage();
  that.node.addChild(sprite);

  let game = document.getElementById('game');
  let input = document.createElement("input");
  input.style.position = 'absolute';
  input.style.width = spec.width + 'px';
  input.style.height = spec.height + 'px';
  input.style.backgroundImage = "url('" + spec.image + "')";
  input.id = spec.id;
  //input.style.backgroundRepeat = 'no-repeat';
  game.appendChild(input);

  //Object.defineProperty(that, 'position', {
  //  set: (val)=> {
  //
  //  },
  //  get: ()=> {
  //    return that.node.postion;
  //  }
  //});
  const _updatePosition = (parent)=> {
    if (!that.node)return;
    that.node.position = spec.position;
    let pos = that.node.parent.toGlobal(spec.position);
    input.style.width = spec.width * parent.scale.x + 'px';
    input.style.height = spec.height * parent.scale.y + 'px';
    input.style.left = pos.x + 'px';
    input.style.top =pos.y + 'px';
  };

  that.registerUpdate = (parent)=> {
    //_updatePosition(parent);
    window.addEventListener("resize", (event)=> {
      _updatePosition(parent);
    });
  };

  that.destroy = ()=> {
    game.removeChild(input);
    that.node = null;
  };

  that.node.on('removed', (parent)=> {
    game.removeChild(input);
    that.node.removeChild();
  });


  return that;
};
export  default Input;