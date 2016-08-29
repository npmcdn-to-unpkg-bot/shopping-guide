/**
 * Created by youpeng on 16/8/17.
 */
var pool = require('../../config/pool.js');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var authChecked = require('../authChecked/authChecked');

module.exports = {
  // 登录
  user_login: function(req, res, next) {
      
    if(req.body){
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


  user_create: function(req, res, next) {

    req.body.nick_name = req.body.name;

    if(req.body){
      req.body = req.query;
    }

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
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

};
