'use strict';

var glob = require('glob');
var path = require('path');

exports.register = function(server, options, next) {

    //  Load files from directory
    var load = function(options) {

        options = options || {};
        options.extension = options.extension || '.js';
        var controllers = {};
        var files = glob.sync('*' + options.extension, {
            cwd: options.path || __dirname
        });
        for (var i in files) {
            if (files[i] !== path.basename(__filename)) {
                var key = path.basename(files[i], options.extension);
                key = key.charAt(0).toUpperCase() + key.slice(1);

                controllers[key] = require((options.path || __dirname) + '/' + files[i]);
            }
        }

        return controllers;
    };



    // Attach methods
    server.method('load', load, {
        callback: false
    });

};


exports.register.attributes = {
    name: 'methods',
    version: require('../package.json').version
};
