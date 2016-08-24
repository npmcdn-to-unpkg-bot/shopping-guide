var TypeController = require('../controllers/type.server.controller.js');

module.exports = function(app) {
  app.route('/type')
    .get(TypeController.list)
    .post(TypeController.create)
    .put(TypeController.all);

  app.route('/type/:nid')
    .get(TypeController.getById)
    .put(TypeController.edit)
    .delete(TypeController.deleteById);

   app.route('/typeAll')
	.get(TypeController.all);
};
