'use strict';

var Lab = require('lab');
var Code = require('code');
var Manifest = require('../config/manifest');

var lab = exports.lab = Lab.script();

lab.experiment('Manifest', function () {

    lab.test('it gets manifest data', function (done) {

        Code.expect(Manifest.get('/')).to.be.an.object();

        done();
    });

    lab.test('it gets manifest meta data', function (done) {

        Code.expect(Manifest.meta('/')).to.match(/paydash app manifest document/i);

        done();
    });
});
