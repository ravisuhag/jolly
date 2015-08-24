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
                error: Boom.badRequest('invalid username or password') // To Do : check errors and send proper errors
            };
            return reply.view('auth/login', context).code(400);
        },
    },
    handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        User.findByCredentials(request.payload.username, request.payload.password, function(err, user, msg) {
            var context = {};
            if (err) {
                context = {
                    error: Boom.badImplementation()
                };
                return reply.view('auth/login', context);
            }
            if (user) {
                request.auth.session.set(user);
                return reply.redirect('/account');
            } else {
                context = {
                    error: msg.message
                };
                return reply.view('auth/login', context);
            }
        });


    }
};
