'use strict';
/* Manifest file reader for grabbing new static assets */
var manifest = require('../../static/rev-manifest');

module.exports = function(filename) {
    return manifest[filename];
};
