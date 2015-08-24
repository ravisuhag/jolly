'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');


exports.showForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // if set redirects to set route.
        }
    },
    handler: function(request, reply) {

        reply.view('auth/login');

    }
};

exports.postForm = {
    handler: function(request, reply) {


    }
};
