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

        global.account.getUserInfo(global.account.playerData.uid,function(err, result){
            console.log("err = " + err);
            console.log("result = " + result);
        })

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
            console.log("登陆接口返回" + JSON.stringify(result));
            })
            break;
            default:
            break;
        }
    }

  
});
