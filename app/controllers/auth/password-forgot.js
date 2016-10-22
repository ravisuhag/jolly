'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Crypto = require('crypto');
const Joi = require('joi');

exports.showRecoveryForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    plugins: {
        crumb: {
            key: 'crumb',
            source: 'payload',
            restful: true
        }
    },
    handler: function(request, reply) {

        reply.view('auth/password-recovery');

    }
};

exports.postRecoveryForm = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    validate: {
        payload: {
            name_email: Joi.string().min(2).max(20).required()
        },
        failAction: function(request, reply, source, error) {
            // Boom bad request
            request.session.flash('error', 'Bad request');
            return reply.redirect('/me/settings/profile');
        }
    },
    handler: function(request, reply) {
        // Generate Token
        Crypto.randomBytes(20, function(err, buffer) {

            var token = buffer.toString('hex');
            var query = {};
            if (request.payload.name_email.indexOf('@') > -1) {
                query.email = request.payload.name_email.toLowerCase();
            } else {
                query.username = request.payload.name_email.toLowerCase();
            }

            //  Find User by username or email
            User.findOne(query, function(err, user) {

                if (err) {
                    request.session.flash('error', 'Internal server error');
                    return reply.redirect('/forgot-password');
                }
                if (!user) {
                    request.session.flash('error', 'Invalid username or password');
                    return reply.redirect('/forgot-password');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    if (err) {
                        request.session.flash('error', 'Internal server error');
                        return reply.redirect('/forgot-password');
                    }

                    var data = {
                        from: 'info@hackersleague.com',
                        to: 'suhag.ravi@gmail.com',
                        subject: 'Password Reset - Resumite',
                        path: 'emails/forgot-password',
                        context: {
                            name: user.firstName + user.lastName,
                            url: request.connection.info.protocol + '://' + request.info.host + '/reset-password?token=' + token
                        }
                    };
                    //  Send Email
                    var Mailer = request.server.plugins.mailer;
                    Mailer.sendMail(data, function(err, info) {
                        //  Email Sent 
                    });
                    request.session.flash('success', 'An email has sent to your registered email id with password reset instructions');
                    return reply.redirect('/forgot-password');
                });
            });
        });

    }
};
