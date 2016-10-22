'use strict';

exports.view = {
    description: 'Returns the home page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    handler: function(request, reply) {

        reply.view('homepage');

    }
};
