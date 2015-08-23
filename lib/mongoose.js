'use strict';

var Mongoose = require('mongoose');

exports.register = function(plugin, options, next) {

    Mongoose.connect(options.uri);
    plugin.expose('mongoose', Mongoose);

    next();
};


exports.register.attributes = {
    name: 'mongooose',
    version: require('../package.json').version
};
