'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

  return gulp.src([
    path.join(conf.paths.src, '/styles/main.styl')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.stylus()).on('error', conf.errorHandler('Stylus'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('AutoPreFixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles/')))
    .pipe(browserSync.reload({ stream: true }));
});
