'use strict';

const Hoek = require('hoek');
const internals = {};

internals.prepare = function(config) {

    const engines = config.engines;
    Object.keys(engines).forEach((engine) => {
        if ( typeof engines[engine] === 'string' ) {
            engines[engine] = require(engines[engine]);
        }
    });
    return config;
};

exports.register = function(plugin, options, next) {

    const ext = {
        context: function(request) {

            const ctx = {
                devEnv: (process.env.NODE_ENV === 'development'),
                meta: options.misc.meta,
                credentials: request.auth.isAuthenticated?request.auth.credentials:null
            };

            if ( request.yar && request.yar.flash ) {
                ctx.flash = request.yar.flash();
            }

            return ctx;
        }
    };

    let viewOpts = options.views;
    viewOpts = Hoek.merge(viewOpts, ext);
    viewOpts = internals.prepare(viewOpts);
    plugin.root.views(viewOpts);
    return next();
};

exports.register.attributes = {
    name: 'views',
    version: require('../package.json').version,
    depedencies: ['vision']
};
