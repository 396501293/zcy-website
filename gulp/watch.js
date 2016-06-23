'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', function () {

  gulp.watch([
    path.join(conf.paths.src, '/styles/*.css'),
    path.join(conf.paths.src, '/styles/*.styl')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      browserSync.reload(event.path);
    }
  });

  gulp.watch([
    path.join(conf.paths.src, '/scripts/{,*/}*.js'),
    path.join(conf.paths.src, '/scripts/{,*/}*.jsx')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      browserSync.reload(event.path);
    }
  });

  gulp.watch(path.join(conf.paths.src, '/views/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});
