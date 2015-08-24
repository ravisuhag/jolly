'use strict';

exports.register = function(plugin, options, next) {

    plugin.dependency('auth', function(plugin, next) {

        var Controllers = {
            users: require('../controllers/users/list-users')
        };

        plugin.route([

            // Home Page
            {
                method: 'GET',
                path: '/users',
                config: Controllers.users
            }

        ]);

        next();
    });

    next();
};

exports.register.attributes = {
    name: 'user_routes',
    version: require('../../package.json').version,
    dependencies: 'auth',
};
