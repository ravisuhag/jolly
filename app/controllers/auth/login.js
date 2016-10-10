'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');
const User = Mongoose.model('User');

exports.showForm = {
    description: 'Returns the login page',
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        'hapi-auth-cookie': {
            redirectTo: false // To prevent redirect loop
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
            source: 'payload',
        }
    },
    validate: {
        payload: {
            username: Joi.string().min(3).max(20),
            password: Joi.string().min(6).max(20)
        },
        failAction: function(request, reply, source, error) {

            // Username, passowrd minimum validation failed
            request.yar.flash('error', 'Invalid username or password');
            return reply.redirect('/login');
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }

        User.findByCredentials(request.payload.username, request.payload.password, function(err, user, msg) {
            if (err) {
                // Boom bad implementation
                request.yar.flash('error', 'An internal server error occurred');
                return reply.redirect('/login');
            }
            if (user) {
                request.cookieAuth.set(user);
                return reply.redirect('/account');
            } else {
                // User not fond in database
                request.yar.flash('error', 'Invalid username or password');
                return reply.redirect('/login');
            }
        });

    }
};
