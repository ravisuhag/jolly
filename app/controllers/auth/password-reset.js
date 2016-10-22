'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Crypto = require('crypto');
var Joi = require('joi');

exports.showResetForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    handler: function(request, reply) {

        var ctx = {};

        User.findOne({
            resetPasswordToken: request.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                ctx.isValidToken = false;
                return reply.view('auth/password-reset', ctx);
            }
            ctx.isValidToken = true;
            return reply.view('auth/password-reset', ctx);
        });

    }
};

exports.postResetForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    validate: {
        payload: {
            password: Joi.string().min(2).max(20).required(),
            verify: Joi.string().min(2).max(20).required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.yar.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {

        if (request.payload.password !== request.payload.verify) {
            request.session.flash('error', ' New Password does not match');
            return reply.redirect('/me/settings/account');
        }
        User.findOne({
            resetPasswordToken: request.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (err) {
                request.yar.flash('error', 'An internal server error occurred');
                return reply.redirect('/reset-password');
            }
            if (user) {
                user.password = request.payload.password;
                user.save(function(err) {
                    if (err) {
                        request.yar.flash('error', 'An internal server error occurred');
                        return reply.redirect('/reset-password');
                    }
                    request.yar.flash('success', 'Password changed successfully. Please login with new password');
                    // TODO : Send password change email
                    request.cookieAuth.set.clear();
                    return reply.redirect('/login');
                });
            } else {
                // User not fond in database
                request.yar.flash('error', 'Token is invalid');
                return reply.redirect('/reset-password');
            }
        });


    }
};
