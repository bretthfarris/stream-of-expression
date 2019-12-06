const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  post: function(req, res) {
    logger.log('info', 'POST /a/update-user', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, userModel.schema.paths);
    delete params.userId;
   
    userModel.findOneAndUpdate({ "_id": req.body.userId }, params, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.status(500).json({ "error": err }).end();
      }
      logger.log('info', 'User has been updated successfully updated' + JSON.stringify(doc));
      return res.status(200).json({ "updated": true }).end();
    });
  }
}