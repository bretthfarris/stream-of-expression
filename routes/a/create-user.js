const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  post: function(req, res) {
    logger.log('info', 'POST /a/create-user', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, userModel.schema.paths);
    var user = new userModel(params);
    user.save(function(err) {
      if(err) {
        logger.error(err);
        return res.status(500).json({ "error": err }).end();
      }
      logger.log('info', 'New User created successfully ' + user._id);
      return res.status(200).json({ "userId": user._id }).end();
    });
  }
}