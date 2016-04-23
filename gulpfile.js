'use strict';

const Gulp = require('gulp');
const RequireDir = require('require-dir');

// Load tasks

RequireDir('./tasks');


//  Build task definitions
Gulp.task('dev-build', ['fonts', 'images', 'misc', 'styles', 'webpack', 'lint']);
Gulp.task('prod-build', ['dev-build', 'rev']);

Gulp.task('dev', ['dev-build', 'watch', 'nodemon']);
Gulp.task('build', ['prod-build']);

Gulp.task('default', ['dev']);
