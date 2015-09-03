'use strict';
var manifest = require('../../../public/rev-manifest.json');
module.exports = function(filename) {
    return manifest[filename];
};
