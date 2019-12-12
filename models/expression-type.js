const mongodb = require('../lib/mongodb');

var expressionTypeSchema = new mongodb.schema({
  type: {
    type: String,
    required: true,
    unique: true,
    set: setType
  },
  parentTypeId: {
    type: mongodb.schema.Types.ObjectId,
    ref: "expression_type"
  },
  shortCode: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

function setType(value) {
  this.shortCode = value.toLowerCase().replace(' ', '-');
  return value;
}

// Add plugins
expressionTypeSchema.plugin(require('./plugins/timestamp'));

module.exports = mongodb.model('expression_types', expressionTypeSchema);