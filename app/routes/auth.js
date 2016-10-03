'use strict';

exports.register = function(plugin, options, next) {

    const Controllers = {
        auth: {
            login: require('../controllers/auth/login'),
            signup: require('../controllers/auth/signup'),
            logout: require('../controllers/auth/logout'),
            forgotPassword: require('../controllers/auth/password-forgot'),
            resetPassword: require('../controllers/auth/password-reset'),
            verifyEmail: require('../controllers/auth/email-verify'),
            networks: require('../controllers/auth/networks')
        }
    };

    plugin.route([

        // Auth Routes
        {
            method: 'GET',
            path: '/login',
            config: Controllers.auth.login.showForm
        }, {
            method: 'POST',
            path: '/login',
            config: Controllers.auth.login.postForm
        }, {
            method: 'GET',
            path: '/signup',
            config: Controllers.auth.signup.showForm
        }, {
            method: 'POST',
            path: '/signup',
            config: Controllers.auth.signup.postForm
        }, {
            method: '*',
            path: '/logout',
            config: Controllers.auth.logout
        }, {
            method: 'GET',
            path: '/forgot-password',
            config: Controllers.auth.forgotPassword.showRecoveryForm
        }, {
            method: 'POST',
            path: '/forgot-password',
            config: Controllers.auth.forgotPassword.postRecoveryForm
        }, {
            method: 'GET',
            path: '/reset-password',
            config: Controllers.auth.resetPassword.showResetForm
        }, {
            method: 'POST',
            path: '/reset-password',
            config: Controllers.auth.resetPassword.postResetForm
        }, {
            method: 'GET',
            path: '/send-verification-email',
            config: Controllers.auth.verifyEmail.sendVerification
        }, {
            method: 'GET',
            path: '/verify-email',
            config: Controllers.auth.verifyEmail.verifyEmail
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'auth_routes',
    version: require('../../package.json').version
};
