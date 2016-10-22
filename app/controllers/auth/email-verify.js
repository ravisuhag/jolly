'use strict';

const Mongoose = require('mongoose');
const User = Mongoose.model('User');
const Crypto = require('crypto');
const Joi = require('joi');


exports.sendVerification = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    handler: function(request, reply) {
        
        // Generate Token
        Crypto.randomBytes(20, function(err, buffer) {

            var token = buffer.toString('hex');
            var id = request.auth.credentials._id.toString();
            var update = {
                $set: {
                    verifyEmailToken: token,
                    verifyEmailExpires: Date.now() + 3600000
                }
            };
            var options = {
                new: true
            };
            User.findByIdAndUpdate(id, update, options, function(err, user) {
                if (err) {
                    request.yar.flash('error', 'An internal server error occurred');
                    return reply.redirect('/me/settings/account');
                }

                var data = {
                    from: 'info@resumite.com',
                    to: user.email,
                    subject: 'Verify email- Resumite',
                    path: 'emails/verify-email',
                    context: {
                        name: user.firstName + user.lastName,
                        url: request.connection.info.protocol + '://' + request.info.host + '/verify-email?token=' + token
                    }
                };
                //  Send Email
                var Mailer = request.server.plugins.mailer;

                Mailer.sendMail(data, function(err, info) {
                    //  Email Sent 
                    if (err) {
                        request.yar.flash('error', 'An  internal error occured, couldn not send mail');
                        return reply.redirect('/me/settings/account');
                    }
                    request.yar.flash('success', 'An  verification email has sent to your registered email id with instructions');
                    return reply.redirect('/me/settings/account');
                });

            });

        });
    }
};


exports.verifyEmail = {
    auth: {
        mode: 'try',
        strategy: 'standard'
    },
    handler: function(request, reply) {

        var ctx = {};

        User.findOne({
            verifyEmailToken: request.params.token,
            verifyEmailExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {

            if (!user) {
                request.yar.flash('error', 'Token is invalid');
                return reply.redirect('/me/settings/account');
            }
            user.status = 'verified';
            user.save(function(err) {
                if (err) {
                    request.yar.flash('error', 'Internal server error');
                    return reply.redirect('/me/settings/account');
                }
                request.cookieAuth.clear();
                request.cookieAuth.set(user);
                request.yar.flash('success', 'Email is successfully verified');
                return reply.redirect('/me/settings/account');
            });
        });

    }
};
