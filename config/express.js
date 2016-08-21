/**
 * Created by youpeng on 16/7/28.
 */
var colors = require("colors")
var express = require('express');
var bodyParser = require('body-parser');
var log = require('./logHelper');
var logger = log.helper;
var auth = require('../app/authChecked/authChecked');
var querystring = require('querystring');

module.exports = function() {

  console.log('init express...');
  var app = express();

  app.use(bodyParser.json());


  app.use(function(req, res, next) {

    var nowDate = new Date().getTime();

    console.log("\t-->   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim);

    next();

    if (res.statusCode == 200) {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode + "").green + "  " + ((new Date().getTime() - nowDate) + "ms").yellow);
    }
    else {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode + "").red + "  " + ((new Date().getTime() - nowDate) + "ms").yellow);
    }
  });

  app.use(express.static('./public'));

  log.use(app);


  app.use(function(req, res, next) {
    if (req.originalUrl !== '/login') {
      var cookie = querystring.parse(req.headers['cookie'].replace(/; /g, '&'));
      auth.get_user_by_token(cookie.token)
        .then(function(data) {
          if (data.status === 200) {
            return next();
          }
          else if (data.status === 401) {
            auth.send(res, req, data.status, data);
            // res.redirect('/');
          } else {
            auth.send(res, req, data.status, data);
          }
        }, function(err) {
        });
    } else {
      return next();
    }
  });


  require('../app/routes/admin.server.routes.js')(app);
  require('../app/routes/user.server.routes.js')(app);
  require('../app/routes/merchant.server.routes.js')(app);
  require('../app/routes/kill.server.routes.js')(app);
  

  app.use(function(req, res, next) {
    res.status(404);
    try {
      return res.json('Not Found');
    } catch (e) {
      console.error('404 set header after sent');
    }
  });

  app.use(function(err, req, res, next) {
    if (!err) {
      return next();
    } else {
      res.status(500);
      try {
        return res.json(err.messgae || 'server error');
      } catch (e) {
        console.error('500 set header after sent');
      }
    }
  });

  return app;
};
