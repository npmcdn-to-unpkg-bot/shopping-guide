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
  getById: function(req, res, next, id) {
    var sql = "select * from user where id = " + id + "";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql).then(function(data) {
            req.data = data[0];
            return next();
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },
  deleteById: function(req, res, next, id) {
    var sql = "delete from  user where id = " + id + "";
    var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
    authChecked.get_user_by_token(cookie.token)
      .then(function(data) {
        if (data.status === 200) {
          pool(sql).then(function(data) {
            console.log(data);
            req.del = data[0];
            return next();
          });
        } else {
          authChecked.send(res, req, data.status, data);
        }
      }, function(err) {
      });
  },

  getId: function(req, res, next) {
    if (req.del) {
      authChecked.send(res, req, 200, {err: 0, data: req.del});
    }
  },
  get: function(req, res, next) {
    if (req.data) {
      authChecked.send(res, req, 200, {err: 0, data: req.data});
    }
  }
};
