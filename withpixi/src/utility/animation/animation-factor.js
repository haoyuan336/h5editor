/**
 * Created by wizard on 16/3/29.
 */

import FrameAnimation from './frame-animation.js'
import SpineAnimation from'./spine-animation.js'

const animationFactor = (()=> {
    var that = {};

    that.createAnimation = function (options) {
        if (options.type == "spine") {
            return SpineAnimation(options);
        }
        else {
            return FrameAnimation(options);
        }
    };

    return that;
})();

export default  animationFactor;
