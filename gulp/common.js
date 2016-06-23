'use strict';

var path = require('path');
var gulp = require('gulp');
var del = require('del');
var mkdirp = require('mkdirp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

//清理输出目录
gulp.task('clean', function (done) {
  $.del(path.join(conf.paths.dist, '/'), done);
});

gulp.task('mkdir:logs', function(done){
  return mkdirp('logs', done);
});


//拷贝包管理文件
gulp.task('metadata', function(done) {
  return gulp.src([
	  'package.json',
    '*.sh',
	  // 'bower.json',
	  'LICENSE'
	  ]).pipe(gulp.dest('./dist'));
});
