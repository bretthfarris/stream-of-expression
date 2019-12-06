const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'GET /a/get-user');
    var params = routeHelper.filterParamsByObjectProperties(req.query, userModel.schema.paths);
    userModel.findOne(params).exec().then(user => {
      logger.log('info', user);
      return res.status(200).json({ "user": user }).end();
    }).catch(err => {
      logger.error(err);
      return res.status(500).json({ "error": err }).end();
    });
  }
}