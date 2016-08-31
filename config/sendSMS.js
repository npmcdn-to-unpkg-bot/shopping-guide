var config = require('./config.js');
var request = require('request');
var crypto = require('crypto');

function rd(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}

function sign(str){

    var shasum = crypto.createHash('sha1');

    shasum.update(str);

    return sha1.digest('hex');
}

function sendCode(iphone, code, callback){


    var AppSecret = config.AppSecret

    var nonce = rd(10000000000,100000000000);

    var curTime=new Date().getTime()；

    var checkSum = sign(AppSecret+noce+curTime);

    var option = {
        uri: config.sms.url,
        qs: {
            mobile: iphone,
            code: code
        },
        headers: {
            'AppKey': config.sms.AppSecret,
            'CurTime': curTime,
            'CheckSum': checkSum,
            'Nonce': nonce,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        json: true // Automatically parses the JSON string in the response 
    };

    callback(null,option);

    // request(option,function(error, response,body){

    // },function(err, result){
    //     if(err){
    //         console.log('获取链接失败');
    //     }else{
    //         console.log('获取链接结束');
    //     }
        
    // });
}


module.exports = function(iphone, code){
    //对外接口返回Promise函数形式
    return new Promise(function(resolve, reject){
        sendCode(iphone, code, function(err, rows){
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    });
}