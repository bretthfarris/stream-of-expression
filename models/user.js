
const mongodb = require('../lib/mongodb');

var userSchema = new mongodb.schema({
  userId: {
    type: mongodb.schema.Types.ObjectId,
    auto: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: mongodb.schema.Types.Mixed,
    required: true
  }
});

// Add plugins
userSchema.plugin(require('./plugins/timestamp'));

module.exports = mongodb.model('user', userSchema);