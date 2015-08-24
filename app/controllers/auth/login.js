'use strict';

var mongoose = require('mongoose');
var Boom = require('boom');
var Joi = require('joi');
var User = mongoose.model('User');

var lockoutInterval = 60; // seconds
var maxAttemptsBeforeLockout = 5;


exports.showForm = {
    description: 'Returns the login page',
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
        reply.view('auth/login');

    }
};

exports.postForm = {
    description: 'Post to the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false
        },
        crumb: {
            key: 'crumb',
            source: 'payload', // this tests payload crumb value.
            restful: true // do not need to make Joi validation for crumb.
        }
    },
    validate: {
        payload: { // payload for POST, query for GET
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20)
        },
        failAction: function(request, reply, source, error) {
            var context = {
                error: 'Invalid username or password'
            };
            return reply.view('auth/login', context).code(400);
        },
    },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        User.findByCredentials(request.payload.username, request.payload.username, function(err, isUser, msg) {
            console.log(isUser, msg);
        });
        // var context = {
        //     user: {
        //         first: request.auth.credentials.first,
        //         last: request.auth.credentials.last
        //     }
        // };

    }
};
