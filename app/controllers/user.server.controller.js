var pool = require('../../config/pool.js');
var authChecked = require('../authChecked/authChecked');
var querystring = require('querystring');


module.exports = {

  list: function(req, res, next) {
    var sql = "select * from user";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data});
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },

  create: function(req, res, next) {
    var date = new Date();
    req.body.createTime = date.valueOf();
    console.log(req.body);
    var sql = "INSERT INTO posts SET ?";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql, req.body).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data});
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },


  getById: function(req, res, next) {
    console.log(req.params.nid);
    var sql = "select * from user where id = " + req.params.nid + "";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data[0]});
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },


  deleteById: function(req, res, next) {
    var sql = "delete from  user where id = " + req.params.nid + "";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data[0]});
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  }
};
