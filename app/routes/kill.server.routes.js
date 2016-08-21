var KillController = require('../controllers/kill.server.controller.js');

module.exports = function(app) {
  app.route('/kill')
    .get(KillController.list)
    .post(KillController.create);

  app.route('/kill/:nid')
    .get(KillController.getById)
    .put(KillController.edit)
    .delete(KillController.deleteById);
};
