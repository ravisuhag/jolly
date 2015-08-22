'use strict';

exports.register = function(plugin, options, next) {

    var Controllers = {
        core: require('../controllers/core/pages'),
        fallback: require('../controllers/core/fallback')
    };


    plugin.route([
        // routes
        {
            method: 'GET',
            path: '/',
            config: Controllers.core.home
        }, {
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
