const expressionTypeModel = require('../../models/expression-type');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  post: function(req, res) {
    logger.log('info', 'POST /a/create-expression-type', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, expressionTypeModel.schema.paths);
    var expressionType = new expressionTypeModel(params);
    expressionType.save(function(err) {
      if(err) {
        logger.error(err);
        return res.status(500).json({"error": err }).end();
      }
      logger.log('info', 'New Expression Type created successfully ' + expressionType.type);
      return res.status(200).json({"expressionTypeId": expressionType._id}).end();
    });
  }
}