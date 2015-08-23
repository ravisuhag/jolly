'use strict';

module.exports = {
    handler: function(request, reply) {

        reply.view('errors/not-found').code(404);
        
    }
};
