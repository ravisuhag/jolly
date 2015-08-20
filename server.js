'use strict';

var Composer = require('./index');

Composer(function(err, server) {

  if (err) throw err;

  server.start(function() {
    console.log('App started on port ' + server.info.port);
  });

});
