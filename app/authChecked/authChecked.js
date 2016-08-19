var pool = require('../../config/pool.js');

var send = function(res, req, status, data) {
  res.status(status, {});
  res.json(data);
};


// 检测cookie
var get_user_by_token = function(token) {
  var msg = null;
  var findByToken = "SELECT * FROM user WHERE token='" + token + "'";
  return new Promise(
    function(resolve, reject) {
      pool(findByToken).then(function(data) {
        if (data.length == 0) {
          msg = {status: 401, data: {err: 1}};
        } else {
          msg = {status: 200, data: {err: 0, data: data[0]}};
        }
        resolve(msg);
      }, function(err) {
        msg = {status: 500, data: {err: 1, msg: "数据库错误"}};
        reject(msg);
      });
    })
};


module.exports = {
  send: send,
  get_user_by_token: get_user_by_token
};