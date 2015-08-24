'use strict';

var mongoose = require('mongoose');
var Joi = require('joi');
var Boom = require('boom');
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
    description: 'Submit the signup page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To stop from redirect loop
        }
    },
    validate: {
        payload: {
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().min(6).max(20).required(),
            verify: Joi.string().required(),
            email: Joi.string().email().required()
        },
        failAction: function(request, reply, source, error) {
            var context = {
                error: Boom.badRequest('invalid query')
            };
            return reply.view('auth/signup', context).code(400);
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        var user = new User({
            username: request.payload.username,
            password: request.payload.password,
            email: request.payload.email
        });

        // Then save the user
        user.save(function(err) {
            if (err) {
                var context = {
                    error: Boom.badImplementation()
                };
                return reply.view('auth/signup', context).code(400);
            } else {
                request.auth.session.set(user);
                user.password = undefined;
                user.salt = undefined;
                return reply.redirect('/');
            }
        });

    }
};
