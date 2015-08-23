'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = {
    handler: function(request, reply) {

        console.log(User);

    }
};
