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
        'hapi-auth-cookie': {},
        crumb: {
            autoGenerate: true
        },
        inert: {},
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
        './lib/mongoose': Config.get('/mongodb'),
        './lib/auth': Config.get('/authCookie'),
        './app/routes/core': {},
        './app/routes/users': {},
        './app/routes/auth': {}
    }
};


var store = new Confidence.Store(manifest);


exports.get = function(key) {
    return store.get(key, criteria);
};
// exports.meta = function(key) {
//     return store.meta(key, criteria);
// };
