const expressionTypeModel = require('../../models/expression-type');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  post: function(req, res) {
    logger.log('info', 'POST /a/update-expression-type', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, expressionTypeModel.schema.paths);
    delete params.expressionTypeId;
    delete params.shortCode;
    expressionTypeModel.findOne({ "_id": req.body.expressionTypeId }, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.status(500).json({ "error": err }).end();
      }
      for(var prop in params) {
        doc[prop] = params[prop];
      }
      doc.save(function(err, expressionType) {
        if(err) {
          logger.error(err);
          return res.status(500).json({ "error": err }).end();
        }
        logger.log('info', 'Expression Type has been updated successfully updated' + JSON.stringify(doc));
        return res.status(200).json({ "expressionTypeId": req.body.expressionTypeId }).end();
      });
    });
  }
}