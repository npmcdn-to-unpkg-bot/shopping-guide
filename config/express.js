/**
 * Created by youpeng on 16/7/28.
 */
var colors = require( "colors")
var express = require('express');
var bodyParser = require('body-parser');
var log = require('./logHelper');
var logger = log.helper;  

module.exports = function() {
  
  console.log('init express...');
  var app = express();

  app.use(bodyParser.json());


  app.use(function (req, res, next) {

    var nowDate = new Date().getTime();

    console.log("\t-->   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim);

    next();

    if(res.statusCode == 200 ) {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode+"").green + "  " + ((new Date().getTime() - nowDate) + "ms").yellow);
    }
    else {
      console.log("\t<--   ".dim.gray + req.method.bold + "  " + req.originalUrl.dim + "  " + (res.statusCode+"").red + "  " + ((new Date().getTime() - nowDate) + "ms").yellow); 
    }
  });

  app.use(express.static('./public'));

  log.use(app);  

  

  

  require('../app/routes/user.server.routes.js')(app);
  require('../app/routes/admin.server.routes.js')(app);

  app.use(function(req, res, next) {
    res.status(404);
    try {
      return res.json('Not Found');
    } catch(e) {
      console.error('404 set header after sent');
    }
  });

  app.use(function(err, req, res, next) {
    if (!err) {
      return next();
    } else {
      res.status(500);
      try{
        return res.json(err.messgae || 'server error');
      } catch(e) {
        console.error('500 set header after sent');
      }
    }
  });

  return app;
};
