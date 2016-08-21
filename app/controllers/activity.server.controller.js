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
          if (obj === "type") {
            if(query[obj]){
              where += "and CURRENT_TIMESTAMP>=endTime";
            }
            else {
              where += "and CURRENT_TIMESTAMP<=endTime";
            }
          }
          else {
            where += ` and ${obj}=${query[obj]}`;
          }
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }



    var sql = `select * from activity_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from activity_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  create: function(req, res, next) {

    var date = new Date();

    req.body.createTime = date.valueOf();

    req.body.strTime = moment(req.body.strTime).format("YYYY-MM-DD");
    req.body.endTime = moment(req.body.endTime).format("YYYY-MM-DD");


    var sql = "INSERT INTO activity SET ?";

    pool(sql, req.body).then(function(data) {
      if (data) {

          var sql = "select * from user where name like '%" + req.body.name + "%'";

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


  getById: function(req, res, next) {

    var sql = "select * from activity where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  edit: function(req, res, next) {
    var json = req.body;
    var sql = `update activity set ? where ?`;
    var array = [];

    array.push({id: req.body.id});
    delete json["id"];
    array.unshift(req.body);

    console.log(array);
    pool(sql, array).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


  deleteById: function(req, res, next) {

    var sql = "delete from activity where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  }
};
