'use strict';
exports.register = function(server, options, next) {

    server.route([
        // Application Routes
        {
            method: 'GET',
            path: '/',
            handler :function(req, reply){
                reply('hello');
            }
        }

    ]);


    next();
};



exports.register.attributes = {
    name: 'routes',
    version: require('../../package.json').version
};
