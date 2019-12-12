const expressionTypeModel = require('../../models/expression-type');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'GET /a/get-expression-types');
    var params = {};
    if(req.body.expressionTypeIds)
      params = { '_id': { $in: req.body.expressionTypeIds }};
    expressionTypeModel.find(params).exec().then(expressionTypes => {
      logger.log('info', expressionTypes);
      return res.status(200).json({ "expressionTypes": expressionTypes }).end();
    }).catch(err => {
      logger.error(err);
      return res.status(500).json({ "error": err }).end();
    });
  }
}