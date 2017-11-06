const Eventuality = function (obj) {
    let registry = {};

    obj.fire = function (event) {

        let handler = null;

        if (registry.hasOwnProperty(event)) {
            let event_list = registry[event];
            for (let i = 0; i < event_list.length; ++i) {
                handler = event_list[i];
                let args = [];

                //not including event
                for (let n = 1; n < arguments.length; ++n) {
                    args.push(arguments[n]);
                }
                handler.apply(this, args);
            }
        }

        return this;
    }

    obj.on = function (type, method) {
        if (registry.hasOwnProperty(type)) {
            registry[type].push(method);
        }
        else {
            registry[type] = [method];
        }

        return this;
    }

    obj.removeListener = function (type, method) {
        if (!registry.hasOwnProperty(type)) {
            return false;
        }
        let index = registry[type].indexOf(method);
        if (index >= 0) {
            registry[type].splice(index, 1);
        }
    }

    obj.removeAllListeners = function () {
        registry = {};
    }
    return obj;
};
export  default Eventuality;