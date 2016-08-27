var ClientController = require('../controllers/client.server.controller.js');

module.exports = function(app) {
  app.route('/client')
    .get(ClientController.show_type)

  app.route('/client/:nid')
    .get(ClientController.show_type)

};
