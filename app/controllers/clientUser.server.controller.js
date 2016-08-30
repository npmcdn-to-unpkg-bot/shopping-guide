var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');

module.exports = {

  //查看收藏夹
  list: function(req, res, next) {

    var query = req.query.filters ? req.query.filters : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;

    for(obj in query){
      if(query[obj] != null){
        where += ` and ${obj}=${query[obj]}`;
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }



    var sql = `select * from collection_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from collection_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //添加收藏
  create: function(req, res, next) {

    var sql = "INSERT INTO collection SET ?";

    pool(sql, req.body).then(function(data) {
      if (data) {
        authChecked.send(res, req, 200, {err: 0, data: _data[0]});
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //删除收藏
  deleteById: function(req, res, next) {
    console.log(22)
    var sql = "delete from collection where id = " + req.params.nid + "2323";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //商户申请
  create_merchant: function(req, res, next) {

    delete req.body.file1;
    delete req.body.file2;
    delete req.body.file3;
    delete req.body.file4;


    var sql = "INSERT INTO merchant SET ?";

    pool(sql, req.body).then(function(data) {
      if (data) {

          var sql = "select * from merchant where name like '%" + req.body.name + "%' order by id desc limit 1";

          pool(sql).then(function(data) {
            authChecked.send(res, req, 200, {err: 0, data: data[0]});
          }, function() {
            authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
          });

      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },



};
