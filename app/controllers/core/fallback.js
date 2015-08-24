'use strict';

module.exports = {
    description : 'Fallback page for 404 error',
    auth: false,
    handler: function(request, reply) {

        reply.view('errors/not-found').code(404);
        
    }
};
