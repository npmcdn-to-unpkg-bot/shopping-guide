var UserController = require('../controllers/merchant.server.controller.js');

module.exports = function(app) {
  app.route('/merchant')
    .get(UserController.list)
    .post(UserController.create);

  app.route('/merchant/:nid')
    .get(UserController.getById)
    .put(UserController.edit)
    .delete(UserController.deleteById);
    
};
