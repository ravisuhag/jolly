'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        Static: require('../controllers/core/static')
    };

    plugin.route([
        // Assets & Static Routes
        {
            method: 'GET',
            path: '/css/{path*}',
            handler: Controllers.Static.css
        }, {
            method: 'GET',
            path: '/img/{path*}',
            handler: Controllers.Static.img
        }, {
            method: 'GET',
            path: '/js/{path*}',
            handler: Controllers.Static.js
        }, {
            method: 'GET',
            path: '/favicon.ico',
            handler: Controllers.Static.favicon
        }, {
            method: 'GET',
            path: '/heartbeat',
            config: Controllers.Static.heartbeat
        }

    ]);

    next();
};

exports.register.attributes = {
    name: 'static_routes',
    version: require('../package.json').version
};
