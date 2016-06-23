'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var conf = require('./conf');

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('express:dev', function (cb) {
  var called = false;
  
  nodemon({ 
    script: 'index.js',
    watch: ['index.js', 'lib/*.js'],
    env: { 'NODE_ENV': 'development' },
    ignore: ['ignored.js']
  })
  .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
})