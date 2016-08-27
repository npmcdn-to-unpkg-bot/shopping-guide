var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');

module.exports = {
  //显示类型
  show_type: function (req, res, next) {

    var sql = `select *,ceil ((right_num-left_num-1)/2) from type order by left_num`;

    pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  //显示广告
  show_ab: function (req, res, next) {
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



    var sql = `select * from ad_commodity where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {


      var sql = `select count(id) as count from ad_commodity where ${where} `;

      pool(sql).then(function(_data) {
        authChecked.send(res, req, 200, {err: 0, count: _data[0].count, data: data});
      }, function(err) {
        authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
      });


    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });
  },

  //显示抢购
  show_ac: function (req, res, next) {

  },

  //显示热销推荐
  show_hot: function (req, res, next) {

  },

  //显示最新更新
  show_new_shop: function (req, res, next) {

  },

  //子页面显示商品
  show_type_shop: function (req, res, next) {

  },


};
