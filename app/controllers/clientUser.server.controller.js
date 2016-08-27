var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');
var moment = require('moment');


module.exports = {

  list: function (req, res, next) {

    var sql = `select *,ceil ((right_num-left_num-1)/2) from type order by left_num`;

    pool(sql).then(function(data) {

        authChecked.send(res, req, 200, {err: 0, data: data});

    }, function(err) {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },


};
