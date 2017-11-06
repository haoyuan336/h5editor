/**
 * Created by hewenlong on 16-3-18.
 */
const ResourceManager = ResourceManager || (()=> {
    let that = {};

    let _loadingMap = {};
    let _pathCfg = null;

    that.resource = {};

    that.uiLoaded = {};

    that.init = function (pathCfg) {
      _pathCfg = pathCfg;
    };

    that.load = function (name) {
      return new Promise(function (resolve, reject) {
        if (that.resource[name]) {
          resolve(that.resource[name]);
          return;
        }

        let resolveList = _loadingMap[name];

        if (!resolveList) {
          _loadingMap[name] = [];
          resolveList = _loadingMap[name];
        }

        if(resolveList.length == 0) {
          resolveList.push(resolve);

          PIXI.loader.add(name, name).load(function (loader, res) {
            that.resource[name] = res[name];
            let endList = _loadingMap[name];
            delete _loadingMap[name];
            for (var i = 0; i < endList.length; ++i) {
              endList[i](that.resource[name]);
            }
          });
        }
        else {
          resolveList.push(resolve);
        }

      });

    };

    that.loadList = async function (resList) {

      return new Promise(function (resolve, reject) {
        let cnt = 0;
        const checkEnd = ()=>{
          if(cnt == resList.length) {
            resolve();
          }
        };

        checkEnd();

        for (var i = 0; i < resList.length; ++i) {
          (async ()=> {
            await that.load(resList[i]);
            cnt++;
            checkEnd();
          })();
        }
      });
    };

    that.loadFontList = async function (fontList) {

      return new Promise(function (resolve, reject) {
        let cnt = 0;
        const checkEnd = ()=>{
          if(cnt == fontList.length) {
            resolve();
          }
        };

        checkEnd();

        for (var i = 0; i < fontList.length; ++i) {
          (async ()=> {
            await that.loadFont(fontList[i]);
            cnt ++;
            checkEnd();
          })();
        }
      });
    };

    that.loadFont = async (fontName)=> {
      return new Promise(function (resolve, reject) {
        (async ()=>{
          if (_pathCfg == null) {
            reject(new Error('not config font path yet'));
            return;
          }

          let path = _pathCfg['xml_' + fontName];
          //console.log('font name start load: ' + fontName);
          let font = await that.load(path);
          //console.log('font name end load: ' + fontName);

          PIXI.extras.BitmapText.fonts[fontName] = font.bitmapFont;
          resolve(font);
        })();

      });

    };

    return that;
  })();

export  default ResourceManager;