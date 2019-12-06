const expressionTypeModel = require('../../models/expression-type');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'GET /a/get-expression-type');
    var params = routeHelper.filterParamsByObjectProperties(req.query, expressionTypeModel.schema.paths);
    expressionTypeModel.findOne(params).exec().then(expressionType => {
      logger.log('info', expressionType);
      return res.status(200).json({ "expressionType": expressionType }).end();
    }).catch(err => {
      logger.error(err);
      return res.status(500).json({ "error": err }).end();
    });
  }
}