'use strict';

exports.notfound = {
    handler: function(request, reply) {

        reply.view('errors/not-found').code(404);

    }
};
