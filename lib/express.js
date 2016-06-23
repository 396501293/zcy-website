var path = require('path');
var expressStatic = require('serve-static');

// 加载hbs模块
// var hbs = require('hbs');
/**
 * Express configuration
 */
module.exports = function(app) {

  // 指定模板文件的后缀名为html
  app.engine('.ejs', require('ejs').__express);

  app.set('view engine', 'ejs');

  // 运行hbs模块
  // app.engine('html', hbs.__express);

  app.use(expressStatic(path.join(__dirname, '../.tmp')));
  app.use(expressStatic(path.join(__dirname, '../node_modules')));
  app.use(expressStatic(path.join(__dirname, '../app'), {
    maxAge: 60000 * 60 * 24 * 30
  }));

}
