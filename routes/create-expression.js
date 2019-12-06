const expressionModel = require('../models/expression');
const logger = require('synergy-logger');
const routeHelper = require('../lib/route-helper');

module.exports = {
  post: function(req, res) {
    logger.log('info', 'POST /m/create-expression', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, expressionModel.schema.paths);
    var expression = new expressionModel(params);
    expression.save(function(err) {
      if(err) {
        logger.error(err);
        return res.json({ "status": "error", "error": err }).end();
      }
      logger.log('info', 'New Expression created successfully ' + expression._id);
      return res.json({ "status": "ok", "expressionId": expression._id}).end();
    });
  }
}