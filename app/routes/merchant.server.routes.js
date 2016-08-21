var MerchantController = require('../controllers/merchant.server.controller.js');

module.exports = function(app) {
  app.route('/merchant')
    .get(MerchantController.list)
    .post(MerchantController.create);

  app.route('/merchant/:nid')
    .get(MerchantController.getById)
    .put(MerchantController.edit)
    .delete(MerchantController.deleteById)
    .post(MerchantController.upload);

};
