var MerchantController = require('../controllers/shop.server.controller.js');

module.exports = function(app) {
  app.route('/shop')
    .get(MerchantController.list)
    .post(MerchantController.create);

  app.route('/shop/:nid')
    .get(MerchantController.getById)
    .put(MerchantController.edit)
    .delete(MerchantController.deleteById)
    .post(MerchantController.upload);

};
