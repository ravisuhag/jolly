'use strict';

module.exports = {
    auth: {
        strategy: 'standard'
    },
    plugins: {
        crumb: {
            key: 'crumb',
            source: 'payload',
            restful: true
        }

    },
    handler: function(request, reply) {

        // setTimeout( function () {

        request.auth.session.clear();
        var context = {
            error: 'logged out succesfully'
        };
        return reply.view('auth/login', context);

        // }, 4000);
    }
};
