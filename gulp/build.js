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

gulp.task('app:partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/views/partials/{,**/}*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('cacheHtml.js', {
      module: conf.base.module,
      root: 'partials'
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, 'scripts')));
});


gulp.task('app:htmls', ['inject', 'app:partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, 'scripts/cacheHtml.js'), { read: false });
  
  var partialsInjectOptions = {
    starttag: '<!-- inject:views:{{ext}} -->',
    ignorePath: conf.paths.tmp,
    addRootSlash: false
  };
  
  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  var stream = gulp.src([
      // path.join(conf.paths.src, '/views/{,*/}*.html'),
      path.join(conf.paths.src, '/views/**/*.html'),  //加快速度，只设置一个
      path.join('!' + conf.paths.src, '/views/partials/*.html')
    ])
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    // .pipe($.filter(function (file) {
    //   console.info(file.path)
    // }))
    .pipe(assets = $.useref.assets({searchPath: '/'}))
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
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
      .pipe(gulp.dest(path.join(conf.paths.dist, '/public')));
        
    cssFilter.restore({end: true})
      .pipe(gulp.dest(path.join(conf.paths.dist, '/public')));
    
    return stream;
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('app:fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/public/fonts/')));
});

gulp.task('app:lib', function () {
  return gulp.src([
      path.join(conf.paths.lib, '/{,**/}*.coffee'),
      path.join('!' + conf.paths.lib, '/config/**/development.coffee')
    ])
    .pipe($.sourcemaps.init())
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe($.sourcemaps.write())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/lib')))
    .pipe($.size())
});


gulp.task('app:server', function(){
  return gulp.src('server.coffee')
    .pipe($.sourcemaps.init())
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe($.sourcemaps.write())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(gulp.dest(conf.paths.dist))
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
  return mkdirp(path.join(conf.paths.dist, 'logs'));
});

gulp.task('zip', function() {
  return gulp.src(['dist/{,*/}*'])
    .pipe($.zip(conf.base.zip + '.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(cb){
  runSequence('clean','app:htmls', 'app:fonts', 'app:lib', 'app:server', 'app:node-modules', 'app:others', 'zip', cb);
});
