const viewHelper = require('../../lib/view-helper');
const expect = require('chai').expect;

describe("View Helper Functions", function() {
  it('returns a list of all expression types in a parent child relationship tree', function(done){
    viewHelper.getExpressionTypeTree().then((expressionTypeTree) => {
      console.log(expressionTypeTree);
      done();
    }).catch(function(err) {
      done(err); 
    });
  });
});
    