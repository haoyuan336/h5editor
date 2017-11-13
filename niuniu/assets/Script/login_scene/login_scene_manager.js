import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
       passWorldEditbox: {
           default: null,
           type: cc.EditBox
       },
       accountIdEditBox: {
           default: null,
           type: cc.EditBox
       }
    },

    // use this for initialization
    onLoad: function () {

    

    },
    buttonClick: function(event, customData){
        switch(customData){
            case "login":
            console.log("登陆");

            let uid = this.accountIdEditBox.string;
            let password = this.passWorldEditbox.string;
            console.log('uid = ' + uid);
            console.log('password' + password);    
            global.account.login(uid, password, function(err, result){
                console.log("result = " + result);
            })
            break;
            default:
            break;
        }
    }

  
});
