'use strict';


exports.css = {
    directory: {
        path: 'public/css'
    }
};

exports.img = {
    directory: {
        path: 'public/img'
    }
};

exports.js = {
    directory: {
        path: 'public/js'
    }
};

exports.favicon = {
    file: 'public/favicon.ico'
};

exports.heartbeat = {
    handler: function(request, reply) {
        reply('OK');
    }
};
