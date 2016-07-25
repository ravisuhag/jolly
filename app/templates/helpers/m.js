'use strict';

/* Manifest file reader for grabbing new static assets */
var manifest = require('../../../.build/rev-manifest');

module.exports = function m(filename) {
  return manifest[filename];
};
