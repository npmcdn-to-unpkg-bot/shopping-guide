var ClientUserController = require('../controllers/clientUser.server.controller.js');

module.exports = function(app) {
  app.route('/clientUser')
    .get(ClientUserController.list)
    .post(ClientUserController.create);

  app.route('/clientUser/:nid')
    .delete(ClientUserController.deleteById)
};
