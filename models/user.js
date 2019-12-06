const mongodb = require('../lib/mongodb');

var userSchema = new mongodb.schema({
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
  },
  role: {
    type: String,
    required: true,
    enum: ['pleb', 'mod', 'admin'],
    default: 'pleb' // short for plebeian, which was a commoner in ancient Rome LOLOLOL
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

// Add plugins
userSchema.plugin(require('./plugins/timestamp'));

module.exports = mongodb.model('users', userSchema);