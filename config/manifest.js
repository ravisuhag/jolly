'use strict';

var Confidence = require('confidence');
var Config = require('./config');

var criteria = {
    env: process.env.NODE_ENV
};

var manifest = {
    $meta: 'jolly app manifest document.',
    server: {
        connections: {
            router: {
                stripTrailingSlash: true,
                isCaseSensitive: false
            },
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }],
    plugins: {
        inert: {},
        vision: {},
        visionary: {
            engines: {
                hbs: 'handlebars'
            },
            path: './templates',
            helpersPath: './templates/helpers',
            layoutPath: './templates/layouts',
            partialsPath: './templates/partials',
            layout: 'default'
        },
        './lib/mongoose': Config.get('/mongodb'),
        './routes/core': {}
    }
};


var store = new Confidence.Store(manifest);


exports.get = function(key) {
    return store.get(key, criteria);
};
exports.meta = function(key) {
    return store.meta(key, criteria);
};
