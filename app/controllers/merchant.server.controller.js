var pool = require('../../config/pool.js');
var connection = require('../../config/connection.js');
var authChecked = require('../authChecked/authChecked');


var formidable = require('formidable');
var fs = require('fs');

var TITLE = 'formidable上传示例';
var AVATAR_UPLOAD_FOLDER = '/upload/';

module.exports = {

  list: function(req, res, next) {


    var query = req.query.filters ? JSON.parse(req.query.filters) : {};

    var num = req.query.num ? req.query.num : 10;
    var page = req.query.page ? (req.query.page-1) * num : 0;

    var where = `1=1 `;
    for(obj in query){
      if(query[obj] != null){
        where += ` and ${obj}=${query[obj]}`
      }
    }

    if(req.query.keywords != null){
      where += ` and name like '%${req.query.keywords}%'`;
    }


    
    var sql = `select * from merchant where ${where} order by id limit ${page},${num}`;

    pool(sql ,query).then(function(data) {
      

      var sql = `select count(id) as count from merchant `;

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

    var sql = "INSERT INTO user SET ?";

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

    var sql = "select * from user where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  edit: function(req, res, next) {
    var json = req.body;
    var sql = `update user set ? where ?`;
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

    var sql = "delete from  user where id = " + req.params.nid + "";

    pool(sql).then(function(data) {
      authChecked.send(res, req, 200, {err: 0, data: data[0]});
    }, function() {
      authChecked.send(res, req, 500, {err: 1, msg: "服务器错误"});
    });

  },

  upload: function(req, res, next) {

    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';    //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;  //设置上传目录
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {

      if (err) {
        res.locals.error = err;
        authChecked.send(res, req, 200, {err: 0, data: {manager: 'error'} });
        return;   
      }  

      var extName = '';  //后缀名
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;     
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
        default:
          extName = '';
          break;    
      }

      if(extName.length == 0){
          res.locals.error = '后缀名有误';
          authChecked.send(res, req, 200, {err: 0, data: {manager: 'error'} });
          return;           
      }

      var avatarName = Math.random() + '.' + extName;
      var newPath = form.uploadDir + avatarName;

      console.log(newPath);
      fs.renameSync(files.file.path, newPath);  //重命名
    });



    // res.locals.success = '上传成功';
    // authChecked.send(res, req, 200, {err: 0, data: {manager: 'ok'} });
  }


};
