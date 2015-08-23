'use strict';


module.exports = function(Gulp, Plugins) {

    var nodeArgs = [];
    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }

    Plugins.nodemon({
            script: 'server.js',
            ext: 'js md hbs',
            ignore: [
                'client/**/*',
                'gulp/**/*',
                'public/**/*',
                'node_modules/**/*'
            ],
            nodeArgs: nodeArgs
        })
        .on('restart', function(files) {

            console.log('change detected:', files);
        });
};
