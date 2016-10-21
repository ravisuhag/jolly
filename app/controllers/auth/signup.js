'use strict';

const Mongoose = require('mongoose');
const Joi = require('joi');
const Boom = require('boom');
const User = Mongoose.model('User');

exports.showForm = {
    description: 'Returns the signup page',
    auth: {
        mode: 'try',
        strategy: 'standard'
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
    validate: {
        payload: {
            username: Joi.string().min(3).max(20).required(),
            password: Joi.string().min(6).max(20).required(),
            verify: Joi.string().required(),
            email: Joi.string().email().required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/signup');
        }
    },
    handler: function(request, reply) {

        if (request.auth.isAuthenticated) {
            return reply.redirect('/account');
        }
        if (request.payload.password !== request.payload.verify) {
            request.yar.flash('error', 'Password does not match');
            return reply.redirect('/signup');
        }
        // Although Joi does not allow any extra parameter.
        // This is just to safe check any dev/human error.
        var user = new User({
            username: request.payload.username,
            password: request.payload.password,
            email: request.payload.email,

        });

        // Then save the user
        user.save(function(err) {
            if (err) {
                if (err.code === 11000) {
                    request.yar.flash('error', 'Username/email already exists.');
                } else {
                    // Boom bad implementation
                    request.yar.flash('error', 'An internal server error occurred');
                }
                return reply.redirect('/signup');

            } else {
                request.cookieAuth.set(user);
                return reply.redirect('/');
            }
        });

    }
};
