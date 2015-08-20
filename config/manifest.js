'use strict';

// Load Modules 
var Confidence = require('confidence');


var store = new Confidence.Store({
  name: 'jolly'
});

var criteria = {
  env: process.env.ENVIRONMENT
};

exports.get = function(key) {
  return store.get(key, criteria);
};
