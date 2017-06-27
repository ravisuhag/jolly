'use strict';

const Composer = require('./index');
const Hoek = require('hoek');

Composer(function(err, server) {

    Hoek.assert(!err, err);
    server.start(function(err) {

        if ( err ) {
            throw err;
        }

        console.log('Server started @ ' + server.info.uri);
    });
    
});
