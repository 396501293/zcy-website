var path = require('path');
var expressStatic = require('serve-static');
var rootPath = path.normalize(__dirname + '/../');

/**
 * Express configuration
 */
module.exports = function(app) {

  // 指定模板文件的后缀名为html
  app.engine('.ejs', require('ejs').renderFile);

  app.set('view engine', 'ejs');

  if (app.get('env') == 'development') {
    app.use(expressStatic(path.join(rootPath, '.tmp')));
    app.use(expressStatic(path.join(rootPath, '/app'), {
      maxAge: 60000 * 60 * 24 * 30
    }));
  } else {
    app.use(expressStatic(path.join(rootPath, 'public'), {
      maxAge: 60000 * 60 * 24 * 30
    }))
  }
  

}
