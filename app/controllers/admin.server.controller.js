/**
 * Created by youpeng on 16/8/17.
 */
 var pool = require('../../config/pool.js');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 var authChecked = require('../authChecked/authChecked');

 var sendSMS = require('../../config/sendSMS.js');

 var config = require('../../config/config.js');
 var ServerAPI = require('../../config/ServerAPI.js');

 module.exports = {
  // 登录
  user_login: function(req, res, next) {

    if(!req.body.name){
      req.body = req.query;
    }

    var findByName = "SELECT * FROM user WHERE name='" + req.body.name + "'";

    pool(findByName).then(function(data) {
      if (data.length == 0) {
        authChecked.send(res, req, 400, {err: 1, msg: "用户名不存在"})
      } else {
        if (data[0].pwd == req.body.pwd) {
          var token = new Date().getTime() + '_' + Math.random();
          res.cookie('token', token, {maxAge: 9000000});
          res.cookie('user_name', data[0].name, {maxAge: 9000000});
          res.cookie('nick_name', data[0].nick_name, {maxAge: 9000000});
          res.cookie('role', data[0].role, {maxAge: 9000000});

          var sql = "UPDATE user SET token='" + token + "' WHERE name='" + req.body.name + "'";
          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data : data[0]});
          }, function(err) {
            authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
          });
        }
        else {
          authChecked.send(res, req, 400, {err: 1, msg: "密码错误"});
        }
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //注册
  user_create: function(req, res, next) {

    var serverAPI = new ServerAPI(config.sms.AppKey,config.sms.AppSecret);
    serverAPI.verifycode({mobile: req.query.phone, code: req.query.code},function(err, data){
      console.log(data);

      if(data.code === 200){

        if(req.body){
          req.body = req.query;
        }

        req.body.nick_name = req.body.name;

        delete req.body.repassword
        delete req.body.code

        var sql = "INSERT INTO user SET ?";

        pool(sql, req.body).then(function(data) {
          if (data) {

            var sql = "select * from user where name like '%" + req.body.name + "%' order by id desc limit 1";

            pool(sql).then(function(data) {
              authChecked.send(res, req, 200, {err: 0, data: data[0]});
            }, function() {
              authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
            });

              // authChecked.send(res, req, 200, {err: 0, data: data});
            }
          }, function(err) {
            authChecked.send(res, req, 500, {err: 1, msg: "注册信息有误"});
          });
      }
      else if (data.code === 413){
        authChecked.send(res, req, 500, {err: 1, msg: "验证码错误"});
      }
      else {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      }
    })



    

  },


  sendSMS: function(req, res, next){

    // sendSMS.sendCode('18627857458').then(function(err,data){
    //   if(err){
    //     res.send(err);
    //     // authChecked.send(res, req, 500, {err: 1, msg: "短信发送失败"});
    //   }
    //   res.send(data);
    // });
    console.log(req.query.phone);
    var serverAPI = new ServerAPI(config.sms.AppKey,config.sms.AppSecret);
    serverAPI.sendSmsCode({mobile: req.query.phone},function(err, data){
      console.log(err);
      console.log(data);
      authChecked.send(res, req, 200, {err: 0, data: data});
    })

  }

};
