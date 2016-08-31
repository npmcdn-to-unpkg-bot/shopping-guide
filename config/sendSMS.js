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

function getHeaders(){

    var AppSecret = config.AppSecret

    var nonce = rd(10000000000,100000000000);

    var curTime=new Date().getTime();

    var checkSum = sign(AppSecret+noce+curTime);


    var headers = {
            'AppKey': config.sms.AppSecret,
            'CurTime': curTime,
            'CheckSum': checkSum,
            'Nonce': nonce,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };

    return headers;
}

function check(){
    

    var option = {
        uri: config.sms.verifycodeUrl,
        qs: {
            mobile: iphone,
            code: code
        },
        headers: getHeaders(),
        json: true // Automatically parses the JSON string in the response 
    };

    

    // request(option,function(error, response,body){
    //     callback(null,body);
    // },function(err, result){
    //     if(err){
    //         callback(err);
    //         console.log('获取链接失败');
    //     }else{
    //         console.log('获取链接结束');
    //     }
        
    // });
}

function sendCode(iphone, callback){

    var option = {
        uri: config.sms.sendCodeUrl,
        qs: {
            mobile: iphone
        },
        headers: getHeaders(),
        json: true // Automatically parses the JSON string in the response 
    };


    // request(option,function(error, response,body){
    //     callback(null,body);
    // },function(err, result){
    //     if(err){
    //         callback(err);
    //         console.log('获取链接失败');
    //     }else{
    //         console.log('获取链接结束');
    //     }
        
    // });
}


module.exports = {
    sendcode: function(iphone){
                    //对外接口返回Promise函数形式
                    return new Promise(function(resolve, reject){
                        sendCode(iphone, function(err, rows){
                            if(err){
                                reject(err);
                            }else{
                                resolve(rows);
                            }
                        })
                    });
                },
    checkCode: function(iphone, code){
                    //对外接口返回Promise函数形式
                    return new Promise(function(resolve, reject){
                        checkCode(iphone, code, function(err, rows){
                            if(err){
                                reject(err);
                            }else{
                                resolve(rows);
                            }
                        })
                    });
                }
}
