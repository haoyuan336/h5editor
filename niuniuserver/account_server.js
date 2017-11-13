const express = require("express");
const app = express();
const db = require("./utils/db");
const Message = function(status, res){
    let that = {
        status: status,
        res: res
    }
    return that;
}
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/login', function(req, res){
    let password = req.query.password;
    let accountId = req.query.uid;
    console.log("player login " + accountId);
    console.log("password = " + password);
    res.send(Message('ok', 'hello world'));
    bd.get_account_info(accountId, password, function(info){

    });

});
app.listen("3000");