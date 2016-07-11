'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/views/*.ejs'))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
     .pipe($.filter(function (file) {
      console.info(file.path)
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')))
    .pipe(browserSync.reload({ stream: true }));
    // .pipe($.size())
});
