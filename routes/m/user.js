const userModel = require('../../models/user');
const logger = require('synergy-logger');
const routeHelper = require('../../lib/route-helper');

module.exports = {
  delete: function(req, res) {
    logger.log('info', 'DELETE /m/user', req.body);
    userModel.findOneAndUpdate({ "_id": req.body.userId }, {active: false}, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.json({ "status": "error", "error": err }).end();
      }
      logger.log('info', 'User has been successfully disabled ' + JSON.stringify(doc));
      return res.json({ "status": "ok", "disabled": true }).end();
    });
  },
  get: function(req, res) {
    logger.log('info', 'GET /m/user');
    var params = routeHelper.filterParamsByObjectProperties(req.query, userModel.schema.paths);
    userModel.find(params).exec().then(users => {
      logger.log('info', users);
      return res.json({ "status": "ok", "users": users }).end();
    }).catch(err => {
      logger.error(err);
      return res.json({ "status": "error", "error": err }).end();
    });
  },
  post: function(req, res) {
    logger.log('info', 'POST /m/user', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, userModel.schema.paths);
    var user = new userModel(params);
    user.save(function(err) {
      if(err) {
        logger.error(err);
        return res.json({ "status": "error", "error": err }).end();
      }
      logger.log('info', 'New User created successfully ' + user._id);
      return res.json({ "status": "ok", "userId": user._id }).end();
    });
  },
  put: function(req, res) {
    logger.log('info', 'PUT /m/user', req.body);
    var params = routeHelper.filterParamsByObjectProperties(req.body, userModel.schema.paths);
    delete params.userId;
    userModel.findOneAndUpdate({ "_id": req.body.userId }, params, function(err, doc) {
      if(err) {
        logger.error(err);
        return res.json({ "status": "error", "error": err }).end();
      }
      logger.log('info', 'User has been updated successfully updated' + JSON.stringify(doc));
      return res.json({ "status": "ok", "updated": true }).end();
    });
  }
}