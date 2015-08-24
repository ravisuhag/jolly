'use strict';

exports.register = function(plugin, options, next) {
    // Load plugin dependencies
    plugin.dependency(['auth', 'crumb'], function(plugin, next) {

        var Controllers = {
            Auth: {
                login: require('../controllers/auth/login'),
                signup: require('../controllers/auth/signup'),
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
                path: '/signup',
                config: Controllers.Auth.signup.showForm
            }, {
                method: 'POST',
                path: '/signup',
                config: Controllers.Auth.signup.postForm
            },
             {
                method: '*',
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
