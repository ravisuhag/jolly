'use strict';

var Composer = require('./index');
var Hoek = require('hoek');

Composer(function(err, server) {

    Hoek.assert(!err, err);
    server.start(function() {
        console.log('✅  Server is listening on ' + server.info.port);
    });

});
