const expressionTypeModel = require('../../models/expression-type');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'POST /a/disable-expression-type', req.body);
    expressionTypeModel.findOneAndUpdate({ "_id": req.body.expressionTypeId }, {active: false}, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.status(500).json({ "error": err }).end();
      }
      logger.log('info', 'Expression Type has been successfully disabled ' + JSON.stringify(doc));
      return res.status(200).json({ "expressionTypeId": req.body.expressionTypeId, "disabled": true }).end();
    });
  }
}