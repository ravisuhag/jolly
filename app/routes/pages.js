'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = plugin.controllers();

    plugin.route([

        // Home Page
        {
            method: 'GET',
            path: '/',
            config: Controllers.pages.home.view
        }

    ]);

    next();
};

exports.register.attributes = {
    name: 'pages_routes',
    version: require('../../package.json').version
};
