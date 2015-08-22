'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        core: require('../controllers/core/pages'),
        fallback: require('../controllers/core/fallback')
    };

    plugin.route([

        // Home Page
        {
            method: 'GET',
            path: '/',
            config: Controllers.core.home
        },
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
        },
        // Fallback route
        {
            method: '*',
            path: '/{p*}',
            config: Controllers.fallback.notfound
        }

    ]);


    next();
};

exports.register.attributes = {
    name: 'index_routes',
    version: require('../package.json').version
};
