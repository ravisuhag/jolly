'use strict';

var Nodemon = require('gulp-nodemon');
var bistre = require('bistre');
module.exports = function(Gulp, Plugins) {

    var nodeArgs = [];
    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }
    Nodemon({
            script: 'server.js',
            ext: 'hbs js',
            ignore: [
                'assets/',
                'node_modules/',
                'public/',
                'test/',
            ],
            stdout: false,
            nodeArgs: nodeArgs
        })
        .on('readable', function() {
            this.stdout
                .pipe(bistre({
                    time: true
                }))
                .pipe(process.stdout);
            this.stderr
                .pipe(bistre({
                    time: true
                }))
                .pipe(process.stderr);
        })
        .on('restart', function(files) {
            console.log('change detected:', files);
        });

};
