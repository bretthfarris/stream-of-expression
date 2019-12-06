const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  get: function(req, res) {
    logger.log('info', 'GET /a/get-users');
    userModel.find({ '_id': { $in: req.body.userIds }}).exec().then(users => {
      logger.log('info', users);
      return res.status(200).json({ "users": users }).end();
    }).catch(err => {
      logger.error(err);
      return res.status(500).json({ "error": err }).end();
    });
  }
}