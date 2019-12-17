const expressionTypeModel = require('../models/expression-type');

module.exports = {
  getExpressionTypeTree: async function() {
    try {
      var expressionTypeTree = await buildExpressionTypesTree();
      return expressionTypeTree;  
    } catch(err) {
      return err;
    }
  }
}

async function buildExpressionTypesTree() {
  try {
    var expressionTypeTree = [];
    var expressionTypes = await expressionTypeModel.find().sort('type');
    for(var i=0; i < expressionTypes.length; i++) {
      if(expressionTypes[i].active == true && (expressionTypes[i].parentTypeId === null || !expressionTypes[i].hasOwnProperty('parentTypeId'))) {
        expressionTypes[i].children = getChildExpressions(expressionTypes[i]._id);
        expressionTypeTree.push(expressionTypes[i]);
      }
    }
    return expressionTypeTree;
  } catch(err) {
    return err;
  }
}

function getChildExpressions(parentTypeId, expressionTypes) {
  var children = [];
  for(var expressionType in expressionTypes) {
    if(expressionType.parentTypeId == parentTypeId && expressionType.active == true)
      children.push(expressionType)
  }
  return children;
}


