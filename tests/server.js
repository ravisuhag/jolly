'use strict';

// Load modules
var Code = require('code');
var Lab = require('lab');
var Composer = require('../index');

// Test shortcuts
var lab = exports.lab = Lab.script();

lab.test('starts server and returns hapi server object', function(done) {

    Composer(function(err, server) {
        Code.expect(err).to.not.exist();
        Code.expect(server).to.exist();
        server.stop(done);
    });

});
