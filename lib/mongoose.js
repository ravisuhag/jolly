'use strict';

var Mongoose = require('mongoose');
var glob = require('glob');

exports.register = function(plugin, options, next) {

    var db = Mongoose.connect(options.uri, function(err) {
        if (err) {
            throw err;
        }
    });

    // When the connection is disconnected
    Mongoose.connection.on('connected', function() {
        console.log('✅  Mongo Database connected');
    });

    // When the connection is disconnected
    Mongoose.connection.on('disconnected', function() {
        console.log(' Mongo Database disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {
        Mongoose.connection.close(function() {
            console.log('Mongo Database disconnected through app termination');
            process.exit(0);
        });
    });

    // Load Models 
    // TO DO :
    //  Expore server binding for global access to all mongoose models 
    var models = glob.sync('models/*.js');

    models.forEach(function(model) {
        require('../' + model);
    });




    plugin.expose('mongoose', Mongoose);


    next();
};


exports.register.attributes = {
    name: 'mongooose',
    version: require('../package.json').version
};
