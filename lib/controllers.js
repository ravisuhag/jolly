'use strict';

/**
 * this plugin wraps up the controller module(s) into
 * a server method called `.controllers()` that can then be accessed later
 * by route plugins.
 */

const Path = require('path');
const Glob = require('glob');

/**
 * create an object representation of a directory containing
 * javascript source files
 *
 * @param {String} fpath folder containing javascript files
 * @returns {Object} representing a directory
 */
const pack = function(fpath) {
    fpath = Path.resolve(fpath);
    const pattern = Path.join(fpath, '**/**.js');
    const files = Glob.sync(pattern);
    const result = {};
    files.forEach((file) => {
        const module = require(file);

        // remove the common abspath
        file = file.replace(fpath, '');

        // remove the file extension at the end
        file = file.replace(/\.js$/, '');

        // remove the trailing slash
        file = file[0] === Path.sep?file.slice(1):file;

        let components = file.split('/').reverse();
        let head = result;
        while ( components.length > 0 ) {
            const el = components.pop();
            if ( !components.length ) {
                head[el] = module;
            } else if ( head[el] === undefined ) {
                head[el] = {};
            }
            head = head[el];
        }
    });
    return result;
};

exports.register = function(server, options, next) {
    const controllers = pack(options.path);
    server.decorate('server', 'controllers', function() {
        return controllers;
    });
    next();
};

exports.register.attributes = {
    name: 'controller_package',
    version: require('../package.json').version
};

