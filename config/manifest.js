'use strict';

const Confidence = require('confidence');
const Config = require('./config');
const Meta = require('./meta');


let internals = {
    criteria: {
        env: process.env.NODE_ENV
    }
};

internals.manifest = {
    $meta: 'App manifest document',
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
    registrations: [

        // Cookie authentication
        {
            plugin: 'hapi-auth-cookie'
        },

        //  Crumb
        {
            plugin: {
                register: 'crumb',
                options: {
                    cookieOptions: {
                        isSecure: false
                    }
                }
            }
        },

        // Static file and directory handlers
        {
            plugin: 'inert'
        },

        // Templates rendering support 
        {
            plugin: 'vision'
        },

        // views and default context
        {
            plugin: {
                register: './lib/views',
                options: {
                    views:{
                        engines: {
                            hbs: 'handlebars'
                        },
                        path: './app/templates',
                        layoutPath: './app/templates/layouts',
                        helpersPath: './app/templates/helpers',
                        partialsPath: './app/templates/partials',
                        layout: 'default'
                    },
                    misc: {
                        meta: Meta.get('/'),
                    }
                }
            }
        },

        //  MongoDB connector 
        {
            plugin: {
                register: './lib/mongoose',
                options: Config.get('/mongoose')
            }
        },

        // Flash Plugin
        {
            plugin: {
                register: './lib/flash'
            }
        },

        // Hapi cookie jar
        {
            plugin: {
                register: 'yar',
                options: Config.get('/yarCookie')
            }
        },

        //  Authentication strategy
        {
            plugin: {
                register: './lib/auth',
                options: Config.get('/authCookie')
            }
        },

        //  Core routes
        {
            plugin: './app/routes/core.js'
        },

        //  Pages routes
        {
            plugin: './app/routes/pages.js'
        },

        //  Auth routes
        {
            plugin: './app/routes/auth.js'
        }
    ]
};

internals.store = new Confidence.Store(internals.manifest);

exports.get = function(key) {
    return internals.store.get(key, internals.criteria);
};
exports.meta = function(key) {
    return internals.store.meta(key, internals.criteria);
};
