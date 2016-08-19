var pool = require('../../config/pool.js');
var authChecked = require('../authChecked/authChecked');


module.exports = {

  list: function(req, res, next) {
    console.log(req);
    var sql = "select * from user";
    pool(sql).then(function(data) {
      if (data.length >= 0) {
        authChecked.send(res, req, 200, {err: 0, data: data});
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  create: function(req, res, next) {

    var date = new Date();
    req.body.createTime = date.valueOf();

    var sql = "INSERT INTO posts SET ?";

    pool(sql).then(function(data) {
      if (data) {
        authChecked.send(res, req, 200, {err: 0, data: data});
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },


  getById: function(req, res, next) {
    var sql = "select * from user where id = " + req.params.nid + "";
    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },


  edit: function(req, res, next) {
    console.log(req.body);
    console.log(req.params.nid);
    // var sql = "select * from user where id = " + req.params.nid + "";
    // pool(sql).then(function(data) {
    //   authChecked.send(res, req, 200, {err: 0, data: data[0]});
    // }, function() {
    //   authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    // });
  },


  deleteById: function(req, res, next) {
    var sql = "delete from  user where id = " + req.params.nid + "";
    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  }
};
