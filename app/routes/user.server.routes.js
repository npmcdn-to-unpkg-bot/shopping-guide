var UserController = require('../controllers/user.server.controller.js');

module.exports = function(app) {
  app.route('/user')
    .get(UserController.list)
    .post(UserController.create)
    .put(UserController.create);

  app.route('/user/:nid')
    .get(UserController.get)
    .delete(UserController.getId);

  app.param('nid', UserController.getById);
  app.param('nid', UserController.deleteById);
};
