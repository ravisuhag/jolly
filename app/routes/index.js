'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        pages: require('../controllers/public/pages')
    };


    plugin.route([
        // routes
        {
            method: 'GET',
            path: '/',
            config : Controllers.pages.home
        }

    ]);

    next();



};

exports.register.attributes = {
    name: 'index_routes',
    version: require('../../package.json').version
};
