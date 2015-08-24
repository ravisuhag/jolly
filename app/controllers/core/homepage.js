'use strict';

module.exports = {
    description: 'Returns the home page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // '/login' if set redirects to ./login.
        }
    },
    handler: function(request, reply) {

        reply.view('homepage');

    }
};
