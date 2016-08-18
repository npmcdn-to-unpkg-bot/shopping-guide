/**
 * Created by youpeng on 16/8/17.
 */
var pool = require('../../config/pool.js');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var authChecked = require('../authChecked/authChecked');


function send(res, req, status, data) {
  res.status(status, {});
  res.json(data);
}


module.exports = {
  // 检测cookie
  get_user_by_token: function(req, res, next) {
    authChecked.get_user_by_token(req.body.token)
      .then(function(data) {
        authChecked.send(res, req, data.status, data.data);
      }, function(err) {
      });
  },

  // 登录
  user_login: function(req, res, next) {

    var findByName = "SELECT * FROM user WHERE name='" + req.body.name + "'";

    pool(findByName).then(function(data) {
      if (data.length == 0) {
        send(res, req, 400, {err: 1, msg: "用户名不存在"})
      } else {
        if (data[0].pwd == req.body.pwd) {
          var token = new Date().getTime() + '_' + Math.random();
          res.cookie('token', token, {maxAge: 900000});
          var sql = "UPDATE user SET token='" + token + "' WHERE name='" + req.body.name + "'";
          pool(sql).then(function(data) {
            send(res, req, 200, {err: 0, data : data[0]});
          }, function(err) {
            send(res, req, 500, {err: 1, msg: "服务器错误"});
          });
        }
        else {
          send(res, req, 400, {err: 1, msg: "密码错误"});
        }
      }
    }, function(err) {
      send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  }

};
