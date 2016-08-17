/**
 * Created by youpeng on 16/7/28.
 */
var express = require('express');
var bodyParser = require('body-parser');
module.exports = function() {
  console.log('init express...');
  var app = express();

  app.use(bodyParser.json());

  app.use(express.static('./public'));

  require('../app/routes/user.server.routes.js')(app);

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