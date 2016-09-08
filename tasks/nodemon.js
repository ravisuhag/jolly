'use strict';
const Gulp = require('gulp');
const Nodemon = require('gulp-nodemon');

Gulp.task('nodemon', function() {

    const nodeArgs = [];
    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }
    Nodemon({
            script: 'server.js',
            ext: 'hbs js',
            env: { 'NODE_ENV': 'development' },
            ignore: [
                'assets/',
                'node_modules/',
                '.build/',
                'test/'
            ],
            nodeArgs: nodeArgs
        })
        .on('restart', function(files) {
            console.log('change detected:', files);
        });
});
