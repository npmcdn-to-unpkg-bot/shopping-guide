/**
 * Created by youpeng on 16/8/17.
 */
var AdminController = require('../controllers/admin.server.controller.js');

module.exports = function(app) {
  app.route('/login')
  .post(AdminController.user_login);
};
