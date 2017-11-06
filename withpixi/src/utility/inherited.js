/**
 * Created by wizard on 15/3/3.
 */
const Inherited = function (obj) {
    let registry = {};

    obj.inheritOn = function (name, handler) {

        if (!obj.hasOwnProperty(name)) {
            obj[name] = handler;
            return;
        }

        if (registry.hasOwnProperty(name)) {
            registry[name].push(handler);
        }
        else {
            let parentHandler = obj[name];
            registry[name] = [parentHandler, handler];

            obj[name] = function () {
                let result;
                let handlerList = registry[name];
                for (let index in handlerList) {
                    result = handlerList[index].apply(this, arguments);
                    if (result != undefined && !result) {
                        return result;
                    }
                }

                return result;
            }
        }
    };

    return obj;
};

export  default Inherited;