module.exports = {
  filterParamsByObjectProperties: function(params, filterObject) {
    var filteredParams = {};
    for(var key in params) {
      if(filterObject.hasOwnProperty(key))
        filteredParams[key] = params[key];
    }
    return filteredParams;
  }
}