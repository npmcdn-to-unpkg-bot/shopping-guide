var ClientController = require('../controllers/client.server.controller.js');

module.exports = function(app) {
  app.route('/shop')
    .get(ClientController.show_type)

  app.route('/shop/:nid')
    .get(ClientController.show_type)

};
