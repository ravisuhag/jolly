'use strict';

var Gulp = require('gulp');
var Plugins = require('gulp-load-plugins')();

function loadTask(task) {
    return require('./tasks/' + task)(Gulp, Plugins);
}


Gulp.task('nodemon', loadTask('nodemon'));







Gulp.task('default', ['nodemon']);
