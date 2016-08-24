var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');

module.exports = {

  list: function(req, res, next) {


    var query = req.query.filters ? JSON.parse(req.query.filters) : {};

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



    var sql = `select * from type where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as type from ad_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  all: function(req, res, next) {

    var sql = `select * from type order by id`;

    pool(sql ,query).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  create: function(req, res, next) {

    var sql = `call type_add(${req.body.pid}, ${req.body.name}, @a)`;

    pool(sql, req.body).then(function(data) {
      if (data) {
          var sql = "select * from type where name like '%" + req.body.name + "%' order by id desc limit 1";

          pool(sql).then(function(_data) {
            authChecked.send(res, req, 200, {err: 0, data: _data[0]});
          }, function() {
            authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
          });

        // authChecked.send(res, req, 200, {err: 0, data: data});
      }
    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  getById: function(req, res, next) {

    var sql = "select * from type where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  edit: function(req, res, next) {
    var sql = `call type_edit(${req.body.pid}, ${req.body.id}, ${req.body.name}, @a)`;

    pool(sql).then(function(data) {
      var sql = "select * from type where id = " + array[1].id + "";

      pool(sql).then(function(data) {
        authChecked.send(res, req, 200, {err: 0, data: data[0]});
      }, function() {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  deleteById: function(req, res, next) {

    var sql = `call type_edit(${req.params.nid },@a)`;

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  }
};
