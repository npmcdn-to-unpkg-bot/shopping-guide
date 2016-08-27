var ClientController = require('../controllers/client.server.controller.js');

module.exports = function(app) {
  app.route('/client_type')
    .get(ClientController.show_type)

  app.route('/client_ab')
    .get(ClientController.show_ab)

  app.route('/client_ac')
    .get(ClientController.show_ac)

  app.route('/client_hot_new')
    .get(ClientController.show_hot_new)

  app.route('/client/:nid')
    .put(ClientController.add_read)

};
