'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Composer = require('../index');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

it('starts server and returns hapi server object', function(done) {

    Composer(function(err, server) {

        expect(err).to.not.exist();
        expect(server).to.exist();
        server.stop(done);

    });

});
