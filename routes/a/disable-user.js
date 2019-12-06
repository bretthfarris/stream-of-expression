const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'GET /a/disable-user', req.body);
    userModel.findOneAndUpdate({ "_id": req.body.userId }, {active: false}, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.status(500).json({ "error": err }).end();
      }
      logger.log('info', 'User has been successfully disabled ' + JSON.stringify(doc));
      return res.status(200).json({ "userId": req.body.userId, "disabled": true }).end();
    });
  }
}