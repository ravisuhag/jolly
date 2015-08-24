'use strict';

exports.register = function(plugin, options, next) {
    // Load plugin dependencies
    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            Auth: {
                login: require('../controllers/auth/login'),
                logout: require('../controllers/auth/logout')
            }
        };

        plugin.route([

            // Auth Routes
            {
                method: 'GET',
                path: '/login',
                config: Controllers.Auth.login.showForm
            }, {
                method: 'POST',
                path: '/login',
                config: Controllers.Auth.login.postForm
            }, {
                method: 'GET',
                path: '/logout',
                config: Controllers.Auth.logout
            }

        ]);


        next();
    });

    next();
};

exports.register.attributes = {
    name: 'auth_routes',
    version: require('../../package.json').version
};
