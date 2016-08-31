var ClientUserController = require('../controllers/clientUser.server.controller.js');

module.exports = function(app) {
  app.route('/clientUser')
    .get(ClientUserController.list)
    .post(ClientUserController.create);

  app.route('/create_merchant')
    .post(ClientUserController.create_merchant)


  app.route('/clientUser/:nid')
  	.get(ClientUserController.getById)
    .post(ClientUserController.deleteById)
};
