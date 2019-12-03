const mongodb = require('../lib/mongodb');

var expressionTypeSchema = new mongodb.schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
  parentTypeId: {
    type: mongodb.schema.Types.ObjectId,
    ref: "expression_type"
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Add plugins
expressionTypeSchema.plugin(require('./plugins/timestamp'));

module.exports = mongodb.model('expression_types', expressionTypeSchema);