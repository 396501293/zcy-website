'use strict';

var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var mkdirp = require('mkdirp');
var conf = require('./conf');
var pkg = require('../package.json')

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('app:views', function () {
  return gulp.src([
    path.join(conf.paths.src, '/views/{,**/}*.ejs')
  ])
    // .pipe($.minifyHtml({
    //   empty: true,
    //   spare: true,
    //   quotes: true
    // }))
    .pipe(gulp.dest(path.join(conf.paths.dist, 'views')));
});


gulp.task('app:htmls', function () {
  var htmlFilter = $.filter('*.ejs');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  var stream = gulp.src([
      // path.join(conf.paths.src, '/views/{,*/}*.html'),
      path.join(conf.paths.src, '/views/{,**/}*.ejs')  //加快速度，只设置一个
    ])
    .pipe(assets = $.useref.assets({searchPath: '/'}))
    .pipe($.rev())
    .pipe(jsFilter)
    // .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace({
      replaceInExtensions: '.ejs'
    }))
    .pipe(htmlFilter)
    // .pipe($.minifyHtml({
    //   empty: true,
    //   spare: true,
    //   quotes: true,
    //   conditionals: true
    // }))
    .pipe(htmlFilter.restore())
    // 过滤掉scripts和styles，避免再次添加到views
    .pipe($.filter(function (file) {
      if(file.path.indexOf('scripts')!=-1 || file.path.indexOf('styles')!=-1) {
        return false;
      }
      return true;
    }))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/views')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/views'), showFiles: true }));
    
    jsFilter.restore({end: true})
      .pipe(gulp.dest(path.join(conf.paths.dist, 'public')));
        
    cssFilter.restore({end: true})
      .pipe(gulp.dest(path.join(conf.paths.dist, 'public')));
    
    return stream;
});

gulp.task('app:lib', function () {
  return gulp.src([
      path.join(conf.paths.lib, '/{,**/}*.js')
    ])
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/lib')))
    .pipe($.size())
});


gulp.task('app:server', function(){
  return gulp.src('index.js')
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulp.dest(conf.paths.dist))
    .pipe($.size())
});

gulp.task('app:images', function(){
  return gulp.src([
      path.join(conf.paths.src, 'img/*')
    ])
    .pipe(gulp.dest(path.join(conf.paths.dist, 'public/img')))
    .pipe($.size())
});


gulp.task('app:node-modules', function () {
  var srcArray = []
  for(var module in pkg.dependencies) {
    srcArray.push('node_modules/'+ module)
  }
  return gulp.src(srcArray)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/node_modules/')))
});

gulp.task('app:others', ['metadata'], function () {
  // return mkdirp(path.join(conf.paths.dist, 'logs'));
});

gulp.task('zip', function() {
  return gulp.src(['dist/{,*/}*'])
    .pipe($.zip(conf.base.zip + '.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(cb){
  runSequence('clean','app:htmls', 'app:lib', 'app:server', 'app:node-modules', 'app:images', 'app:others', 'zip', cb);
});
