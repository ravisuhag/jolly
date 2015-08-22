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
        inert:{},
        vision: {},
        visionary: {
            engines: {
                hbs: 'handlebars'
            },
            path: './app/templates',
            helpersPath: './app/templates/helpers',
            layoutPath: './app/templates/layouts',
            partialsPath: './app/templates/partials',
            layout: 'default'
        },
        './app/routes/index': {},
        './app/routes/static': {}
    }
};


var store = new Confidence.Store(manifest);


exports.get = function(key) {
    return store.get(key, criteria);
};
exports.meta = function(key) {
    return store.meta(key, criteria);
};
