'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {


        var Controllers = {
            homepage: require('../controllers/core/homepage'),
            fallback: require('../controllers/core/fallback'),
            Static: require('../controllers/core/static')
        };

        plugin.route([

            // Home Page
            {
                method: 'GET',
                path: '/',
                config: Controllers.homepage
            },
            // Assets & Static Routes
            {
                method: 'GET',
                path: '/css/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.Static.css
            }, {
                method: 'GET',
                path: '/img/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.Static.img
            }, {
                method: 'GET',
                path: '/js/{path*}',
                config: {
                    auth: false
                },
                handler: Controllers.Static.js
            }, {
                method: 'GET',
                path: '/favicon.ico',
                config: {
                    auth: false
                },
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
                config: Controllers.fallback
            }

        ]);

        next();
    });




    next();
};

exports.register.attributes = {
    name: 'index_routes',
    version: require('../../package.json').version,
    dependencies: 'auth',
};
