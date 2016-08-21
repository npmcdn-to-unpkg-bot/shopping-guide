var CommodityController = require('../controllers/commodity.server.controller.js');

module.exports = function(app) {
  app.route('/commodity')
    .get(CommodityController.list)
    .post(CommodityController.create);

  app.route('/commodity/:nid')
    .get(CommodityController.getById)
    .put(CommodityController.edit)
    .delete(CommodityController.deleteById);
};
