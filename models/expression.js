const mongodb = require('../lib/mongodb');

var expressionSchema = new mongodb.schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  typeId: {
    type: mongodb.schema.Types.ObjectId,
    ref: "expression_types"
  },
  ownerId: {
    type: mongodb.schema.Types.ObjectId,
    ref: "users"
  },
  content: {
    type: mongodb.schema.Types.Mixed
  }
});

// Add plugins
expressionSchema.plugin(require('./plugins/timestamp'));

module.exports = mongodb.model('expressions', expressionSchema);