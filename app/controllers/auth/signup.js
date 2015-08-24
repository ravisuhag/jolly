'use strict';

var mongoose = require('mongoose');
var Joi = require('joi');
var User = mongoose.model('User');

exports.showForm = {
    description: 'Returns the signup page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        reply.view('auth/signup');

    }
};

exports.postForm = {
    description: 'Returns the signup page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    handler: function(request, reply) {

        // if (request.auth.isAuthenticated) {
        //     return reply.redirect('/account');
        // }
        // reply.view('auth/signup');

    }
};
